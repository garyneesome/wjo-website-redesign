/* V76: keep the original WORLD/WJO/JADO emblem intact, improve product authenticity and browsing. */
/* Only corner background pixels are removed during the build. No AI-revised logo artwork. */
const j76OldHome=routes.home;
const j76OldJado=routes.jado;
const j76OldAbout=routes.about;
const j76OldFounder=routes.founder;
function j76PublicCopy(html){
 return html.replace(/(?<!Grand )Master (Jake D\.\s*|Jake\s*)?Ogden/g,'Grand Master $1Ogden')
  .replace(/<p class="j72-small">History and terminology checked against[\s\S]*?<\/p>/gi,'')
  .replace(/<p class="j72-small">This is a concise account of the published WJO story, presented within this website\.<\/p>/gi,'')
  .replace(/<p class="j72-small">Community stories are adapted from published WJO reporting; they are not invented testimonials\.<\/p>/gi,'');
}
routes.home=()=>j76PublicCopy(j76OldHome());
routes.jado=()=>j76PublicCopy(j76OldJado());
routes['jado-kuin-do']=routes.jado;
routes.about=()=>j76PublicCopy(j76OldAbout());
routes.founder=()=>j76PublicCopy(j76OldFounder());
const j76OldArticle=routes.article;
routes.article=()=>j76PublicCopy(j76OldArticle());
const j76OldCommunity=routes.community;
routes.community=()=>j76PublicCopy(j76OldCommunity());
// Correct remaining public text nodes safely; do not touch scripts, JSON, input values or editorial data.
const j76OldRender=render;
render=function(){
 j76OldRender();
 const root=document.querySelector('#site main');
 if(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
   if(node.parentElement?.closest('script,style,textarea'))continue;
   node.nodeValue=node.nodeValue.replace(/(?<!Grand )Master (Jake D\.\s*|Jake\s*)?Ogden/g,'Grand Master $1Ogden');
  }
  root.querySelectorAll('p,small,aside').forEach(el=>{
   if(el.children.length===0&&/^(History and terminology checked against|This is a concise account of the published WJO story)/i.test(el.textContent.trim()))el.remove();
  });
 }
 document.title=document.title.replace(/V7[2345]/g,'V76');
};
/* Real Jado Online product photography stays the source of truth. Zooms are labelled as
   crop/detail views, NOT imaginary second or third camera angles. */
function j76GalleryViews(p){
 const main=p.image||p.alt;
 return [
  {label:'Official photograph',kind:'original',src:main,description:'Official Jado Online photograph'},
  {label:'Closer look',kind:'close',src:main,description:'Close-up of the official photograph'},
  {label:'Logo & detail',kind:'detail',src:main,description:'Detail crop of the official photograph'}
 ];
}
function j76ProductGallery(p){
 const views=j76GalleryViews(p);
 return '<div class="j76-product-gallery" aria-label="'+jEsc(p.name)+' product images">'+
  '<div class="j76-gallery-main j76-view-original" id="j76-gallery-main">'+
   '<img src="'+views[0].src+'" data-alt="'+(p.alt||'')+'" onerror="v3ImgError(this)" alt="'+jEsc(p.name)+' original product photo">'+
   '<span id="j76-gallery-label" class="j76-photo-caption">Official product photograph</span>'+
  '</div>'+
  '<div class="j76-gallery-views" role="group" aria-label="Choose a product image view">'+
  views.map((v,i)=>'<button type="button" class="j76-view-select '+(i===0?'is-selected':'')+'" aria-pressed="'+(i===0?'true':'false')+'" data-kind="'+v.kind+'" onclick="j76SelectView(this)">'+
   '<span class="j76-view-thumb j76-view-'+v.kind+'"><img src="'+v.src+'" data-alt="'+(p.alt||'')+'" alt="" loading="lazy" onerror="v3ImgError(this)"></span>'+
   '<span>'+v.label+'</span></button>').join('')+'</div>'+
  '<p class="j76-gallery-note">The close-ups use the original product photo, not fabricated views. Other genuine angles will be added when supplied or verified.</p>'+
 '</div>';
}
function j76SelectView(button){
 const main=document.getElementById('j76-gallery-main');
 if(!main)return;
 const kind=button.dataset.kind;
 main.className='j76-gallery-main j76-view-'+kind;
 const label=main.querySelector('.j76-photo-caption');
 if(label)label.textContent=kind==='original'?'Official product photograph':kind==='close'?'Original photo · enlarged detail':'Original photo · detail crop';
 document.querySelectorAll('.j76-view-select').forEach(b=>{
  const selected=b===button;
  b.classList.toggle('is-selected',selected);
  b.setAttribute('aria-pressed',String(selected));
 });
}
window.j76SelectView=j76SelectView;
// Product data and prices come from the existing official catalogue; the card only improves layout.
const j76OriginalProductCard=v3ProductCard;
v3ProductCard=function(p){
 const isSingleOption=(p.sizes||['Standard']).length===1;
 const tags=[p.category,p.category==='Uniforms'?'Training uniform':p.category==='Sparring'?'Protective equipment':'WJO merchandise'];
 return '<article class="real-product-card j76-shop-card">'+
  '<a class="j76-product-picture" href="#product?id='+encodeURIComponent(p.id)+'" aria-label="View '+jEsc(p.name)+' photographs and options">'+
    '<div class="real-product-image">'+v3ProductImage(p)+'</div><span class="j76-card-photo-note">Original product photograph</span></a>'+
  '<div class="real-product-copy"><span class="tag">'+jEsc(tags[0])+'</span>'+
   '<h3>'+jEsc(p.name)+'</h3><p>'+jEsc(p.desc)+'</p>'+
   '<div class="j76-card-price">'+money(p.price)+'</div>'+
   '<div class="j76-card-actions"><a class="btn j76-details-btn" href="#product?id='+encodeURIComponent(p.id)+'">View photos & sizes →</a>'+
   (isSingleOption?'<button class="btn red" type="button" onclick="addToCart(\''+p.id+'\',1,\''+(p.sizes||['Standard'])[0]+'\')">Add to basket</button>':'')+
   '</div></div></article>';
};
// Change the existing product page image pane into a proper thumbnail gallery; preserve original option and cart controls.
const j76OriginalProduct=routes.product;
routes.product=function(){
 const p=getProduct(hashParams().get('id')||'gia');
 const page=j76OriginalProduct();
 return page.replace(/<div class="product-real-image">[\s\S]*?<\/div><div class="product-source">[\s\S]*?<\/div>/,
  j76ProductGallery(p));
};
// Improve shop shopping journey with prominent filters and a concise beginner-help panel.
const j76OriginalShop=routes.shop;
routes.shop=function(){
 let html=j76OriginalShop();
 const intro='<section class="j76-shop-guide"><div class="wrap j76-shop-guide-inner">'+
 '<div><span class="kicker">CHOOSE WITH CONFIDENCE</span><h2>Not sure what equipment you need?</h2>'+
 '<p>Different clubs and age groups may have different requirements. Your instructor can help confirm the correct uniform, protection and size before you order.</p></div>'+
 '<div class="j72-actions"><a class="j72-btn" href="#school-directory">Ask your local school →</a>'+
 '<a class="j72-btn secondary" href="#faq">New student questions →</a></div></div></section>';
 html=html.replace('<section id="shop-products"',intro+'<section id="shop-products"');
 return html;
};
// Accessory descriptions or product labels must not claim generated images are genuine.
