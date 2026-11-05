/** Dynamic seven-section product experience; works without a server. */
(function () {
  'use strict';
  const byId = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (id, value) => { if (byId(id)) byId(id).textContent = value; };
  const cleanIngredient = value => value.replace(/certified\s+/gi, '').replace(/organic\s+/gi, '');

  function setPhoto(element, photo, sizes) {
    element.src = photo.src || photo.path;
    element.alt = photo.alt;
    element.width = photo.width || 960;
    element.height = photo.height || 960;
    if (photo.srcset) element.srcset = photo.srcset;
    else element.removeAttribute('srcset');
    element.sizes = sizes;
  }

  function init() {
    if (!byId('productDetailsView')) return;
    const id = new URLSearchParams(location.search).get('id') || 'foxtail-millet-cookies';
    const p = PRODUCTS_DATA.find(product => product.id === id);
    if (!p) {
      byId('mainContent').innerHTML = '<section class="pdp-section"><div class="container"><h1>Product not found</h1><p>This product is not in our current pantry.</p><a class="btn btn-primary" href="products.html">Browse products</a></div></section>';
      document.title = 'Product not found | AuraMillet';
      return;
    }
    const e = PRODUCT_EXPERIENCES[p.id] || {
      intro: p.name, taste: ['Explore the product', 'See the final pack for full details.'],
      title: 'Prepare it your way', time: 'Follow pack directions', needs: 'See the final pack for ingredients and quantities.',
      steps: [['Read the pack', 'Use the product-specific preparation instructions on the final pack.']],
      serving: 'Follow the serving suggestions on the final pack.', opened: 'Follow the storage instructions on the final pack.',
      process: ['Prepare the product', 'Processing details are not available for this demonstration.'], related: []
    };
    const photos = typeof PRODUCT_DETAIL_IMAGES !== 'undefined' && PRODUCT_DETAIL_IMAGES[id]
      ? PRODUCT_DETAIL_IMAGES[id]
      : [...new Set(p.gallery || [p.image])].map((path, i) => ({path, alt: p.name + ' - view ' + (i+1)}));
    document.title = p.name + ' | AuraMillet Organics';
    document.querySelector('meta[name="description"]').content = e.intro;
    text('productDetailTitle', p.name);
    text('productDetailCategory', p.categoryLabel);
    text('productDetailBadge', p.category === 'combos' ? 'Pantry collection' : e.time === 'Ready to serve' ? 'Ready to enjoy' : 'Pantry favourite');
    text('productDetailShortDesc', e.intro);
    text('productDetailPrice', formatPrice(p.price));
    text('productDetailOrigPrice', p.originalPrice > p.price ? formatPrice(p.originalPrice) : '');
    text('productDetailSavings', p.originalPrice > p.price ? 'Save ' + formatPrice(p.originalPrice-p.price) : '');
    text('productDetailWeight', p.weight);
    text('productDetailSku', p.sku || 'Not supplied');
    text('productDetailStock', p.inStock ? 'Available in demo store' : 'Currently unavailable');
    const ingredients = (p.ingredients || p.includedItems || []).map(cleanIngredient);
    byId('productIngredientHighlights').innerHTML = ingredients.slice(0,3).map(s => '<span>' + escape(s.replace(/\s*\([^)]*\)/g,'')) + '</span>').join('');
    byId('productDetailIngredientsList').innerHTML = ingredients.length ? ingredients.map(s => '<li>' + escape(s) + '</li>').join('') : '<li>Ingredients have not been supplied. Check the final pack.</li>';
    text('ingredientsHeading', p.category === 'combos' ? 'Inside this collection' : 'The recipe ingredients');
    const allergens = p.allergens && /contains|facility|see individual/i.test(p.allergens) ? p.allergens : 'A verified allergen declaration is not available. Check the final pack before purchase.';
    text('productDetailAllergens', allergens);
    text('ingredientCaption', p.category === 'combos' ? 'A closer look at the included foods.' : 'Ingredient view • sample recipe; check the final label.');
    const ingredientPhoto = photos.find(photo => photo.role === 'ingredients') || photos[1] || photos[0];
    const preparationPhoto = photos.find(photo => photo.role === 'serving') || photos.find(photo => photo.role === 'preparation') || photos[2] || photos[0];
    setPhoto(byId('productIngredientImage'), ingredientPhoto, '(min-width: 992px) 45vw, 100vw');
    setPhoto(byId('productPreparationImage'), preparationPhoto, '(min-width: 992px) 45vw, 100vw');
    text('productTasteTitle', e.taste[0]);
    text('productTasteText', e.taste[1]);
    const nutrition = p.nutrition || {};
    const rows = [['Energy',nutrition.calories],['Protein',nutrition.protein],['Carbohydrates',nutrition.carbs],['Dietary fibre',nutrition.fiber],['Fat',nutrition.fats],['Iron',nutrition.iron],['Calcium',nutrition.calcium]];
    text('nutritionServing', 'Sample serving: ' + (nutrition.servingSize || 'Not supplied'));
    if (p.category === 'combos' || !p.nutrition) {
      byId('nutritionTableBody').closest('table').hidden = true;
      text('nutritionNote', 'This collection contains separate products, each with its own ingredients, serving size, allergens, and nutrition label. A combined nutrition value would be misleading; read each individual pack.');
    } else {
      byId('nutritionTableBody').innerHTML = rows.filter(([,value]) => value).map(([label,value]) => '<tr><th scope="row">'+escape(label)+'</th><td>'+escape(String(value).replace(/\s*\([^)]*DV\)/g,''))+'</td></tr>').join('');
    }
    text('preparationHeading', e.title);
    text('preparationTime', e.time);
    text('preparationNeeds', e.needs);
    text('productServingSuggestion', e.serving);
    byId('productPreparationSteps').innerHTML = e.steps.map(([title,body],i) => '<li><span class="pdp-step-number" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span><div><h3>'+escape(title)+'</h3><p>'+escape(body)+'</p></div></li>').join('');
    text('careIntroduction', 'Simple care for '+p.name.replace(/\s*\([^)]*\)/g,'')+'. Always follow the storage label on your final pack.');
    const care = [
      ['bi-house','Choose its spot',p.id === 'ragi-dark-chocolate-bites' ? 'A cool, dry cupboard away from heat. The sample guidance recommends below 22°C.' : 'Choose a cool, dry cupboard away from sunlight, steam, and strong odours.'],
      ['bi-box-seam','After opening',e.opened],
      ['bi-droplet','Keep moisture out',p.category === 'combos' ? 'Keep each pack dry and sealed. Store prepared food separately from the remaining dry ingredients.' : 'Use clean, dry utensils. Close the pack before cooking nearby or adding wet accompaniments.'],
      ['bi-calendar-check','Read the date','A verified shelf life is not supplied for this demo. Follow the printed best-before date and keep the batch label.']
    ];
    byId('productCareCards').innerHTML = care.map(([icon,title,body]) => '<article><i class="bi '+icon+'" aria-hidden="true"></i><h3>'+escape(title)+'</h3><p>'+escape(body)+'</p></article>').join('');
    const process = [['Millet cultivation','A typical journey begins with the millet crop. Farm origin is not verified in this demo.'],['Ingredient selection',p.category === 'combos' ? 'Each component has its own recipe and ingredient list.' : 'Ingredients are selected for the recipe shown above.'],['Cleaning & preparation',p.category === 'combos' ? 'Each included food is prepared separately before assembly.' : 'Grains and other ingredients are prepared for the next stage.'],e.process,['Pack inspection','A real batch would require its own documented checks. No test report is linked here.'],['Seal & dispatch','The example journey ends with sealed packs. This demo does not dispatch orders.']];
    byId('productProcessTimeline').innerHTML = process.map(([title,body],i) => '<li><span>'+String(i+1).padStart(2,'0')+'</span><h3>'+escape(title)+'</h3><p>'+escape(body)+'</p></li>').join('');
    const faqs = [
      ['What is '+p.name+'?', e.intro],
      [p.category === 'combos' ? 'What is included in this collection?' : 'What ingredients does it contain?', ingredients.length ? ingredients.join('; ')+'. This is sample recipe data; check the final pack.' : 'Refer to the final pack ingredient declaration.'],
      ['How can I prepare or serve it?', e.steps.map(step => step[1]).join(' ')],
      ['How should I store it after opening?', e.opened],
      ['Does it have any declared allergens?', allergens],
      ['What is the shelf life?', 'No verified batch date or shelf life is available in this demonstration. Use the best-before date and storage instructions printed on the final pack.']
    ];
    byId('prodFaqAccordion').innerHTML = faqs.map(([q,a]) => '<details><summary>'+escape(q)+'</summary><p>'+escape(a)+'</p></details>').join('');
    renderGallery(photos);
    bindQuantity(p, photos[0]);
    renderRelated(p,e);
  }

  function renderGallery(photos) {
    let current = 0;
    const thumbs = byId('galleryThumbnailsContainer');
    const main = byId('galleryMainImage');
    const dialog = byId('productImageZoom');
    thumbs.innerHTML = photos.map((photo,i) => '<button type="button" class="pdp-thumbnail" aria-pressed="'+(i===0)+'" aria-label="View '+escape(photo.role || 'photograph '+(i+1))+'"><img src="'+escape(photo.thumb || photo.src || photo.path)+'" alt="" width="140" height="140" loading="lazy"><span>'+escape(photo.role || 'View '+(i+1))+'</span></button>').join('');
    function select(index, focus) {
      current=index;
      setPhoto(main,photos[index],'(min-width: 1400px) 620px, (min-width: 992px) 48vw, 100vw');
      [...thumbs.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      if(focus) thumbs.children[index].focus();
    }
    [...thumbs.children].forEach((button,i)=>{
      button.addEventListener('click',()=>select(i));
      button.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const direction=document.documentElement.dir==='rtl'?-1:1;
        const delta=(event.key==='ArrowRight'?1:-1)*direction;
        select(event.key==='Home'?0:event.key==='End'?photos.length-1:(i+delta+photos.length)%photos.length,true);
      });
    });
    select(0);
    byId('galleryZoomButton').addEventListener('click',()=>{
      const photo=photos[current];
      byId('zoomProductImage').src=photo.master || photo.src || photo.path;
      byId('zoomProductImage').alt=photo.alt;
      text('zoomCaption',photo.alt);
      dialog.showModal();
      document.body.classList.add('pdp-zoom-open');
      byId('closeProductZoom').focus();
    });
    byId('closeProductZoom').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{document.body.classList.remove('pdp-zoom-open');byId('galleryZoomButton').focus();});
  }

  function bindQuantity(p,photo) {
    const input=byId('detailQtyInput'), minus=byId('detailQtyMinus'), plus=byId('detailQtyPlus'), add=byId('detailAddToCartBtn');
    const max=Math.min(99,Number.isFinite(p.stockCount)?p.stockCount:99);
    input.max=Math.max(1,max);
    add.disabled=!p.inStock || max<1;
    function sync() {minus.disabled=Number(input.value)<=1;plus.disabled=Number(input.value)>=max;}
    minus.addEventListener('click',()=>{input.value=Math.max(1,Math.floor(Number(input.value)||1)-1);sync();});
    plus.addEventListener('click',()=>{input.value=Math.min(max,Math.floor(Number(input.value)||0)+1);sync();});
    input.addEventListener('input',sync);
    add.addEventListener('click',()=>{
      if(!input.reportValidity() || add.disabled) return;
      const quantity=Number(input.value);
      if(!Number.isInteger(quantity)||quantity<1||quantity>max) return;
      if(typeof AuraCart!=='undefined') {
        AuraCart.addItem({...p,image:photo.src||photo.path},quantity);
        text('productCartFeedback',quantity+' '+(quantity===1?'pack':'packs')+' added to your basket.');
      }
    });
    sync();
  }

  function renderRelated(p,e) {
    const related=(e.related||[]).map(id=>PRODUCTS_DATA.find(item=>item.id===id)).filter(item=>item&&item.id!==p.id).slice(0,4);
    byId('relatedProductsGrid').innerHTML=related.map(item=>{
      const photo=typeof PRODUCT_DETAIL_IMAGES!=='undefined' && PRODUCT_DETAIL_IMAGES[item.id]?.[0];
      return '<article class="product-card pdp-related-card" data-product-id="'+escape(item.id)+'"><a class="pdp-related-photo" href="product-details.html?id='+escape(item.id)+'"><img src="'+escape(photo?.src||item.image)+'" '+(photo?.srcset?'srcset="'+escape(photo.srcset)+'" sizes="(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"':'')+' alt="'+escape(photo?.alt||item.name)+'" width="480" height="480" loading="lazy"><span class="badge-pill badge-organic">'+escape(item.categoryLabel)+'</span></a><div class="product-body"><h3><a href="product-details.html?id='+escape(item.id)+'">'+escape(item.name)+'</a></h3><p>'+escape(item.weight)+'</p><div class="pdp-related-actions"><span class="current-price">'+formatPrice(item.price)+'</span><button type="button" class="btn btn-primary btn-sm" data-add-to-cart="'+escape(item.id)+'" aria-label="Add '+escape(item.name)+' to basket" '+(!item.inStock?'disabled':'')+'><i class="bi bi-bag-plus" aria-hidden="true"></i> Add</button></div><a class="pdp-text-link" href="product-details.html?id='+escape(item.id)+'">View details <i class="bi bi-arrow-right" aria-hidden="true"></i></a></div></article>';
    }).join('');
  }
  document.addEventListener('DOMContentLoaded',init);
})();
