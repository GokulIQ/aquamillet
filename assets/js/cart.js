/**
 * AuraMillet Organics - Shopping Cart Controller
 * Manages localStorage cart state, sliding drawer UI, free shipping progress,
 * and animated feedback notifications.
 */

const AuraCart = (function () {
  'use strict';

  const CART_KEY = 'auramillet_cart_items';
  const PROMO_KEY = 'auramillet_active_promo';
  const FREE_SHIPPING_THRESHOLD = 999;

  let cart = [];
  let activePromo = null;

  function init() {
    loadCart();
    renderCartUI();
    bindEvents();
  }

  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      cart = stored ? JSON.parse(stored) : [
        // Seed initial demo item so cart starts active
        {
          id: 'foxtail-millet-cookies',
          name: 'Artisanal Foxtail Millet Cookies (Almond Crunch)',
          price: 199,
          weight: '200g (Pack of 12)',
          image: 'assets/images/products/cookies/foxtail-cookies-1.jpg',
          quantity: 2
        }
      ];
      activePromo = JSON.parse(localStorage.getItem(PROMO_KEY)) || null;
      // Refresh saved basket prices from the INR catalog, preserving quantities.
      cart = cart.map(item => {
        const product = PRODUCTS_DATA.find(product => product.id === item.id);
        return product ? { ...item, price: product.price } : null;
      }).filter(Boolean);
      if (activePromo?.code === 'SUPERGRAIN') {
        activePromo = { code: 'SUPERGRAIN', type: 'fixed', value: 100 };
      }
      saveCart();
    } catch (e) {
      console.warn('Could not parse cart state, resetting.', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      if (activePromo) {
        localStorage.setItem(PROMO_KEY, JSON.stringify(activePromo));
      } else {
        localStorage.removeItem(PROMO_KEY);
      }
    } catch (e) {
      console.error('Storage error', e);
    }
    renderCartUI();
  }

  function addItem(product, quantity = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        weight: product.weight || '',
        image: product.image,
        quantity: quantity
      });
    }
    saveCart();
    showToast('Item Added to Cart', `${product.name} (x${quantity}) added.`, product.image);
  }

  function updateQuantity(productId, quantity) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity = parseInt(quantity, 10);
      if (item.quantity <= 0) {
        removeItem(productId);
        return;
      }
      saveCart();
    }
  }

  function removeItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
  }

  function clearCart() {
    cart = [];
    activePromo = null;
    saveCart();
  }

  function getCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function applyPromo(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'MILLETS10') {
      activePromo = { code: 'MILLETS10', type: 'percent', value: 10 };
      saveCart();
      return { success: true, message: 'Coupon applied! 10% discount deducted.' };
    } else if (cleanCode === 'SUPERGRAIN') {
      activePromo = { code: 'SUPERGRAIN', type: 'fixed', value: 100 };
      saveCart();
      return { success: true, message: 'Coupon applied! ₹100 discount deducted.' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try MILLETS10.' };
    }
  }

  function removePromo() {
    activePromo = null;
    saveCart();
  }

  function renderCartUI() {
    const count = getCount();
    const subtotal = getSubtotal();

    // Update all cart count badges in header
    document.querySelectorAll('.cart-counter').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const itemsContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const footerContainer = document.getElementById('cartFooterContainer');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscountAmount');
    const totalEl = document.getElementById('cartTotalAmount');
    const shippingBar = document.getElementById('freeShippingBar');
    const shippingText = document.getElementById('freeShippingText');

    if (!itemsContainer) return;

    if (cart.length === 0) {
      if (itemsContainer) itemsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (footerContainer) footerContainer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footerContainer) footerContainer.style.display = 'block';

    // Calculate Discounts & Totals
    let discount = 0;
    if (activePromo) {
      if (activePromo.type === 'percent') {
        discount = (subtotal * activePromo.value) / 100;
      } else if (activePromo.type === 'fixed') {
        discount = activePromo.value;
      }
    }
    const finalTotal = Math.max(0, subtotal - discount);

    if (subtotalEl) subtotalEl.textContent = `${formatPrice(subtotal)}`;
    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = `-${formatPrice(discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (totalEl) totalEl.textContent = `${formatPrice(finalTotal)}`;

    // Free Shipping Progress
    if (shippingBar && shippingText) {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      if (remaining <= 0) {
        shippingBar.style.width = '100%';
        shippingText.innerHTML = '<span class="text-success"><i class="bi bi-check-circle-fill me-1"></i> You unlocked <strong>FREE Shipping!</strong></span>';
      } else {
        const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
        shippingBar.style.width = `${pct}%`;
        shippingText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more for <strong>FREE Shipping</strong>`;
      }
    }

    // Render Items
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">${formatPrice((item.price * item.quantity))} <small class="text-muted fw-normal">(${formatPrice(item.price)} each)</small></div>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="px-2 fw-semibold small">${item.quantity}</span>
            <button type="button" class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove btn-item-remove" data-id="${item.id}" aria-label="Remove item">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `).join('');
  }

  function bindEvents() {
    // Delegated listener for cart item buttons
    document.addEventListener('click', e => {
      // Plus qty
      const plusBtn = e.target.closest('.btn-qty-plus');
      if (plusBtn) {
        const id = plusBtn.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity + 1);
        return;
      }

      // Minus qty
      const minusBtn = e.target.closest('.btn-qty-minus');
      if (minusBtn) {
        const id = minusBtn.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity - 1);
        return;
      }

      // Remove item
      const removeBtn = e.target.closest('.btn-item-remove');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        removeItem(id);
        return;
      }

      // Add to Cart from cards
      const addCartBtn = e.target.closest('[data-add-to-cart]');
      if (addCartBtn) {
        e.preventDefault();
        const id = addCartBtn.getAttribute('data-add-to-cart');
        const qty = parseInt(addCartBtn.getAttribute('data-qty') || '1', 10);
        if (typeof getProductById === 'function') {
          const product = getProductById(id);
          if (product) addItem(product, qty);
        }
        return;
      }
    });

    // Promo code apply button
    const promoForm = document.getElementById('cartPromoForm');
    if (promoForm) {
      promoForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('cartPromoInput');
        const feedback = document.getElementById('cartPromoFeedback');
        if (!input) return;
        const res = applyPromo(input.value);
        if (feedback) {
          feedback.textContent = res.message;
          feedback.className = res.success ? 'small mt-1 text-success' : 'small mt-1 text-danger';
        }
      });
    }

    // Checkout button simulation
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', e => {
        e.preventDefault();
        const checkoutModalEl = document.getElementById('checkoutDemoModal');
        if (checkoutModalEl && window.bootstrap && getCount() > 0) {
          const modal = bootstrap.Modal.getOrCreateInstance(checkoutModalEl);
          const drawer = document.querySelector('.offcanvas.show');
          if (drawer) {
            drawer.addEventListener('hidden.bs.offcanvas', () => modal.show(), { once: true });
            bootstrap.Offcanvas.getOrCreateInstance(drawer).hide();
          } else {
            modal.show();
          }
        }
      });
    }
  }

  function showToast(title, message, imageSrc) {
    let toast = document.getElementById('auramilletToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'auramilletToast';
      toast.className = 'custom-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      ${imageSrc ? `<img src="${imageSrc}" alt="" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;">` : ''}
      <div style="flex-grow: 1;">
        <div class="fw-bold small mb-1">${title}</div>
        <div class="text-muted small">${message}</div>
      </div>
      <button type="button" class="btn btn-sm btn-accent ms-2" onclick="AuraCart.openDrawer()">View Cart</button>
    `;

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  function openDrawer() {
    const drawerEl = document.getElementById('cartOffcanvas');
    if (drawerEl && window.bootstrap) {
      const bsDrawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
      bsDrawer.show();
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getCount,
    getSubtotal,
    applyPromo,
    openDrawer,
    showToast
  };
})();
