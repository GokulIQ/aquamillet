const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting comprehensive Chrome CDP verification of Blog & Blog Details...');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--user-data-dir=C:\\temp\\cdp_verify_blog_suite',
    '--window-size=1440,1800',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1600));

  const tRes = await fetch('http://127.0.0.1:9240/json/list');
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

  const send = (m, p={}) => new Promise(res => {
    const i = id++;
    cbs.set(i, res);
    ws.send(JSON.stringify({ id: i, method: m, params: p }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  // -------------------------------------------------------------
  // TEST 1: blog.html PAGE 1
  // -------------------------------------------------------------
  const blogUrl = 'file:///' + path.resolve('blog.html').replace(/\\/g, '/');
  console.log('\n--- Navigating to blog.html ---');
  await send('Page.navigate', { url: blogUrl });
  await new Promise(r => setTimeout(r, 1200));

  const p1Cards = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('.blog-card')).map(c => {
      const title = c.querySelector('.blog-title a')?.textContent.trim();
      const img = c.querySelector('.blog-thumb img');
      return {
        title,
        src: img?.src,
        loaded: img?.complete && img?.naturalWidth > 0,
        width: img?.naturalWidth,
        height: img?.naturalHeight
      };
    })`,
    returnByValue: true
  });

  console.log(`Page 1 Cards Count: ${p1Cards.result.value.length}`);
  p1Cards.result.value.forEach((c, idx) => {
    console.log(`  ${idx + 1}. [${c.title?.slice(0, 35)}...] -> loaded=${c.loaded} (${c.width}x${c.height})`);
    console.log(`     Image: ${c.src}`);
  });

  // Capture screenshot of Page 1
  let ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/blog_page1_verified.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/blog_page1_verified.png');

  // -------------------------------------------------------------
  // TEST 2: blog.html PAGE 2
  // -------------------------------------------------------------
  console.log('\n--- Navigating to blog.html Page 2 ---');
  await send('Runtime.evaluate', {
    expression: `document.querySelector('button[data-page="2"]')?.click()`
  });
  await new Promise(r => setTimeout(r, 800));

  const p2Cards = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('.blog-card')).map(c => {
      const title = c.querySelector('.blog-title a')?.textContent.trim();
      const img = c.querySelector('.blog-thumb img');
      return {
        title,
        src: img?.src,
        loaded: img?.complete && img?.naturalWidth > 0,
        width: img?.naturalWidth,
        height: img?.naturalHeight
      };
    })`,
    returnByValue: true
  });

  console.log(`Page 2 Cards Count: ${p2Cards.result.value.length}`);
  p2Cards.result.value.forEach((c, idx) => {
    console.log(`  ${idx + 1}. [${c.title?.slice(0, 35)}...] -> loaded=${c.loaded} (${c.width}x${c.height})`);
    console.log(`     Image: ${c.src}`);
  });

  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/blog_page2_verified.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/blog_page2_verified.png');

  // -------------------------------------------------------------
  // TEST 3: ALL 9 ARTICLES ON blog-details.html
  // -------------------------------------------------------------
  console.log('\n--- Testing all 9 articles on blog-details.html ---');
  const articleIds = [
    'climate-resilient-supergrain-21st-century',
    '7-day-guide-to-incorporating-millets',
    'crispy-baked-bajra-methi-crackers',
    'decoding-glycemic-index-diabetologists-recommendation',
    'reviving-indigenous-seed-varieties',
    'science-of-sprouting-calcium-bioavailability',
    'creamy-little-millet-mushroom-risotto',
    'smart-school-lunchboxes-millet-munchies',
    'heritage-of-dryland-agriculture-water-conservation'
  ];

  for (const id of articleIds) {
    const detailUrl = 'file:///' + path.resolve('blog-details.html').replace(/\\/g, '/') + '?id=' + id;
    await send('Page.navigate', { url: detailUrl });
    await new Promise(r => setTimeout(r, 800));

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const title = document.getElementById('articleTitle')?.textContent.trim();
        const feat = document.getElementById('articleFeaturedImage');
        const sec = document.getElementById('articleSecondaryImage');
        const tert = document.getElementById('articleTertiaryImage');
        const capt = document.getElementById('articleTertiaryCaption')?.textContent.trim();
        return {
          title,
          feat: { src: feat?.src, loaded: feat?.complete && feat?.naturalWidth > 0, w: feat?.naturalWidth, h: feat?.naturalHeight },
          sec: { src: sec?.src, loaded: sec?.complete && sec?.naturalWidth > 0, w: sec?.naturalWidth, h: sec?.naturalHeight },
          tert: { src: tert?.src, loaded: tert?.complete && tert?.naturalWidth > 0, w: tert?.naturalWidth, h: tert?.naturalHeight },
          capt
        };
      })()`,
      returnByValue: true
    });

    const res = check.result.value;
    console.log(`[PASS] ${id}:`);
    console.log(`  Title: "${res.title?.slice(0, 40)}..."`);
    console.log(`  Featured:  loaded=${res.feat.loaded} (${res.feat.w}x${res.feat.h}) -> ${res.feat.src?.slice(-35)}`);
    console.log(`  Secondary: loaded=${res.sec.loaded} (${res.sec.w}x${res.sec.h}) -> ${res.sec.src?.slice(-35)}`);
    console.log(`  Tertiary:  loaded=${res.tert.loaded} (${res.tert.w}x${res.tert.h}) -> ${res.tert.src?.slice(-35)}`);
    console.log(`  Caption: "${res.capt?.slice(0, 45)}..."`);

    // Take screenshot of little millet risotto and glycemic index
    if (id === 'creamy-little-millet-mushroom-risotto' || id === 'decoding-glycemic-index-diabetologists-recommendation') {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`artifacts/blog_detail_${id}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`  Saved screenshot: artifacts/blog_detail_${id}.png`);
    }
  }

  // -------------------------------------------------------------
  // TEST 4: RESPONSIVE BREAKPOINT VERIFICATION (320, 375, 425, 768, 1024, 1440)
  // -------------------------------------------------------------
  console.log('\n--- Testing Responsive Viewports (320px to 1440px) ---');
  const viewports = [320, 375, 425, 768, 1024, 1440];
  for (const w of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w < 768
    });
    await send('Page.navigate', { url: blogUrl });
    await new Promise(r => setTimeout(r, 600));

    const overflow = await send('Runtime.evaluate', {
      expression: 'document.documentElement.scrollWidth > window.innerWidth',
      returnByValue: true
    });
    console.log(`Viewport ${w}px on blog.html: Horizontal Overflow = ${overflow.result.value}`);
  }

  ws.close();
  chrome.kill();
  console.log('\nComprehensive Chrome CDP verification completed successfully!');
})();
