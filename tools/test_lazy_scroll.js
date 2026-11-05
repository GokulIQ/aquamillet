const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9247',
    '--user-data-dir=C:\\temp\\cdp_lazy_check',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const tRes = await fetch('http://127.0.0.1:9247/json/list');
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

  const blogUrl = 'file:///' + path.resolve('blog.html').replace(/\\/g, '/');
  await send('Page.navigate', { url: blogUrl });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to blog cards grid
  await send('Runtime.evaluate', {
    expression: `window.scrollTo(0, document.getElementById('blogPostsGrid').offsetTop)`
  });
  await new Promise(r => setTimeout(r, 1500));

  const cards = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('#blogPostsGrid .blog-card')).map(c => {
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

  console.log('Page 1 Cards after scroll:');
  cards.result.value.forEach((c, idx) => {
    console.log(`${idx + 1}. [${c.title?.slice(0, 30)}...] -> loaded=${c.loaded} (${c.width}x${c.height})`);
  });

  ws.close();
  chrome.kill();
})();
