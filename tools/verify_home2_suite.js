const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting comprehensive Chrome CDP verification of Home Page 2...');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9250',
    '--user-data-dir=C:\\temp\\cdp_verify_home2_suite',
    '--window-size=1440,2400',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1600));

  const tRes = await fetch('http://127.0.0.1:9250/json/list');
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

  const home2Url = 'file:///' + path.resolve('home-2.html').replace(/\\/g, '/');
  console.log('\n--- Navigating to home-2.html ---');
  await send('Page.navigate', { url: home2Url });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll through page to trigger lazy loading
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight / 2)' });
  await new Promise(r => setTimeout(r, 800));
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
  await new Promise(r => setTimeout(r, 800));

  // 1. Audit Section 2: Lifestyle Collections
  const collections = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('section:nth-of-type(2) .bundle-card, .bundle-card')).slice(0, 4).map(c => {
      const title = c.querySelector('h3')?.textContent.trim();
      const img = c.querySelector('img');
      const link = c.querySelector('a')?.href;
      return {
        title,
        src: img?.src,
        loaded: img?.complete && img?.naturalWidth > 0,
        w: img?.naturalWidth,
        h: img?.naturalHeight,
        link
      };
    })`,
    returnByValue: true
  });

  console.log('\n--- Section 2: Lifestyle Collections (4 Cards) ---');
  collections.result.value.forEach((c, idx) => {
    console.log(`Card ${idx + 1}: [${c.title}]`);
    console.log(`  Loaded: ${c.loaded} (${c.w}x${c.h})`);
    console.log(`  Src: ${c.src?.slice(-45)}`);
    console.log(`  CTA Link: ${c.link}`);
  });

  // 2. Audit Section 4: Healthy Millet Recipes
  const recipes = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('#recipesSection .benefit-feature-card')).map(c => {
      const title = c.querySelector('h3')?.textContent.trim();
      const img = c.querySelector('img');
      const link = c.querySelector('a')?.href;
      return {
        title,
        src: img?.src,
        loaded: img?.complete && img?.naturalWidth > 0,
        w: img?.naturalWidth,
        h: img?.naturalHeight,
        link
      };
    })`,
    returnByValue: true
  });

  console.log('\n--- Section 4: Healthy Millet Recipes (3 Cards) ---');
  recipes.result.value.forEach((c, idx) => {
    console.log(`Recipe ${idx + 1}: [${c.title}]`);
    console.log(`  Loaded: ${c.loaded} (${c.w}x${c.h})`);
    console.log(`  Src: ${c.src?.slice(-45)}`);
    console.log(`  CTA Link: ${c.link}`);
  });

  // 3. Audit Section 6: Stories from the Wholesome Kitchen
  const blogCards = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('section:nth-of-type(6) .blog-card, main > section:nth-of-type(6) .blog-card')).map(c => {
      const title = c.querySelector('h3')?.textContent.trim();
      const img = c.querySelector('img');
      const link = c.querySelector('a')?.href;
      return {
        title,
        src: img?.src,
        loaded: img?.complete && img?.naturalWidth > 0,
        w: img?.naturalWidth,
        h: img?.naturalHeight,
        link
      };
    })`,
    returnByValue: true
  });

  console.log('\n--- Section 6: Stories from Wholesome Kitchen (3 Cards) ---');
  blogCards.result.value.forEach((c, idx) => {
    console.log(`Blog ${idx + 1}: [${c.title?.slice(0, 35)}...]`);
    console.log(`  Loaded: ${c.loaded} (${c.w}x${c.h})`);
    console.log(`  Src: ${c.src?.slice(-45)}`);
    console.log(`  CTA Link: ${c.link}`);
  });

  // Check uniqueness across all 10 images
  const all10 = [
    ...collections.result.value.map(c => c.src),
    ...recipes.result.value.map(c => c.src),
    ...blogCards.result.value.map(c => c.src)
  ];
  const uniqueCount = new Set(all10).size;
  console.log(`\nUniqueness Check: ${uniqueCount} unique images out of ${all10.length} total slots.`);

  // 4. Capture screenshot of each section
  // Scroll to Lifestyle Collections
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 750)' });
  await new Promise(r => setTimeout(r, 600));
  let ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/home2_collections_verified.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/home2_collections_verified.png');

  // Scroll to Recipes
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1850)' });
  await new Promise(r => setTimeout(r, 600));
  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/home2_recipes_verified.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/home2_recipes_verified.png');

  // Scroll to Journal
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3200)' });
  await new Promise(r => setTimeout(r, 600));
  ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/home2_journal_verified.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/home2_journal_verified.png');

  // 5. Responsive Viewport Check (320px to 1440px)
  console.log('\n--- Responsive Overflow Audit ---');
  const viewports = [320, 375, 425, 768, 1024, 1440];
  for (const w of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w < 768
    });
    await send('Page.navigate', { url: home2Url });
    await new Promise(r => setTimeout(r, 500));

    const overflow = await send('Runtime.evaluate', {
      expression: 'document.documentElement.scrollWidth > window.innerWidth',
      returnByValue: true
    });
    console.log(`Viewport ${w}px on home-2.html: Horizontal Overflow = ${overflow.result.value}`);
  }

  ws.close();
  chrome.kill();
  console.log('\nHome Page 2 verification completed successfully!');
})();
