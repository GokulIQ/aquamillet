const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9231',
    '--user-data-dir=C:\\temp\\cdp_verify_products_2',
    '--window-size=1440,3200',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const tRes = await fetch('http://127.0.0.1:9231/json/list');
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
  const fileUrl = 'file:///' + path.resolve('products.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await send('Page.navigate', { url: fileUrl });
  await new Promise(r => setTimeout(r, 2000));
  
  const cardData = await send('Runtime.evaluate', {
    expression: "Array.from(document.querySelectorAll('.product-card')).map(c => ({ title: c.querySelector('.product-title a')?.textContent.trim(), img: c.querySelector('.product-thumb-wrap img')?.src }))",
    returnByValue: true
  });
  console.log('Cards count:', cardData.result.value.length);
  cardData.result.value.forEach((c, idx) => {
    console.log(`${idx + 1}. [${c.title}] -> ${c.img}`);
  });

  const ss = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('artifacts/products_current_render.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved artifacts/products_current_render.png');

  ws.close();
  chrome.kill();
})();
