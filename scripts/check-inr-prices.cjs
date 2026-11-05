const assert = require('node:assert/strict');
const { openBrowser, delay } = require('./millet-browser.cjs');

(async () => {
  const browser = await openBrowser();
  try {
    await browser.navigate('/index.html');
    await browser.evaluate(`(() => {
      localStorage.setItem('auramillet_cart_items', JSON.stringify([
        {id:'foxtail-millet-cookies',name:'Cookies',price:6.49,quantity:2,image:''}
      ]));
      localStorage.setItem('auramillet_active_promo', JSON.stringify({code:'SUPERGRAIN',type:'fixed',value:5}));
    })()`);
    await browser.navigate('/index.html');
    assert.equal(await browser.evaluate('AuraCart.getSubtotal()'), 398);
    assert.equal(await browser.evaluate('AuraCart.getCount()'), 2);
    assert.equal(await browser.evaluate(`JSON.parse(localStorage.getItem('auramillet_cart_items'))[0].price`), 199);
    assert.equal(await browser.evaluate(`document.getElementById('cartTotalAmount').textContent`), '₹298');
    await browser.evaluate(`AuraCart.applyPromo('MILLETS10')`);
    assert.equal(await browser.evaluate(`document.getElementById('cartTotalAmount').textContent`), '₹358.20');
    console.log('PASS saved USD basket repriced, quantities preserved, both coupons calculate in INR');

    for (const page of ['index.html', 'home-2.html', 'products.html', 'pricing.html']) {
      await browser.navigate('/' + page);
      const mismatches = await browser.evaluate(`(() => {
        return [...document.querySelectorAll('.product-card')].flatMap(card => {
          const button = card.querySelector('[data-add-to-cart]');
          if (!button) return [];
          const product = getProductById(button.dataset.addToCart);
          const current = card.querySelector('.current-price');
          const original = card.querySelector('.original-price');
          return [current && current.textContent.trim() !== formatPrice(product.price),
            original && original.textContent.trim() !== formatPrice(product.originalPrice)].filter(Boolean);
        });
      })()`);
      assert.deepEqual(mismatches, [], page);
      assert.equal(await browser.evaluate(`/\u0024[0-9]/.test(document.body.textContent)`), false, page);
      const trigger = await browser.evaluate(`document.querySelector('[data-quick-view]')?.dataset.quickView`);
      if (trigger) {
        await browser.evaluate(`document.querySelector('[data-quick-view]').click()`);
        await delay(600);
        assert.equal(await browser.evaluate(`document.querySelector('.qv-price').textContent === formatPrice(getProductById('${trigger}').price)`), true);
        await browser.evaluate(`bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide()`);
        await delay(600);
      }
      console.log('PASS ' + page + ': matching INR product prices and Quick View');
    }

    await browser.navigate('/products.html');
    assert.equal(await browser.evaluate(`document.querySelectorAll('#productsCatalogGrid .product-card').length`), 8);
    await browser.evaluate(`const slider=document.getElementById('priceRangeSlider'); slider.value=200; slider.dispatchEvent(new Event('input'))`);
    assert.equal(await browser.evaluate(`Array.from(document.querySelectorAll('#productsCatalogGrid .product-card')).every(card => getProductById(card.dataset.productId).price <= 200)`), true);
    await browser.evaluate(`document.getElementById('resetFiltersBtn').click()`);
    assert.equal(await browser.evaluate(`document.getElementById('priceRangeDisplay').textContent`), '₹2,000');
    assert.equal(await browser.evaluate(`PRODUCTS_DATA.filter(p => p.category === 'combos').every(p => p.savingsValue === formatPrice(p.originalPrice-p.price) && p.savingsPercent === Math.round((p.originalPrice-p.price)/p.originalPrice*100)+'%')`), true);
    await browser.evaluate(`AuraCart.clearCart(); AuraCart.addItem(getProductById('bundle-family-pack'))`);
    assert.equal(await browser.evaluate(`document.getElementById('freeShippingText').textContent.includes('unlocked')`), true);
    console.log('PASS INR price filter, reset, bundle savings, and free shipping at ₹999');

    const ids = await browser.evaluate('PRODUCTS_DATA.map(p => p.id)');
    for (const id of ids) {
      await browser.navigate('/product-details.html?id=' + id);
      assert.equal(await browser.evaluate(`document.getElementById('productDetailPrice').textContent === formatPrice(getProductById('${id}').price)`), true, id);
    }
    console.log('PASS all 16 product detail prices');
  } finally {
    browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
