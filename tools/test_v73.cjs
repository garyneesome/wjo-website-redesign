// V73 browser checks. Run after build: npm install --no-save jsdom@30.1.2 && node tools/test_v73.cjs
const {JSDOM,VirtualConsole}=require('jsdom');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync(process.argv[2]||'dist/index.html','utf8');
const errors=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>{if(!/navigation|Not implemented: window/.test(e.message))errors.push(e.message)});
const dom=new JSDOM(html,{url:'https://test.example/',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.HTMLElement.prototype.focus=function(){};
  w.matchMedia=()=>({matches:false,addListener(){},addEventListener(){}});
  w.fetch=()=>{throw new Error('Unexpected fetch')};
  w.alert=()=>{};
  w.IntersectionObserver=class{observe(){}disconnect(){}};
  w.ResizeObserver=class{observe(){}disconnect(){}};
  w.URL.createObjectURL=()=> 'blob:test';
  w.URL.revokeObjectURL=()=>{};
}});
const w=dom.window,d=w.document;
const go=h=>{w.location.hash='#'+h;w.eval('render()')};
const main=()=>d.querySelector('main')?.textContent||'';
const check=(name,fn)=>{fn();console.log('PASS '+name)};
setTimeout(()=>{
  try{
    check('V73 home uses real guided interaction and no decorative poster',()=>{
      go('home');
      assert(main().includes('Your Jado family'));
      assert(main().includes('YOUR FIRST THREE STEPS'));
      assert(d.querySelector('.v73-path-guide'));
      assert(!d.querySelector('.v71-path-poster'));
      assert(d.querySelector('a[href="#new-to-jado"]'));
      assert(d.title.includes('V73'));
    });
    check('Bottom navigation includes always-available Menu',()=>{
      const bar=d.querySelector('.v73-mobile-bar');
      assert(bar);
      assert.equal(bar.querySelectorAll('a').length,3);
      assert.equal(bar.querySelectorAll('button').length,1);
      assert.equal(bar.querySelector('button').getAttribute('onclick'),'openMenu()');
      assert(d.querySelector('#mobileMenu a[href="#new-to-jado"]'));
    });
    check('New-to-Jado route and parent guidance are internal',()=>{
      go('new-to-jado');
      assert(main().includes('Common first-lesson questions'));
      assert(d.querySelector('a[href="#parents-information"]'));
      assert(d.querySelector('a[href="#visit-guide"]'));
      assert(!main().includes('Lorem ipsum'));
    });
    check('Why Jado route preserves honest belt and animal information',()=>{
      go('why-jado');
      assert(main().includes('Super J'));
      assert(main().includes('Grading is optional'));
      assert(d.querySelector('a[href="#grade-order"]'));
    });
    check('Optional interests and day fields are attached to journey',()=>{
      go('start');
      w.jWho('child');
      go('start?step=2');
      const form=d.querySelector('main form');
      assert(form.elements.goal);
      assert(form.elements.preferredDay);
      form.elements.ages.value='8';
      form.elements.town.value='Brackley';
      form.elements.goal.value='confidence';
      form.elements.preferredDay.value='Wednesday';
      w.j73Fit({preventDefault(){},target:form});
      go('start?step=3');
      assert(main().includes('Confidence and self-belief'));
      assert(main().includes('Preferred day: Wednesday'));
      assert(main().includes('Brackley Leisure Centre'));
    });
    check('Retain published school, venue photo and real session details',()=>{
      go('school?id=brackley-leisure');
      assert(main().includes('Brackley Leisure Centre'));
      assert(main().includes('Entrance & meeting point'));
      assert(d.querySelector('.j72-venue-hero img'));
    });
    assert.deepEqual(errors,[]);
    console.log('V73 browser checks passed.');
  }catch(e){console.error(e.stack||e);console.error(errors);process.exitCode=1}
  dom.window.close();
},300);
