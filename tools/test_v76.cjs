// V76 browser regression checks for supplied logo, family welcome and original WJO coverage.
const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync(process.argv[2]||'dist/index.html','utf8');
const errors=[],vc=new VirtualConsole();
vc.on('jsdomError',e=>{if(!/navigation|Not implemented: window/.test(e.message))errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://demo.example/',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLElement.prototype.focus=function(){};
 w.matchMedia=()=>({matches:false,addListener(){},addEventListener(){}});
 w.fetch=()=>{throw Error('Unexpected fetch')};w.alert=()=>{};
 w.IntersectionObserver=class{observe(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};
 w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
}});
const w=dom.window,d=w.document;
const go=h=>{w.location.hash='#'+h;w.eval('render()')};
const main=()=>d.querySelector('main')?.textContent||'';
const test=(name,fn)=>{fn();console.log('PASS',name)};
setTimeout(()=>{
try{
 test('Correct supplied WORLD WJO JADO logo in header, menu and footer',()=>{
  go('home');
  const src=w.WJO_V74_LOGO;
  assert(src.startsWith('data:image/png;base64,'));
  const header=d.querySelector('header .j75-brand img');
  const footer=d.querySelector('footer .j75-brand img');
  assert(header&&footer,'logo must be present twice');
  assert.equal(header.src,src);
  assert.equal(footer.src,src);
  assert(!header.src.includes('v65-logo'));
  assert(d.title.includes('V76'));
  w.openMenu();
  assert.equal(d.querySelector('#mobileMenu .j75-brand img').src,src);
  w.closeMenu();
 });
 test('Guided first-class journey from V73 and school data retained',()=>{
  go('home');assert(d.querySelector('.v73-path-guide'));assert(d.querySelector('.v71-ribbon'));
  go('start');w.jWho('child');go('start?step=2');
  let f=d.querySelector('main form');f.elements.ages.value='8';f.elements.town.value='Brackley';
  w.j73Fit({target:f,preventDefault(){}});
  go('start?step=3');assert(main().includes('Brackley Leisure Centre'));
 });
 test('Family welcome and FAQ controls visible on home',()=>{
  go('home');
  assert(d.querySelector('.j75-welcome'));
  assert(d.querySelector('.j75-home-faq details'));
  assert(main().includes('Not just a class. A Jado family.'));
  assert(d.querySelector('a[href="#faq"]'));
  assert(d.querySelector('a[href="#safeguarding"]')||d.querySelector('a[href="#safe-practice"]'));
 });
 test('WJO original FAQ accurately represents grading and competition optionality',()=>{
  go('faq');
  assert(main().includes('grading is optional'));
  assert(main().includes('competitions are optional'));
  assert(main().includes('back-to-back'));
  assert(d.querySelectorAll('main details').length>=7);
 });
 test('Original WJO site topics have internal routes',()=>{
  const required=['home','about','vision','jado','leadership','faq','grade-order','safe-practice','safeguarding-children',
   'safeguarding-adults','programmes','super-js','confident-kidz','adults','chi','school-directory',
   'community','news','events','contact','shop','members','training-app','privacy-notice','cookie-policy'];
  const routes=w.eval('Object.keys(routes)');
  for(const key of required)assert(routes.includes(key),'missing route '+key);
  go('explore-wjo');
  for(const key of required.filter(x=>x!=='home'&&x!=='programmes')){
   assert(d.querySelector('main a[href="#'+key+'"]'),'missing internal link '+key);
  }
 });
 test('County and full venue directory unchanged',()=>{
  go('school-directory');assert(main().includes('Northamptonshire'));
  go('county?name=Northamptonshire');assert(main().includes('Brackley Leisure Centre'));
  w.openMenu();assert(d.querySelector('#mobileMenu').textContent.includes('Warwickshire'));w.closeMenu();
 });
 test('Jado community draws on real WJO reporting, no invented testimonials',()=>{
  go('community');assert(main().includes('Corby Carnival'));
  assert(main().includes('Banbury Santa Run'));
  assert(d.querySelector('main img').src.includes('embedded/')||d.querySelector('main img').src.startsWith('data:image'));
 });
 test('Chi described accurately without promise of current classes',()=>{
  go('chi');assert(main().includes('Jado Tai Chi Chuan'));
  assert(main().includes('Availability has not been confirmed'));
 });
 test('Mobile quick bar still has a genuine full-menu control',()=>{
  go('home');
  const bar=d.querySelector('.v73-mobile-bar');assert(bar);
  assert(bar.querySelector('button[onclick="openMenu()"]'));
 });
 test('Original school, teacher and independent YouTube links still work',()=>{
  go('school?id=brackley-leisure');
  assert(main().includes('Sifu Mark Bruce'));
  assert(d.querySelector('.j74-instructor-card img'));
  go('story?id=k0PL3aq-eSo');
  assert(d.querySelector('a[href="https://www.youtube.com/watch?v=k0PL3aq-eSo"]'));
  assert(!d.querySelector('main iframe'));
 });
 
 test('Circular logo is used across header, footer and about section',()=>{
  go('home');const header=d.querySelector('header .j75-brand img'),footer=d.querySelector('footer .j75-brand img');
  assert(header.src.startsWith('data:image/png;base64,'));
  assert.equal(header.src,footer.src);
  assert(d.querySelector('.j74-home-logo img').src===header.src);
 });
 test('Grand Master title and no published research notes',()=>{
  go('home');assert(main().includes('Grand Master Jake D. Ogden'));
  go('jado');assert(main().includes('Grand Master Jake D. Ogden'));
  assert(!main().includes('History and terminology checked'));
 });
 test('All shop cards retain original photo and open a gallery',()=>{
  go('shop?category=All');
  assert.equal(d.querySelectorAll('.j76-shop-card').length,31);
  assert.equal(d.querySelectorAll('.j76-product-picture img').length,31);
  assert(d.querySelector('a[href="#product?id=sp1a"]'));
 });
 test('Product gallery shows original and authentic detail crops without inventing angles',()=>{
  go('product?id=sp1a');
  const mainImage=d.querySelector('.j76-gallery-main img');
  assert(mainImage&&mainImage.src===w.eval('getProduct("sp1a").image'));
  const controls=d.querySelectorAll('.j76-view-select');assert.equal(controls.length,3);
  assert.equal(controls[0].getAttribute('aria-pressed'),'true');
  w.j76SelectView(controls[1]);
  assert.equal(controls[1].getAttribute('aria-pressed'),'true');
  assert(d.querySelector('.j76-gallery-main').classList.contains('j76-view-close'));
  assert(main().includes('not fabricated views'));
  assert(!main().includes('AI generated product photograph'));
 });
 assert.deepEqual(errors,[]);
 console.log('All V76 checks passed');
}catch(e){console.error(e.stack||e);console.error(errors);process.exitCode=1}
finally{dom.window.close()}
},400);
