const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { openBrowser, delay } = require('./millet-browser.cjs');

(async () => {
  const browser = await openBrowser();
  try {
    const root = path.resolve(__dirname, '..');
    const pages = fs.readdirSync(root).filter(file => file.endsWith('.html') && fs.readFileSync(path.join(root, file), 'utf8').includes('id="cartCheckoutBtn"'));
    for (const page of pages) {
      await browser.navigate('/' + page);
      await browser.evaluate(`(() => {
        AuraCart.clearCart();
        AuraCart.addItem({ id: 'checkout-test', name: 'Test millet', price: 10, image: '' });
        AuraCart.applyPromo('MILLETS10');
        AuraCart.openDrawer();
      })()`);
      await delay(400);
      await browser.evaluate(`document.getElementById('cartCheckoutBtn').click()`);
      await delay(800);
      assert.equal(await browser.evaluate(`!!document.querySelector('#checkoutDemoModal.show') && !document.querySelector('.offcanvas.show')`), true, page + ': modal opens after basket closes');
      await browser.evaluate(`document.getElementById('checkoutDemoForm').requestSubmit()`);
      assert.equal(await browser.evaluate(`AuraCart.getCount()`), 1, page + ': invalid form preserves basket');
      await browser.evaluate(`(() => {
        const form = document.getElementById('checkoutDemoForm');
        form.querySelectorAll('input').forEach((input, i) => input.value = ['123 Demo Street', '4242424242424242', '12/28 123'][i]);
        form.requestSubmit();
      })()`);
      assert.equal(await browser.evaluate(`document.getElementById('checkoutDemoForm').hidden && document.getElementById('checkoutDemoAlert').textContent.includes('completed successfully') && document.activeElement.id === 'checkoutDemoAlert'`), true, page + ': accessible success confirmation');
      assert.equal(await browser.evaluate(`AuraCart.getCount() === 0 && localStorage.getItem('auramillet_cart_items') === '[]' && localStorage.getItem('auramillet_active_promo') === null`), true, page + ': basket and discount cleared');
      assert.equal(await browser.evaluate(`Array.from(document.querySelectorAll('#checkoutDemoForm input')).every(input => input.value === '')`), true, page + ': sensitive fields cleared');
      await browser.evaluate(`document.getElementById('checkoutDemoForm').dispatchEvent(new Event('submit', {cancelable:true}))`);
      assert.equal(await browser.evaluate(`document.getElementById('checkoutDemoAlert').textContent.includes('completed successfully')`), true, page + ': duplicate submission ignored');
      await browser.evaluate(`document.querySelector('#checkoutDemoAlert button').click()`);
      await delay(400);
      assert.equal(await browser.evaluate(`!document.querySelector('.modal.show, .modal-backdrop, .offcanvas-backdrop')`), true, page + ': continue shopping dismisses overlays');
      await browser.evaluate(`bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutDemoModal')).show()`);
      await delay(400);
      assert.equal(await browser.evaluate(`!document.getElementById('checkoutDemoForm').hidden && document.getElementById('checkoutDemoAlert').style.display === 'none'`), true, page + ': checkout resets on reopening');
      await browser.evaluate(`(() => {
        const form = document.getElementById('checkoutDemoForm');
        form.querySelectorAll('input').forEach(input => input.value = 'demo');
        form.requestSubmit();
      })()`);
      assert.equal(await browser.evaluate(`document.getElementById('checkoutDemoAlert').textContent.includes('basket is empty')`), true, page + ': empty basket blocked');
      await browser.navigate('/' + page);
      assert.equal(await browser.evaluate(`AuraCart.getCount()`), 0, page + ': cleared basket persists after reload');
      console.log('PASS ' + page);
    }
  } finally {
    browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
