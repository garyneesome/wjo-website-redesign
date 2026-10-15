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
  assert(d.title.includes('V79'));
  w.openMenu();
  assert.equal(d.querySelector('#mobileMenu .j75-brand img').src,src);
  w.closeMenu();
 });
 test('Guided first-class journey from V73 and school data retained',()=>{
  go('home');assert(d.querySelector('.v70-journey'));assert(d.querySelector('.v71-ribbon'));
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

 test('No repeated homepage panels, numbered chooser or duplicated training images',()=>{
  go('home');
  assert.equal(d.querySelectorAll('.v70-journey').length,1);
  assert.equal(d.querySelectorAll('.v73-welcome').length,0);
  assert.equal(d.querySelectorAll('.v73-why').length,0);
  assert.equal(d.querySelectorAll('.v70-life').length,0);
  assert.equal(d.querySelectorAll('.j75-welcome').length,1);
  assert.equal(d.querySelectorAll('.v70-animals').length,1);
  assert.equal(d.querySelectorAll('.v70-stories').length,1);
  assert.equal(d.querySelectorAll('.v70-choices button>span').length,0);
 });
 test('Animal tiles retain their five correct animals and labels',()=>{
  go('home');
  const animals=d.querySelectorAll('.v70-animal-grid a');
  assert.equal(animals.length,5);
  assert.deepEqual([...animals].map(a=>a.textContent.trim().replace('↗','').trim()),['Snake','Tiger','Crane','Panther','Dragon']);
  assert(d.querySelector('a[href="#jado-animals"]'));
  assert(d.querySelector('.v70-animals .v70-button.secondary').textContent.includes('Explore the animal awards'));
 });
 test('Shop uses product photos without cropped pseudo-alternate images',()=>{
  go('shop?category=All');
  assert.equal(d.querySelectorAll('.j77-shop-card').length,0);
  assert.equal(d.querySelectorAll('.j76-shop-card').length,31);
  assert.equal(d.querySelectorAll('.shop-cat-index').length,0);
  assert.equal(d.querySelectorAll('.shop-cat-photo').length,8);
  assert.equal(d.querySelector('.shop-cat-photo[alt="Uniforms"]').getAttribute('src'),w.eval('getProduct("gia").image'));
  assert.equal(d.querySelector('.shop-cat-photo[alt="Sparring"]').getAttribute('src'),w.eval('getProduct("sp1a").image'));
  assert.equal(d.querySelector('.shop-cat-photo[alt="Clothing"]').getAttribute('src'),w.eval('getProduct("jkdha2020").image'));
 });
 test('Authentic gallery has official source and optional supplier alt views only',()=>{
  go('product?id=sp1a');
  const photo=d.querySelector('#j77-current-photo');
  assert(photo&&photo.getAttribute('src')===w.eval('getProduct("sp1a").image'));
  assert.equal(d.querySelectorAll('.j76-view-select').length,0);
  assert.equal(d.querySelectorAll('.j76-view-close').length,0);
  const buttons=[...d.querySelectorAll('.j77-gallery-thumb')];
  const data=w.WJO_V77_SHOP_VIEWS||{};
  const expected=1+(data.sp1a||[]).length;
  assert.equal(buttons.length,expected===1?0:expected);
  if(buttons.length>1){
   w.j77ChooseProductPhoto(buttons[1],'sp1a');
   assert.equal(buttons[1].getAttribute('aria-pressed'),'true');
   assert(d.querySelector('#j77-current-photo').getAttribute('src').startsWith('data:image/'));
  }else assert(d.querySelector('.j77-one-view'));
  assert(!main().includes('Close-up of the official photograph'));
  assert(!main().includes('Logo & detail'));
 });

 test('Original WJO timetable imports all published sessions across seven regions',()=>{
   const source=w.WJO_V78_TIMETABLES;
   assert.equal(Object.keys(source.sources).length,7);
   assert.equal(Object.keys(source.venues).length,31);
   assert.equal(Object.values(source.venues).reduce((n,s)=>n+s.sessions.length,0),80);
   const schools=w.eval("jSchools()");
   assert.equal(schools.length,31);
   for(const [id,rec] of Object.entries(source.venues)){
      const s=schools.find(s=>s.id===id);assert(s,'School missing: '+id);
      assert.equal(s.sessions.length,rec.sessions.length,id+' schedule mismatch');
      if(id!=='online-chi')assert.equal(s.timetableSourceRegion,rec.region);
      for(const row of s.sessions){
        assert.equal(row.length,5,'missing end time for '+id);
        assert(/^\d\d:\d\d$/.test(row[1])&&/^\d\d:\d\d$/.test(row[4]),'bad clock time '+id);
        assert(row[4]>row[1],'invalid time window '+id);
      }
   }
 });
 test('Market Harborough area sessions visible at Stoke Albany with clear venue caveat',()=>{
   const stoke=w.eval("jSchool('stoke-albany')");
   const bowden=w.eval("jSchool('great-bowden')");
   assert.equal(stoke.sessions.length,2);
   assert.deepEqual(stoke.sessions,bowden.sessions);
   assert.equal(stoke.timetableScope,'area');
   go('school?id=stoke-albany');
   assert(main().includes('18:00–19:00'));
   assert(main().includes('19:00–20:00'));
   assert(main().includes('which hall hosts'));
   assert(main().includes('not a confirmed timetable for this hall'));
 });
 test('Harpenden and Southam previously absent timetables restored',()=>{
   const har=w.eval("jSchool('harpenden')"),southam=w.eval("jSchool('southam')");
   assert.equal(har.sessions.length,3);
   assert.equal(har.sessions[0][1],'17:00');
   assert.equal(har.sessions[2][4],'21:00');
   assert.equal(southam.sessions.length,2);
   go('school?id=southam');
   assert(main().includes('17:00–17:45'));
   assert(main().includes('18:00–18:50'));
 });
 test('Incorrect Danes Camp and Paddox starts corrected',()=>{
   const danes=w.eval("jSchool('danes-camp')"),paddox=w.eval("jSchool('paddox')");
   assert.equal(JSON.stringify(danes.sessions.map(r=>r.slice(1,2))),JSON.stringify([['09:00'],['10:00']]));
   assert.equal(paddox.sessions[0][1],'15:20');
   assert.equal(paddox.sessions[0][4],'16:20');
 });
 test('County timetable contains every WJO session without double-counting Market Harborough',()=>{
   go('county?name=Leicestershire');
   assert.equal(d.querySelectorAll('.j78-county-rows>a').length,2);
   assert(main().includes('Market Harborough (venue to confirm)'));
   go('county?name=Northamptonshire');
   assert(d.querySelectorAll('.j78-county-rows>a').length>=40);
   go('county?name=Warwickshire');
   assert(d.querySelectorAll('.j78-county-rows>a').length,6);
 });
 test('Guided finder now includes Market Harborough class and complete window',()=>{
   go('start');w.jWho('child');go('start?step=2');
   const f=d.querySelector('main form');f.elements.ages.value='8';f.elements.town.value='Market Harborough';
   w.j73Fit({target:f,preventDefault(){}});
   go('start?step=3');
   assert(main().includes('Stoke Albany Village Hall'));
   assert(main().includes('18:00–19:00'));
 });
 test('Online Chi times are clearly identified as online, not a venue',()=>{
   go('school?id=online-chi');
   assert(main().includes('19:15–20:15'));
   assert(main().includes('online WJO session'));
 });

 test('Short mobile menu has one Explore link, no repeated top-level options',()=>{
   go('home');w.openMenu();
   const m=d.querySelector('#mobileMenu');
   assert(m&&m.classList.contains('open'));
   assert(m.classList.contains('j79-menu'));
   const top=[...m.querySelectorAll('.j79-menu-nav > a')].map(a=>a.textContent.trim());
   assert.equal(top.filter(x=>x.startsWith('Home')).length,1);
   assert.equal(top.filter(x=>x.includes('Shop')).length,1);
   assert.equal(m.querySelectorAll('a[href="#explore-wjo"]').length,1);
   assert.equal(m.querySelectorAll('a[href="#committee"]').length,1);
   const counties=m.querySelectorAll('.j79-county');
   assert.equal(counties.length,7);
   const guide=m.querySelector('.j79-county-items a[href="#school?id=brackley-leisure"]');
   assert(guide,'Full location directory still in the menu');
   w.closeMenu();
 });
 test('Duplicate green next-steps school-finder panel removed; wizard remains',()=>{
   go('home');
   assert.equal(d.querySelectorAll('.v73-path-guide').length,0);
   assert.equal(d.querySelectorAll('.v70-journey').length,1);
   assert(d.querySelector('[data-v70-path="family"]'));
   assert(d.querySelector('a[href="#start"]'));
 });
 test('Committee information is accessible from the full site and Explore index',()=>{
   go('committee');assert(main().includes('Grand Master Jake Ogden'));
   assert(main().includes('Nicola Ogden'));
   go('explore-wjo');
   assert(d.querySelector('main a[href="#committee"]'));
   assert(!d.querySelector('main a[href="#leadership"]'));
 });
 test('Missing instructor portraits use Jado animal cards instead of WJO logo',()=>{
   const name='Sifu Mark Desborough';
   const pic=w.j74InstructorMedia({name,photo:''});
   assert(pic.src.includes('mascot-'),pic.src.slice(0,100));
   assert(pic.alt.includes('animal'));
   go('instructors');
   const card=[...d.querySelectorAll('.j74-instructor-card')].find(c=>c.textContent.includes(name));
   assert(card,'Mark Desborough card exists');
   assert(card.querySelector('img').getAttribute('src').includes('mascot-'));
   const founder=[...d.querySelectorAll('.j74-instructor-card')].find(c=>c.textContent.includes('Grand Master Jake Ogden'));
   assert(founder&&founder.querySelector('img'));
 });
 test('Original WJO story previews show all three original named testimonials',()=>{
   go('home');
   const cards=d.querySelectorAll('.j79-video-story');
   assert.equal(cards.length,3);
   assert(d.querySelector('a[href="https://www.youtube.com/watch?v=k0PL3aq-eSo"] img'));
   assert(d.querySelector('a[href="https://www.youtube.com/watch?v=RlAgOido-MY"] img'));
   assert(d.querySelector('a[href="https://www.youtube.com/watch?v=1w0wcMe-fRI"] img'));
   for(const card of cards)assert(card.querySelector('.j79-video-poster img').getAttribute('src').length>5);
   go('stories');
   assert.equal(d.querySelectorAll('.j79-video-story').length,3);
 });
 test('Shop retains official product photos and adds labelled AI wearing illustration',()=>{
   go('shop');
   assert.equal(d.querySelectorAll('.j76-shop-card').length,31);
   assert(w.WJO_V79_AI_IMAGE?.startsWith('data:image/webp;base64,'));
   assert(d.querySelector('.j79-ai-uniform-panel img'),'illustration panel absent');
   assert(main().includes('Illustration only'));
   go('product?id=gia');
   const mainPhoto=d.querySelector('#j77-current-photo');
   assert(mainPhoto);
   assert.equal(mainPhoto.getAttribute('src'),w.eval('getProduct("gia").image'));
   const aiThumb=[...d.querySelectorAll('.j77-gallery-thumb')].find(e=>e.textContent.includes('AI wearing example'));
   assert(aiThumb);
   assert(main().includes('AI wearing example'));
   const alt=w.j77AltImages(w.eval('getProduct("gia")'));
   assert(alt.some(v=>v.type==='ai'));
 });
 assert.deepEqual(errors,[]);
 console.log('All V79 checks passed');
}catch(e){console.error(e.stack||e);console.error(errors);process.exitCode=1}
finally{dom.window.close()}
},400);
