const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { root, openBrowser, delay } = require('./millet-browser.cjs');

const representatives = ['foxtail-millet-cookies','sprouted-ragi-flour','air-dried-little-millet-noodles','roasted-pearl-millet-chivda','sprouted-multi-millet-dosa-mix','bundle-starter-box'];
const widths = [320,375,425,768,1024,1440];
const output = path.join(root,'artifacts/product-redesign');
fs.mkdirSync(output,{recursive:true});

const layoutCheck = `(() => {
  const visible = el => el.checkVisibility({checkVisibilityCSS:true});
  const clipped = [...document.querySelectorAll('.pdp *')].filter(visible).filter(el => {
    const r=el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth+1;
  }).map(el => el.id || el.className || el.tagName);
  const rgb = color => (color.match(/[\\d.]+/g)||[]).map(Number);
  const blend = (front,back) => {const a=front[3]??1;return front.slice(0,3).map((v,i)=>v*a+back[i]*(1-a));};
  function background(el) {if(!el)return [255,255,255];const c=rgb(getComputedStyle(el).backgroundColor);return blend(c,background(el.parentElement));}
  const luminance = color => color.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  const contrast = [...document.querySelectorAll('.pdp :is(h1,h2,h3,h4,p,span,th,td,summary,a,button,li)')].filter(el=>visible(el)&&!el.disabled&&[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(el=>{
    const css=getComputedStyle(el), bg=background(el), fg=blend(rgb(css.color),bg), a=luminance(fg),b=luminance(bg);const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);const size=parseFloat(css.fontSize),large=size>=24||(size>=18.66&&parseInt(css.fontWeight)>=700);return {selector:el.id||el.className||el.tagName,text:el.textContent.trim().slice(0,90),color:css.color,background:bg,ratio,required:large?3:4.5};
  });
  return {overflow:document.documentElement.scrollWidth>innerWidth,clipped,contrastFailures:contrast.filter(r=>r.ratio<r.required-.05),minimumContrast:Math.min(...contrast.map(r=>r.ratio)),sections:document.querySelectorAll('main > section').length};
})()`;

(async()=>{
  const browser=await openBrowser();
  const checks=[];
  try {
    await browser.navigate('/product-details.html?id=sprouted-ragi-flour');
    const ids=await browser.evaluate('PRODUCTS_DATA.map(p=>p.id)');
    for(const id of ids) {
      await browser.navigate('/product-details.html?id='+id);
      await browser.evaluate(`Promise.all([...document.querySelectorAll('.pdp img')].map(im=>{im.loading='eager';return im.decode()}))`);
      const content=await browser.evaluate(`(()=>{const p=PRODUCTS_DATA.find(p=>p.id==='${id}');return {title:document.getElementById('productDetailTitle').textContent,expected:p.name,price:document.getElementById('productDetailPrice').textContent,expectedPrice:formatPrice(p.price),images:PRODUCT_DETAIL_IMAGES[p.id].map(i=>i.master),steps:document.querySelectorAll('.pdp-steps > li').length,faqs:document.querySelectorAll('.pdp-faqs details').length,related:[...document.querySelectorAll('#relatedProductsGrid article')].map(c=>c.dataset.productId),nutritionHidden:document.querySelector('.pdp-nutrition-table').hidden,isBundle:p.category==='combos'};})()`);
      assert.equal(content.title,content.expected,id);
      assert.equal(content.price,content.expectedPrice,id);
      assert.equal(content.images.length,4,id);
      assert.equal(new Set(content.images).size,4,id+' distinct photographs');
      assert.equal(content.steps,4,id);
      assert.equal(content.faqs,6,id);
      assert.equal(content.related.length,4,id);
      assert.ok(!content.related.includes(id));
      assert.equal(content.nutritionHidden,content.isBundle,id);
      console.log('PASS content and images: '+id);
    }
    for(const id of representatives) {
      await browser.navigate('/product-details.html?id='+id);
      await browser.evaluate(`Promise.all([...document.querySelectorAll('.pdp img')].map(im=>{im.loading='eager';return im.decode()}))`);
      for(const theme of ['light','dark']) {
        await browser.evaluate(`document.documentElement.dataset.theme='${theme}';document.documentElement.dataset.bsTheme='${theme}'`);
        await delay(500);
        for(const width of widths) {
          await browser.call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
          for(const dir of ['ltr','rtl']) {
            await browser.evaluate(`document.documentElement.dir='${dir}'`);
            const result=await browser.evaluate(layoutCheck);
            checks.push({id,theme,width,dir,...result});
            assert.equal(result.sections,7);
            assert.equal(result.overflow,false,JSON.stringify({id,theme,width,dir,result}));
            assert.deepEqual(result.clipped,[],JSON.stringify({id,theme,width,dir}));
            assert.deepEqual(result.contrastFailures,[],JSON.stringify({id,theme,width,dir}));
          }
          if(id==='sprouted-ragi-flour'&&(width===375||width===1440)) {
            await browser.evaluate(`document.documentElement.dir='ltr';scrollTo(0,0)`);
            const metrics=await browser.call('Page.getLayoutMetrics');
            const shot=await browser.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:metrics.cssContentSize.height,scale:1}});
            fs.writeFileSync(path.join(output,'ragi-'+theme+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
          }
        }
      }
      console.log('PASS responsive / themes / RTL: '+id);
    }
    await browser.call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await browser.navigate('/product-details.html?id=sprouted-ragi-flour');
    await browser.evaluate(`document.documentElement.dir='ltr';AuraCart.clearCart();document.querySelectorAll('.pdp-thumbnail')[2].click()`);
    assert.equal(await browser.evaluate(`document.getElementById('galleryMainImage').getAttribute('src')===PRODUCT_DETAIL_IMAGES['sprouted-ragi-flour'][2].src`),true);
    await browser.evaluate(`document.getElementById('galleryZoomButton').click()`);
    assert.equal(await browser.evaluate(`document.getElementById('productImageZoom').open`),true);
    await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    assert.equal(await browser.evaluate(`document.getElementById('productImageZoom').open`),false);
    await delay(100);
    await browser.evaluate(`document.querySelector('.pdp-faqs summary').focus()`);
    await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});
    await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    assert.equal(await browser.evaluate(`document.querySelector('.pdp-faqs details').open`),true);
    await browser.evaluate(`document.getElementById('detailQtyPlus').click();document.getElementById('detailAddToCartBtn').click()`);
    assert.equal(await browser.evaluate('AuraCart.getCount()'),2);
    await browser.evaluate(`document.getElementById('detailQtyInput').value=100;document.getElementById('detailAddToCartBtn').click()`);
    assert.equal(await browser.evaluate('AuraCart.getCount()'),2);
    await browser.evaluate(`document.querySelector('#relatedProductsGrid [data-add-to-cart]').click()`);
    assert.equal(await browser.evaluate('AuraCart.getCount()'),3);
    await browser.evaluate(`AuraCart.openDrawer()`);await delay(600);
    await browser.evaluate(`document.getElementById('cartCheckoutBtn').click()`);await delay(900);
    assert.equal(await browser.evaluate(`document.getElementById('checkoutDemoModal').classList.contains('show')`),true);
    await browser.evaluate(`document.querySelectorAll('#checkoutDemoForm input').forEach(input=>input.value='demo');document.getElementById('checkoutDemoForm').requestSubmit()`);
    assert.equal(await browser.evaluate('AuraCart.getCount()'),0);
    assert.equal(await browser.evaluate(`document.getElementById('checkoutDemoAlert').textContent.includes('completed successfully')`),true);
    await browser.navigate('/product-details.html?id=does-not-exist');
    assert.equal(await browser.evaluate(`document.querySelector('main h1').textContent`),'Product not found');
    console.log('PASS gallery, zoom/Escape, FAQ keyboard, quantity, cart, related Add, checkout, and invalid ID');
    fs.writeFileSync(path.join(output,'checks.json'),JSON.stringify({checks,passed:true},null,2));
  } finally {browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
