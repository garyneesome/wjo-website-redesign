/* V77 — simpler family homepage, real product angles and square Five Animals cards.
   Supplier photographs are extracted only when the shop confirms they exist. */
function j77StripSection(html,name){
  // The selected home sections have no nested <section> children.
  return html.replace(new RegExp('<section\\b[^>]*class="[^"]*\\b'+name+'\\b[^"]*"[^>]*>[\\s\\S]*?<\\/section>','g'),'');
}
const j77HomeBefore=routes.home;
routes.home=function(){
  let html=j77HomeBefore();
  // One introduction, one guided chooser, one first-visit guide, one actual community moment,
  // one animals section, one stories section, one practical next step. No duplicate benefits cards.
  ['v73-welcome','v73-why','v70-life'].forEach(cls=>html=j77StripSection(html,cls));
  // The full set of FAQs already appears later on the homepage.
  html=html.replace(/<div class="v70-faq">[\s\S]*?<\/div>/,'');
  // Numbers do not help people choose a class.
  html=html.replace(/(<button\b[^>]*data-v70-path="[^"]+"[^>]*>)<span>0[1-3]<\/span>/g,'$1');
  html=html.replace(/(<ol class="v70-steps">[\s\S]*?<\/ol>)/,block=>
      block.replace(/(<li><span>)0[1-3]\s*\/\s*/g,'$1'));
  return html;
};
// The path content updates when users choose "Myself" or "Our family".
const j77OriginalJourneyContent=v70JourneyContent;
v70JourneyContent=function(key){
  return j77OriginalJourneyContent(key)
    .replace(/<span class="v73-step-num">0[1-3]<\/span>/g,'')
    .replace('YOUR FIRST THREE STEPS','YOUR NEXT STEPS')
    .replace('Explore this step ↗','Explore this step →');
};
function j77AltImages(p){
  const obj=window.WJO_V77_SHOP_VIEWS||{};
  const record=obj[p.id]||[];
  const views=[{label:'Official photograph',type:'official',src:p.image,desc:'Official product image from Jado Online'}];
  record.forEach((v,i)=>{
    if(v&&v.src&&v.src!==p.image){
      views.push({label:'Additional view '+(i+1),type:'supplier',src:v.src,desc:'Additional official Jado Online photograph'});
    }
  });
  return views;
}
j76GalleryViews=j77AltImages;
function j77ProductGallery(p){
  const views=j77AltImages(p);
  return '<div class="j77-product-gallery">'+
    '<div class="j77-primary-picture"><img id="j77-current-photo" src="'+views[0].src+'" data-alt="'+(p.alt||'')+'" alt="'+jEsc(p.name)+' official photograph" onerror="v3ImgError(this)">'+
    '<p id="j77-gallery-caption">Official product photograph</p></div>'+
    (views.length>1?
      '<div class="j77-gallery-picker" role="group" aria-label="Product photographs">'+
      views.map((v,i)=>'<button class="j77-gallery-thumb'+(i===0?' is-current':'')+'" type="button" data-photo="'+i+'" aria-pressed="'+(i===0)+'" onclick="j77ChooseProductPhoto(this,\''+p.id+'\')">'+
        '<img loading="lazy" src="'+v.src+'" alt="" onerror="this.style.visibility=\'hidden\'"><span>'+jEsc(v.label)+'</span></button>').join('')+'</div>'
      :'<p class="j77-one-view">The official shop currently provides one verified photograph for this item. Your instructor can help confirm fit and features.</p>')+
    (p.category==='Sparring'?'<p class="j77-equipment-note">For sparring equipment, confirm sizing and required protection with your instructor before ordering.</p>':'')+
  '</div>';
}
function j77ChooseProductPhoto(button,id){
  const product=getProduct(id),views=j77AltImages(product),idx=Number(button.dataset.photo);
  const view=views[idx],img=document.getElementById('j77-current-photo');
  if(!view||!img)return;
  img.src=view.src;
  img.alt=product.name+' — '+view.label;
  const caption=document.getElementById('j77-gallery-caption');
  if(caption)caption.textContent=view.type==='official'?'Official product photograph':view.desc;
  document.querySelectorAll('.j77-gallery-thumb').forEach(b=>{
    const sel=b===button;
    b.classList.toggle('is-current',sel);b.setAttribute('aria-pressed',String(sel));
  });
}
window.j77ChooseProductPhoto=j77ChooseProductPhoto;
const j77PriorProductPage=routes.product;
routes.product=function(){
  const p=getProduct(hashParams().get('id')||'gia');
  const html=j77PriorProductPage();
  return html.replace(/<div class="j76-product-gallery"[\s\S]*?<\/div>\s*(?=<div class="product-info">)/,
    j77ProductGallery(p));
};
// Avoid matching a nested gallery div by replacing between the product layout's two known siblings.
const j77FirstProduct=routes.product;
routes.product=function(){
 const p=getProduct(hashParams().get('id')||'gia');
 let html=j77PriorProductPage();
 const begin=html.indexOf('<div class="j76-product-gallery"');
 const end=html.indexOf('<div class="product-info">',begin);
 if(begin>=0&&end>begin){
   html=html.slice(0,begin)+j77ProductGallery(p)+'</div>'+html.slice(end);
 }
 return html;
};
// More legible category headings and less misleading shop illustration framing.
const j77PriorShop=routes.shop;
routes.shop=function(){
 let html=j77PriorShop()
  .replace(/<span class="shop-cat-index">[\s\S]*?<\/span>/g,'')
  .replace('Choose a category and jump straight to the matching products.','Choose what you are looking for. Tap a category to browse the products.');
 // Source-of-truth product photographs, not invented lifestyle images with cut-off faces
 // or incorrect logos and imaginary arrows.
 const pictures={
   Uniforms:'gia',Sparring:'sp1a',Clothing:'jkdha2020',Training:'fp',
   Membership:'lic2',Gifts:'gft'
 };
 html=html.replace(/(<img class="shop-cat-photo" src=")[^"]*(" alt=")([^"]+)(">)/g,
  function(all,begin,mid,category,end){
   const item=pictures[category];
   const src=item?getProduct(item).image:j74WorldLogo();
   return begin+src+mid+category+end;
  });
 return html;
};
// A secondary button previously appeared blank against a light background.
const j77PreviousRender=render;
render=function(){
 j77PreviousRender();
 document.title=document.title.replace(/V7[2-6]/g,'V77');
};
