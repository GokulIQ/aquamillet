const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9251',
    '--user-data-dir=C:\\temp\\cdp_check_sec7',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const tRes = await fetch('http://127.0.0.1:9251/json/list');
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

  const home2Url = 'file:///' + path.resolve('home-2.html').replace(/\\/g, '/');
  await send('Page.navigate', { url: home2Url });
  await new Promise(r => setTimeout(r, 1500));

  const blogCards = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('.blog-card')).map(c => {
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

  console.log('Stories from Wholesome Kitchen Cards on home-2.html:');
  blogCards.result.value.forEach((c, idx) => {
    console.log(`Blog ${idx + 1}: [${c.title}]`);
    console.log(`  Loaded: ${c.loaded} (${c.w}x${c.h})`);
    console.log(`  Src: ${c.src}`);
    console.log(`  Link: ${c.link}`);
  });

  ws.close();
  chrome.kill();
})();
