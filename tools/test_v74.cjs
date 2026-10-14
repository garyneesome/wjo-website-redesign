/* V74 portable browser checks. Uses the same jsdom dependency as V73. */
const {JSDOM,VirtualConsole}=require('jsdom');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const file=process.argv[2]||'dist/index.html',html=fs.readFileSync(file,'utf8');
const errors=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>{if(!/navigation|Not implemented: window/.test(e.message))errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://demo.example/',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLElement.prototype.focus=function(){};
 w.matchMedia=()=>({matches:false,addListener(){},addEventListener(){}});
 w.fetch=()=>{throw new Error('Unexpected fetch')};w.alert=()=>{};
 w.IntersectionObserver=class{observe(){}disconnect(){}};
 w.ResizeObserver=class{observe(){}disconnect(){}};
 w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
}});
const w=dom.window,d=w.document;const go=h=>{w.location.hash='#'+h;w.eval('render()')};
const main=()=>d.querySelector('main')?.textContent||'';
const check=(name,fn)=>{fn();console.log('PASS '+name)};
setTimeout(()=>{
 try {
 check('homepage retains guided V73 path and adds verified Jado history',()=>{
   go('home');
   assert(main().includes('Your Jado family.'));
   assert(main().includes('1998'));
   assert(d.querySelector('.v73-path-guide'));
   assert(d.querySelector('a[href="#jado"]'));
   assert(d.title.includes('V74'));
 });
 check('user-provided WJO logo embedded as a valid PNG data URL',()=>{
   assert(w.WJO_V74_LOGO.startsWith('data:image/png;base64,'));
   assert(w.WJO_V74_LOGO.length>5000);
   assert(d.querySelector('.j74-home-logo img').src.startsWith('data:image/png;base64,'));
 });
 check('every original county and its live venues available inside full menu',()=>{
   w.openMenu();
   const m=d.getElementById('mobileMenu');
   assert(m.classList.contains('open'));
   for(const county of ['Buckinghamshire','Hertfordshire','Highlands','Leicestershire','Northamptonshire','Oxfordshire','Warwickshire'])
     assert(m.textContent.includes(county),county);
   assert(m.querySelector('a[href="#school?id=brackley-leisure"]'));
   w.closeMenu();
 });
 check('county directory and individual venue pages are linked',()=>{
   go('school-directory');assert(main().includes('Browse schools by county'));
   go('county?name=Northamptonshire');assert(main().includes('Brackley Leisure Centre'));
   assert(d.querySelector('a[href="#school?id=brackley-leisure"]'));
 });
 check('official Jado Kuin Do history and preserved training route',()=>{
   go('jado');assert(main().includes('Master Jake D. Ogden'));assert(main().includes('1998'));
   assert(main().includes('Flore'));assert(d.querySelector('a[href="#start"]'));
 });
 check('Brackley teacher card has genuine class photograph rather than mascot',()=>{
   go('school?id=brackley-leisure');
   assert(main().includes('Sifu Mark Bruce'));
   const teacher=d.querySelector('.j74-teacher-section .j74-instructor-card img');
   assert(teacher);
   assert(teacher.src.includes('embedded/')||teacher.src.startsWith('data:image'));
   assert(teacher.alt.includes('class')||teacher.alt.includes('training'));
   assert(!teacher.src.includes('mascot'));
 });
 check('instructor directory has an image for each listing',()=>{
   go('instructors');
   assert(d.querySelectorAll('.j74-instructor-card img').length>=3);
   assert(!main().includes('Profile artwork'));
 });
 check('stories use working external YouTube URLs without iframes',()=>{
   go('story?id=k0PL3aq-eSo');
   assert(d.querySelector('a[href="https://www.youtube.com/watch?v=k0PL3aq-eSo"]'));
   assert(!d.querySelector('main iframe'));
   assert(main().includes('Watch on YouTube'));
 });
 check('progress wording aligned to published WJO training benefits',()=>{
   go('progress');
   assert(main().includes('Benefits of Jado training'));
   assert(!main().includes('Notice the little steps'));
 });
 check('enquiry retains factual preview disclosure without repeated sample copy',()=>{
   go('enquire?school=brackley-leisure&session=0');
   assert(main().includes('Your enquiry'));
   assert(!main().includes('Use sample details for testing'));
   assert(main().includes('will not contact the school'));
 });
 assert.deepEqual(errors,[]);
 console.log('PASS all V74 functional checks');
 }catch(e){console.error(e.stack||e);console.error(errors);process.exitCode=1}
 finally{dom.window.close();}
},350);
