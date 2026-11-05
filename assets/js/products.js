/**
 * AuraMillet Organics - Products Catalog Controller
 * Handles live multi-facet filtering, keyword search, price slider, sorting,
 * pagination, and Quick View modal interactions.
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';
  let maxPrice = 2000;
  let currentSort = 'featured';
  let currentPage = 1;
  const itemsPerPage = 8;

  function init() {
    bindQuickViewControls();
    const grid = document.getElementById('productsCatalogGrid');
    if (!grid) return; // Only run on products.html

    bindFilterControls();
    checkUrlParams();
    renderProducts();
  }

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      currentCategory = cat;
      const catPill = document.querySelector(`[data-category-filter="${cat}"]`);
      if (catPill) {
        document.querySelectorAll('[data-category-filter]').forEach(b => b.classList.remove('active', 'btn-primary'));
        catPill.classList.add('active', 'btn-primary');
      }
    }
    const q = params.get('q');
    if (q) {
      searchQuery = q;
      const input = document.getElementById('productSearchInput');
      if (input) input.value = q;
    }
  }

  function bindFilterControls() {
    // Category Filter Buttons
    document.querySelectorAll('[data-category-filter]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('[data-category-filter]').forEach(b => {
          b.classList.remove('active', 'btn-primary');
          b.classList.add('btn-outline-brand');
        });
        btn.classList.remove('btn-outline-brand');
        btn.classList.add('active', 'btn-primary');
        currentCategory = btn.getAttribute('data-category-filter');
        currentPage = 1;
        renderProducts();
      });
    });

    // Search Input
    const searchInput = document.getElementById('productSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.trim().toLowerCase();
        currentPage = 1;
        renderProducts();
      });
    }

    // Price Range Slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', e => {
        maxPrice = parseFloat(e.target.value);
        priceDisplay.textContent = `${formatPrice(maxPrice)}`;
        currentPage = 1;
        renderProducts();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('productSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        currentSort = e.target.value;
        currentPage = 1;
        renderProducts();
      });
    }

    // Reset Filters Button
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', e => {
        e.preventDefault();
        currentCategory = 'all';
        searchQuery = '';
        maxPrice = 2000;
        currentSort = 'featured';
        currentPage = 1;

        if (searchInput) searchInput.value = '';
        if (priceSlider) priceSlider.value = 2000;
        if (priceDisplay) priceDisplay.textContent = formatPrice(2000);
        if (sortSelect) sortSelect.value = 'featured';

        document.querySelectorAll('[data-category-filter]').forEach(b => {
          b.classList.remove('active', 'btn-primary');
          b.classList.add('btn-outline-brand');
        });
        const allBtn = document.querySelector('[data-category-filter="all"]');
        if (allBtn) {
          allBtn.classList.remove('btn-outline-brand');
          allBtn.classList.add('active', 'btn-primary');
        }

        renderProducts();
      });
    }

  }

  function bindQuickViewControls() {
    // Quick View is available on the homepages as well as the catalog.
    document.addEventListener('click', e => {
      const qvBtn = e.target.closest('[data-quick-view]');
      if (qvBtn) {
        e.preventDefault();
        const id = qvBtn.getAttribute('data-quick-view');
        openQuickView(id);
      }
    });
  }

  function getFilteredProducts() {
    if (typeof PRODUCTS_DATA === 'undefined') return [];

    return PRODUCTS_DATA.filter(prod => {
      // Category match
      if (currentCategory !== 'all' && prod.category !== currentCategory) {
        return false;
      }
      // Price match
      if (prod.price > maxPrice) {
        return false;
      }
      // Search match
      if (searchQuery) {
        const titleMatch = prod.name.toLowerCase().includes(searchQuery);
        const descMatch = (prod.shortDescription || '').toLowerCase().includes(searchQuery);
        const ingMatch = (prod.ingredients || []).some(i => i.toLowerCase().includes(searchQuery));
        if (!titleMatch && !descMatch && !ingMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'name-az') return a.name.localeCompare(b.name);
      if (currentSort === 'rating') return b.rating - a.rating;
      return 0; // 'featured' keeps original array order
    });
  }

  function renderProducts() {
    const grid = document.getElementById('productsCatalogGrid');
    const emptyState = document.getElementById('productsEmptyState');
    const resultCountEl = document.getElementById('catalogResultsCount');
    const paginationEl = document.getElementById('catalogPagination');

    if (!grid) return;

    const filtered = getFilteredProducts();

    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Pagination calculations
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    // Build Cards
    grid.innerHTML = pageItems.map(p => `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
        <div class="product-card" data-product-id="${p.id}">
          <div class="product-thumb-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="400">
            <div class="product-badges">
              <span class="badge-pill badge-${p.badgeType || 'bestseller'}">${p.badge}</span>
            </div>
            <div class="quick-view-overlay">
              <button type="button" class="btn btn-sm btn-accent" data-quick-view="${p.id}">
                <i class="bi bi-eye"></i> Quick View
              </button>
            </div>
          </div>
          <div class="product-body">
            <div class="product-category">${p.categoryLabel}</div>
            <h3 class="product-title">
              <a href="product-details.html?id=${p.id}">${p.name}</a>
            </h3>
            <div class="product-weight">${p.weight}</div>
            <div class="product-rating">
              <i class="bi bi-star-fill"></i>
              <span class="fw-semibold text-main">${p.rating}</span>
              <span>(${p.reviewsCount})</span>
            </div>
            <div class="product-footer">
              <div class="product-price">
                <span class="current-price">${formatPrice(p.price)}</span>
                ${p.originalPrice ? `<span class="original-price">${formatPrice(p.originalPrice)}</span>` : ''}
              </div>
              <button type="button" class="btn btn-primary btn-add-cart" data-add-to-cart="${p.id}" data-qty="1">
                <i class="bi bi-bag-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    const paginationEl = document.getElementById('catalogPagination');
    if (!paginationEl || totalPages <= 1) {
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    let html = `
      <nav aria-label="Catalog pages">
        <ul class="pagination justify-content-center gap-1 mb-0">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link rounded-pill px-3" data-page="${currentPage - 1}" aria-label="Previous">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <button class="page-link rounded-circle" style="width: 42px; height: 42px;" data-page="${i}">${i}</button>
        </li>
      `;
    }

    html += `
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link rounded-pill px-3" data-page="${currentPage + 1}" aria-label="Next">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    `;

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const p = parseInt(btn.getAttribute('data-page'), 10);
        if (p >= 1 && p <= totalPages) {
          currentPage = p;
          renderProducts();
          window.scrollTo({ top: document.getElementById('productsCatalogGrid').offsetTop - 120, behavior: 'smooth' });
        }
      });
    });
  }

  function openQuickView(productId) {
    if (typeof getProductById !== 'function') return;
    const p = getProductById(productId);
    if (!p) return;

    const modalEl = document.getElementById('quickViewModal');
    if (!modalEl) return;

    modalEl.querySelector('.qv-img').src = p.image;
    modalEl.querySelector('.qv-img').alt = p.name;
    modalEl.querySelector('.qv-badge').textContent = p.badge;
    modalEl.querySelector('.qv-badge').className = `badge-pill badge-${p.badgeType || 'bestseller'} qv-badge`;
    modalEl.querySelector('.qv-category').textContent = p.categoryLabel;
    modalEl.querySelector('.qv-title').textContent = p.name;
    modalEl.querySelector('.qv-weight').textContent = p.weight;
    modalEl.querySelector('.qv-price').textContent = `${formatPrice(p.price)}`;
    if (p.originalPrice) {
      modalEl.querySelector('.qv-orig-price').textContent = `${formatPrice(p.originalPrice)}`;
      modalEl.querySelector('.qv-orig-price').style.display = 'inline';
    } else {
      modalEl.querySelector('.qv-orig-price').style.display = 'none';
    }
    modalEl.querySelector('.qv-rating').innerHTML = `<i class="bi bi-star-fill text-warning"></i> ${p.rating} (${p.reviewsCount} reviews)`;
    modalEl.querySelector('.qv-desc').textContent = p.shortDescription;
    modalEl.querySelector('.qv-stock').textContent = p.inStock ? `In Stock (${p.stockCount} available)` : 'Out of Stock';
    modalEl.querySelector('.qv-link').href = `product-details.html?id=${p.id}`;

    const addBtn = modalEl.querySelector('.qv-add-btn');
    const qtyInput = modalEl.querySelector('.qv-qty-input');
    if (qtyInput) qtyInput.value = 1;

    if (addBtn) {
      addBtn.disabled = !p.inStock;
      addBtn.onclick = () => {
        if (qtyInput && (!qtyInput.value || !qtyInput.reportValidity())) return;
        const qty = Number(qtyInput ? qtyInput.value : 1);
        if (!Number.isInteger(qty) || qty < 1 || qty > 99 || !p.inStock) return;
        if (typeof AuraCart !== 'undefined') {
          AuraCart.addItem(p, qty);
          const bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }
      };
    }

    if (window.bootstrap) {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
