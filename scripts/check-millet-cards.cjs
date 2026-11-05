const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { root, delay, openBrowser } = require('./millet-browser.cjs');

(async () => {
  const output = path.join(root, 'artifacts/millet-cards');
  fs.mkdirSync(output, { recursive: true });
  const browser = await openBrowser();
  const results = [];
  const errors = [];
  try {
    await browser.navigate('/health-benefits.html');
    await browser.evaluate(`Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 4000))]) .then(() => true)`);
    for (const width of [320, 375, 425, 768, 1024, 1440]) {
      await browser.call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
      for (const theme of ['light', 'dark']) {
        await browser.evaluate(`document.documentElement.dataset.theme = '${theme}'; document.documentElement.dataset.bsTheme = '${theme}'; document.documentElement.dir = 'ltr'; document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('milletVarieties').scrollIntoView();`);
        await browser.evaluate(`Promise.all([...document.querySelectorAll('.millet-card img')].map(image => {image.loading = 'eager'; return image.decode();})).then(() => true)`);
        await delay(350);
        const result = await browser.evaluate(`(() => {
          const rect = el => {const r = el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
          const inside = (inner, outer) => inner.x >= outer.x - 1 && inner.right <= outer.right + 1 && inner.y >= outer.y - 1 && inner.bottom <= outer.bottom + 1;
          const luminance = color => {const c = color.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
          const contrast = (foreground,background) => {const a=luminance(foreground),b=luminance(background);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
          const cards = [...document.querySelectorAll('.millet-card')].map(card => {
            const image=card.querySelector('img'), badge=card.querySelector('.badge-pill'), stats=card.querySelector('.millet-stats'), body=card.querySelector('.product-body');
            const cardBounds=rect(card),bodyBounds=rect(body);
            const background=getComputedStyle(card).backgroundColor;
            const textElements=[card.querySelector('h3'),card.querySelector('p'),body.firstElementChild,...stats.querySelectorAll('span,strong')];
            return {title:card.querySelector('h3').textContent, bounds:cardBounds, image:rect(image), loaded:image.complete && image.naturalWidth>0, src:image.currentSrc, badgeFits:inside(rect(badge),rect(card.querySelector('.product-thumb-wrap'))), statsFit:[...stats.children].every(el=>inside(rect(el),bodyBounds) && el.scrollWidth<=el.clientWidth+1), textFits:textElements.every(el=>el.scrollWidth<=el.clientWidth+1), minTextContrast:Math.min(...textElements.map(el=>contrast(getComputedStyle(el).color,background))), badgeContrast:contrast(getComputedStyle(badge).color,getComputedStyle(badge).backgroundColor)};
          });
          return {width:innerWidth,contentWidth:document.documentElement.clientWidth,theme:document.documentElement.dataset.theme,pageOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,cards};
        })()`);
        const label = width + 'px ' + theme;
        try {
          assert.equal(result.cards.length, 6, 'Six varieties');
          assert.equal(new Set(result.cards.map(card => card.src)).size, 6, 'Unique images');
          assert(!result.pageOverflow, 'Page overflow');
          for (const card of result.cards) {
            assert(card.loaded, card.title + ': image loaded');
            assert(card.bounds.x >= -1 && card.bounds.right <= result.contentWidth + 1, card.title + ': card inside viewport');
            assert(Math.abs(card.image.width / card.image.height - 16 / 9) < 0.01, card.title + ': undistorted image ratio');
            assert(card.badgeFits && card.statsFit && card.textFits, card.title + ': text and badge fit');
            assert(card.minTextContrast >= 4.5 && card.badgeContrast >= 4.5, card.title + ': readable contrast');
          }
          for (const card of result.cards) {
            const row = result.cards.filter(other => Math.abs(other.bounds.y - card.bounds.y) < 1);
            assert(row.every(other=>Math.abs(other.bounds.height-card.bounds.height)<1), 'Equal card heights within rows');
          }
          console.log('PASS ' + label + ': 6 unique images, layout, metrics, contrast.');
        } catch (error) { errors.push(label + ': ' + error.message); console.log('FAIL ' + label + ': ' + error.message); }
        results.push(result);
        if (width === 320 || width === 1440) {
          await browser.evaluate(`document.querySelectorAll('.site-header, .back-to-top').forEach(el=>el.style.visibility='hidden')`);
          const clip = await browser.evaluate(`(() => {const r=document.getElementById('milletVarieties').getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:r.height,scale:1};})()`);
          const shot = await browser.call('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
          fs.writeFileSync(path.join(output, 'millets-' + width + '-' + theme + '.png'), Buffer.from(shot.data, 'base64'));
          await browser.evaluate(`document.querySelectorAll('.site-header, .back-to-top').forEach(el=>el.style.removeProperty('visibility'))`);
        }
      }
    }
    await browser.evaluate(`document.documentElement.dir='rtl'`);
    const rtlFits = await browser.evaluate(`document.documentElement.scrollWidth <= innerWidth && [...document.querySelectorAll('.millet-card')].every(el => {const r=el.getBoundingClientRect();return r.left>=0 && r.right<=innerWidth;})`);
    assert(rtlFits, 'RTL card bounds');
    fs.writeFileSync(path.join(output, 'checks.json'), JSON.stringify({results, errors, rtlFits}, null, 2) + '\n');
    if (errors.length) throw new Error(errors.join('\n'));
  } finally { browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
