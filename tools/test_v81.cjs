// V79 browser regression checks for supplied logo, family welcome and original WJO coverage.
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
 test('V81 hero is family-led with one main guided class action',()=>{
  go('home');
  assert(d.querySelector('main.v81-home'));
  assert(main().includes('A place to belong.'));
  assert(main().includes('A path to grow.'));
  assert.equal(d.querySelectorAll('main .v81-primary').length,1);
  assert.equal(d.querySelector('main .v81-primary').getAttribute('href'),'#start');
  assert(d.querySelector('main .v81-simple-link[href="#school-directory"]'));
  assert(!d.querySelector('main .v71-ribbon'));
  assert(!d.querySelector('main .v70-journey'));
  assert(!d.querySelector('main .v73-welcome'));
  assert(d.title.includes('V81'));
 });
 test('Four cropped original Jado photos are bundled and used only once on home',()=>{
  const photos=w.WJO_V81_FAMILY_PHOTOS;
  for(const key of ['group','pupils','awards','certificates']){
    assert(photos[key].startsWith('data:image/webp;base64,'),key);
    assert(photos[key].length>3000,key);
  }
  go('home');
  const sources=[...d.querySelectorAll('main img')].map(x=>x.getAttribute('src'));
  for(const key of Object.keys(photos)){
    assert.equal(sources.filter(s=>s===photos[key]).length,1,key+' was reused');
  }
  assert.equal(d.querySelectorAll('main .v81-family-pictures figure').length,2);
 });
 test('Three programmes are large, distinct and linked to existing real routes',()=>{
  go('home');
  const cards=[...d.querySelectorAll('.v81-programme')];
  assert.equal(cards.length,3);
  assert.deepEqual(cards.map(x=>x.getAttribute('href')),['#super-js','#confident-kidz','#adults']);
  assert(cards.some(x=>x.textContent.includes('3–6')));
  assert(cards.some(x=>x.textContent.includes('6–12')));
  assert(cards.some(x=>x.textContent.includes('13+')));
  assert(main().includes('grading is optional'));
  assert(!d.querySelector('main a[href="#train"]'));
 });
 test('The home has only one family welcome, one programme section and one first-visit guide',()=>{
  go('home');
  for(const cls of ['.v81-hero','.v81-family','.v81-progress','.v81-first','.v81-support']){
    assert.equal(d.querySelectorAll('main '+cls).length,1,cls);
  }
  assert.equal(d.querySelectorAll('main .v81-steps').length,0);
 });
 test('Instructor directory shows each biography once with non-repeating expanded details',()=>{
  go('instructors');
  const cards=[...d.querySelectorAll('main .v81-instructor')];
  assert(cards.length>2,'Instructor cards missing');
  for(const card of cards){
   assert(card.querySelector('img'));
   assert(card.querySelector('h3'));
   const lead=card.querySelector('.v81-instructor-role ~ p')?.textContent.trim()||'';
   const full=card.querySelector('details p')?.textContent.trim()||'';
   if(full&&lead.length>20)assert(!full.startsWith(lead.slice(0,Math.min(20,lead.length))),'Duplicated biography '+card.querySelector('h3').textContent);
  }
 });
 test('School instructor section still renders a named instructor without duplicated paragraph',()=>{
   go('school?id=brackley-leisure');
   assert(main().includes('Sifu Mark Bruce'));
   assert(d.querySelector('.v81-instructor')||d.querySelector('.j74-instructor-card'));
 });
 test('The original guided class chooser and seven-county menu still work',()=>{
  go('start');assert(main().includes('Who'));
  w.openMenu();
  const menu=d.querySelector('#mobileMenu');assert(menu.classList.contains('open'));
  for(const county of ['Buckinghamshire','Hertfordshire','Highlands','Leicestershire','Northamptonshire','Oxfordshire','Warwickshire'])
   assert(menu.textContent.includes(county),county);
  w.closeMenu();
  go('school?id=stoke-albany');
  assert(main().includes('18:00–19:00'));
  assert(main().includes('19:00–20:00'));
 });
 test('WJO programme and member info remain accessible',()=>{
  for(const key of ['super-js','confident-kidz','adults','grade-order','safeguarding','my-jado','shop']){
   go(key);
   assert(d.querySelector('main'),key+' missing');
  }
 });
 assert.deepEqual(errors,[]);
 console.log('All V81 checks passed');
}catch(e){console.error(e.stack||e);console.error(errors);process.exitCode=1}
finally{dom.window.close()}
},420);
