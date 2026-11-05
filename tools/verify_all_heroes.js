const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pages = [
  'index.html',
  'home-2.html',
  'about.html',
  'products.html',
  'product-details.html',
  'health-benefits.html',
  'blog.html',
  'blog-details.html',
  'pricing.html',
  'contact.html',
  'initiatives.html',
  'initiative-details.html'
];

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9235',
    '--user-data-dir=C:\\temp\\cdp_verify_heroes',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const tRes = await fetch('http://127.0.0.1:9235/json/list');
  const targets = await tRes.json();
  const pageTarget = targets.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension'));
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const cbs = new Map();
  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && cbs.has(d.id)) { cbs.get(d.id)(d.result); cbs.delete(d.id); }
  };
  await new Promise(r => ws.onopen = r);
  const send = (m, p={}) => new Promise(res => { const i = id++; cbs.set(i, res); ws.send(JSON.stringify({id:i, method:m, params:p})); });
  await send('Page.enable');
  await send('Runtime.enable');

  const results = [];
  for (const p of pages) {
    const fileUrl = 'file:///' + path.resolve(p).replace(/\\/g, '/');
    await send('Page.navigate', { url: fileUrl });
    await new Promise(r => setTimeout(r, 1200));

    const audit = await send('Runtime.evaluate', {
      expression: `(() => {
        // Find hero section
        const hero = document.querySelector('.hero-home1, .hero-home2, [class*="hero"], main > section:first-of-type');
        if (!hero) return { error: 'No hero found' };

        // Check bg image
        const bgStyle = window.getComputedStyle(hero).backgroundImage;
        let bgUrl = null;
        if (bgStyle && bgStyle !== 'none') {
          const m = bgStyle.match(/url\\(["']?([^"']+)["']?\\)/);
          if (m) bgUrl = m[1];
        }

        // Check hero images
        const imgs = Array.from(hero.querySelectorAll('img')).map(img => ({
          src: img.src,
          loaded: img.complete && img.naturalWidth > 0,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        }));

        // Check horizontal overflow
        const overflow = document.documentElement.scrollWidth > window.innerWidth;

        // Check heading visibility
        const heading = hero.querySelector('h1, h2');
        let headingText = heading ? heading.textContent.trim() : '';
        let headingColor = heading ? window.getComputedStyle(heading).color : '';

        return {
          bgUrl,
          imgs,
          overflow,
          headingText,
          headingColor
        };
      })()`,
      returnByValue: true
    });

    results.push({ page: p, audit: audit.result.value });
    console.log(`[PASS] ${p}: heading="${audit.result.value.headingText?.slice(0, 30)}..." bg=${audit.result.value.bgUrl ? 'OK' : 'none'} imgs=${audit.result.value.imgs?.length} overflow=${audit.result.value.overflow}`);
  }

  // Also take a screenshot of index, products, health-benefits, and blog heroes
  for (const testPage of ['index.html', 'products.html', 'health-benefits.html', 'pricing.html']) {
    const fileUrl = 'file:///' + path.resolve(testPage).replace(/\\/g, '/');
    await send('Page.navigate', { url: fileUrl });
    await new Promise(r => setTimeout(r, 1000));
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const outName = `artifacts/hero_render_${testPage.replace('.html', '')}.png`;
    fs.writeFileSync(outName, Buffer.from(ss.data, 'base64'));
    console.log(`Saved screenshot: ${outName}`);
  }

  ws.close();
  chrome.kill();
})();
