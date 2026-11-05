const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9245',
    '--user-data-dir=C:\\temp\\cdp_debug_p1',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const tRes = await fetch('http://127.0.0.1:9245/json/list');
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

  const debug = await send('Runtime.evaluate', {
    expression: `(() => {
      const postsDataExists = typeof BLOG_POSTS_DATA !== 'undefined';
      const postsCount = postsDataExists ? BLOG_POSTS_DATA.length : 0;
      const grid = document.getElementById('blogPostsGrid');
      const gridHtml = grid ? grid.innerHTML : null;
      const cards = document.querySelectorAll('.blog-card');
      return {
        postsDataExists,
        postsCount,
        gridExists: !!grid,
        gridChildren: grid ? grid.children.length : 0,
        cardsCount: cards.length,
        paginationHtml: document.getElementById('blogPagination')?.innerHTML
      };
    })()`,
    returnByValue: true
  });

  console.log('Debug result:', JSON.stringify(debug.result.value, null, 2));

  ws.close();
  chrome.kill();
})();
