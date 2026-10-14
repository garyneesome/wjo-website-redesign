/* V74: retain V73 guided journey, restore verified WJO context and genuine navigation. */
const J74_COUNTIES=['Buckinghamshire','Hertfordshire','Highlands','Leicestershire','Northamptonshire','Oxfordshire','Warwickshire'];
// Included in the portable build from the supplied World WJO Jado brand artwork.
const j74WorldLogo=()=>window.WJO_V74_LOGO||resolveAssetPath('assets/wjo-crest.png');
function j74County(s){
 const v=String(s.region||s.county||'').toLowerCase().replace(/[^a-z]/g,'');
 return J74_COUNTIES.find(c=>v.includes(c.toLowerCase()))||'Other locations';
}
function j74LocalImage(path){
 const fallback=j74WorldLogo();
 if(!path || /mascot-/i.test(path))return fallback;
 return resolveAssetPath(path);
}
function j74CountyLink(county){return '#county?name='+encodeURIComponent(county)}
function j74SchoolLink(s){return '#school?id='+encodeURIComponent(s.id)}
function j74Directory(county){
 let schools=jSchools();
 if(county)schools=schools.filter(s=>j74County(s)===county);
 schools=schools.sort((a,b)=>String(a.name).localeCompare(String(b.name)));
 return schools.length?schools.map(s=>'<a class="j74-venue-link" href="'+j74SchoolLink(s)+'"><strong>'+jEsc(s.name)+'</strong><small>'+jEsc(s.town||s.postcode||'')+'</small><span aria-hidden="true">→</span></a>').join(''):'<p>There are no published venues in this county at present.</p>';
}
routes['school-directory']=()=>jPage('Find your Jado school.','Browse schools by county or use our guided class finder.',
 '<div class="j74-directory-intro"><div><h2>Know where you want to train?</h2><p>Choose a county to see its venues. You can then view training days, programmes, directions and instructors.</p></div><div class="j72-actions">'+jBtn('start','Help me choose')+jBtn('find-school','Search all venues',true)+'</div></div>'+
 '<div class="j74-county-cards">'+J74_COUNTIES.map(c=>'<a class="j74-county-card" href="'+j74CountyLink(c)+'"><h2>'+c+'</h2><span>'+jSchools().filter(s=>j74County(s)===c).length+' school(s) <b aria-hidden="true">→</b></span></a>').join('')+'</div>');
routes.county=()=>{
 const county=hashParams().get('name');
 if(!J74_COUNTIES.includes(county))return routes['school-directory']();
 return jPage(county+' Jado schools.','Select a venue for class times, instructors and first-visit information.',
  '<div class="j74-region-count">'+jSchools().filter(s=>j74County(s)===county).length+' currently listed venue(s)</div>'+
  '<div class="j74-venue-directory">'+j74Directory(county)+'</div>'+
  '<div class="j72-actions">'+jBtn('school-directory','All counties',true)+jBtn('start','Help me choose a class')+'</div>',
  ['school-directory','All locations']);
};
// Preserve the V73 fixed four-item shortcut bar; the full menu now exposes every region and venue.
function j74FullMenu(){
 const group=J74_COUNTIES.map(c=>'<details class="j74-mobile-county"><summary>'+c+'<span>'+jSchools().filter(s=>j74County(s)===c).length+'</span></summary>'+
  '<div class="j74-county-links"><a href="'+j74CountyLink(c)+'" onclick="closeMenu()">View '+c+' schools →</a>'+
  jSchools().filter(s=>j74County(s)===c).sort((a,b)=>a.name.localeCompare(b.name))
  .map(s=>'<a href="'+j74SchoolLink(s)+'" onclick="closeMenu()">'+jEsc(s.name)+'</a>').join('')+'</div></details>').join('');
 const simple=[['home','Home'],['new-to-jado','New to Jado? Start here'],['start','Help me choose a class'],['jado','What is Jado Kuin Do?'],
 ['why-jado','Why choose Jado?'],['programmes','Training programmes'],['instructors','Instructors'],
 ['grade-order','Belt order & meanings'],['events','Events and gradings'],['news','News & stories'],['my-jado','My Jado'],
 ['resources','Student resources'],['shop','Shop'],['safeguarding','Safeguarding'],['contact','Contact'],
 ['admin','Committee administration']];
 const top=simple.slice(0,3).map(([id,t])=>'<a href="#'+id+'" onclick="closeMenu()">'+t+'<span>→</span></a>').join('');
 const rest=simple.slice(3).map(([id,t])=>'<a href="#'+id+'" onclick="closeMenu()">'+t+'<span>→</span></a>').join('');
 return '<div id="mobileMenu" class="mobile-overlay j74-full-menu" role="dialog" aria-modal="true" aria-label="Site navigation">'+
 '<div class="mobile-head">'+brand()+'<button type="button" class="close" onclick="closeMenu()" aria-label="Close menu">×</button></div>'+
 '<nav class="mobile-nav">'+top+'<details class="j74-menu-group" open><summary>Find a school <span aria-hidden="true">⌄</span></summary>'+
 '<div class="j74-menu-group-content"><a href="#find-school" onclick="closeMenu()">Search all schools →</a><a href="#school-directory" onclick="closeMenu()">Browse all counties →</a>'+
 group+'</div></details>'+rest+'</nav></div>';
}
mobileMenu=j74FullMenu;
// Give desktop visitors the same complete location structure without crowding the header.
const j74OldHeader=header;
header=function(){
 const html=j74OldHeader();
 return html.replace('</nav><div class="header-actions">','<div class="j74-desktop-locations"><button type="button" class="j74-locations-toggle" aria-expanded="false" onclick="j74ToggleLocations(this)">Locations ▾</button>'+
 '<div class="j74-locations-panel"><a href="#school-directory">Browse every location →</a>'+
 J74_COUNTIES.map(c=>'<a href="'+j74CountyLink(c)+'">'+c+'</a>').join('')+'</div></div></nav><div class="header-actions">');
};
function j74ToggleLocations(button){
 const active=button.getAttribute('aria-expanded')==='true';
 document.querySelectorAll('.j74-locations-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
 button.setAttribute('aria-expanded',String(!active));
}
window.j74ToggleLocations=j74ToggleLocations;
document.addEventListener('click',e=>{
 if(!e.target.closest('.j74-desktop-locations'))document.querySelectorAll('.j74-locations-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
});
// Restored content matches the official WJO Jado Kuin Do article rather than made-up marketing.
function j74AboutIntro(){
 return '<div class="j74-brand-head"><div class="j74-brand-mark"><img src="'+j74WorldLogo()+'" alt="World Jado Organisation logo" onerror="this.onerror=null;this.src=resolveAssetPath(\'assets/wjo-crest.png\')"></div>'+
 '<div><span class="j72-eyebrow">WORLD JADO ORGANISATION</span><h2>What is Jado Kuin Do?</h2>'+
 '<p>Jado Kuin Do is a progressive martial art created by Master Jake D. Ogden. Its teaching combines practical self-defence with the development of life skills, coordination, balance and self-discipline.</p></div></div>'+
 '<div class="j74-history-grid"><article><h3>Founded in 1998</h3><p>Jado Kuin Do began as a privately taught system in 1998. In 2004, Jake Ogden opened its first public school in Flore, Northamptonshire.</p></article>'+
 '<article><h3>A family style</h3><p>Jado is derived from Jake D. Ogden’s name, Kuin means “family style”, and Do means “the way” or “art”. The approach aims to support students at different ages and stages.</p></article>'+
 '<article><h3>More than technique</h3><p>Structured training explores awareness, confidence, discipline, efficient movement and mental focus alongside physical skills.</p></article></div>';
}
routes.jado=()=>jPage('What is Jado Kuin Do?','An introduction to the art, its origins and the values behind training.',
 '<section class="j74-origin">'+j74AboutIntro()+'</section>'+
 '<section class="j72-section j74-history"><h2>The journey from Flore</h2>'+
 '<p>Created by Master Jake D. Ogden in 1998 following many years studying martial arts, Jado Kuin Do was originally taught privately. In 2004 a conversation in Flore about confidence and self-protection led to public classes. From the first school in Northamptonshire, the system has expanded across the country.</p>'+
 '<p>The original WJO explanation places particular emphasis on natural sequential movements, coordination, balance, energy use, life skills and the link between physical training and mental focus.</p>'+
 '<div class="j72-actions">'+jBtn('new-to-jado','Start your Jado journey')+jBtn('grade-order','Explore the belt meanings',true)+jBtn('school-directory','Where to train',true)+'</div></section>'+
 '<section class="j74-why-photo"><img src="'+resolveAssetPath('assets/photos/brackley-partner-practice.webp')+'" alt="Students practising together at a real Jado Kuin Do class" loading="lazy"><div><h2>A place to learn together</h2><p>From Super J’s and Confident Kidz to teenage and adult classes, programmes support learning at different stages. Explore the programmes and ask your local instructor about a suitable session.</p>'+jBtn('programmes','See the training programmes')+'</div></section>'+
 '<p class="j72-small">History and terminology checked against the World Jado Kuin Do Organisation’s published “Jado Kuin Do” description.</p>');
routes['jado-kuin-do']=routes.jado;
const j74OldHome=routes.home;
routes.home=function(){
 let html=j74OldHome();
 const section='<section class="j74-home-about"><div class="wrap"><div class="j74-home-logo"><img src="'+j74WorldLogo()+'" alt="World Jado Organisation logo"></div>'+
 '<div><span class="v70-label">WHAT IS JADO KUIN DO?</span><h2>A martial art with family at its heart.</h2>'+
 '<p>Founded by Master Jake D. Ogden in 1998, Jado Kuin Do brings together practical self-defence, movement, discipline and personal development. Find out why the whole-family approach matters.</p>'+
 '<a class="j72-btn secondary" href="#jado">Discover Jado Kuin Do →</a></div></div></section>';
 return html.replace('<section class="v70-section v70-journey"',section+'<section class="v70-section v70-journey"');
};
// Instructor profiles always have a visual. Only known portraits are labelled as portraits.
function j74InstructorMedia(p){
 const photo=String(p.photo||'');
 const real=photo&&!/mascot/i.test(photo);
 const mark=String(p.name||'').toLowerCase().includes('mark bruce');
 if(real)return {src:j74LocalImage(photo),alt:'Portrait of '+p.name,note:'Instructor photograph'};
 if(mark)return {src:resolveAssetPath('assets/photos/brackley-adult-training.webp'),alt:'Jado Kuin Do class training in Brackley',note:'Brackley class photograph · instructor portrait not yet supplied'};
 return {src:j74WorldLogo(),alt:'World Jado Organisation logo',note:'WJO instructor'};
}
function j74TeacherCard(p){
 const img=j74InstructorMedia(p);
 return '<article class="j74-instructor-card"><figure><img src="'+img.src+'" alt="'+jEsc(img.alt)+'" loading="lazy" onerror="this.onerror=null;this.src=WJO_V74_LOGO||resolveAssetPath(\'assets/wjo-crest.png\')"><figcaption>'+img.note+'</figcaption></figure>'+
 '<div><h3>'+jEsc(p.name)+'</h3><p class="j74-instructor-role">'+jEsc(p.role||'Jado instructor')+'</p>'+
 '<p>'+jEsc(p.summary||'Ask the school about this instructor.')+'</p></div></article>';
}
const j74PrevSchool=routes.school;
routes.school=function(){
 const s=jSchool(hashParams().get('id'));
 if(!s)return j74PrevSchool();
 let html=j74PrevSchool();
 const ps=jTeachers(s);
 const cards=ps.length?'<div class="j74-teachers">'+ps.map(j74TeacherCard).join('')+'</div>'+
 '<p class="j72-small">Ask the school which instructor leads the session you choose.</p>':
 '<p>Ask your local club to confirm which instructor will welcome you.</p>';
 html=html.replace(/<section class="j72-section"><h2>Meet the people who teach\.<\/h2>[\s\S]*?<\/section>/,
 '<section class="j72-section j74-teacher-section"><h2>Meet the people who teach.</h2>'+cards+jBtn('instructors','Meet more WJO instructors',true)+'</section>');
 return html;
};
// Replace the wider instructor directory's animal placeholders with portraits or approved photographs.
const j74InstructorCard=instructorCard;
instructorCard=function(p){
 const img=j74InstructorMedia(p);
 return '<article class="j74-instructor-card"><figure><img src="'+img.src+'" alt="'+jEsc(img.alt)+'" loading="lazy" onerror="this.onerror=null;this.src=WJO_V74_LOGO||resolveAssetPath(\'assets/wjo-crest.png\')"><figcaption>'+img.note+'</figcaption></figure>'+
 '<div><p class="j72-eyebrow">'+jEsc(p.role||'Instructor')+'</p><h3>'+jEsc(p.name)+'</h3><p>'+jEsc(p.summary||'')+'</p>'+
 '<div class="j74-instructor-locations">'+(p.locations||[]).map(l=>'<a href="#find-school?q='+encodeURIComponent(l)+'">'+jEsc(l)+'</a>').join('')+'</div></div></article>';
};
// “Notice the little steps” was additional concept copy, not a page on the official WJO site.
routes.progress=()=>jPage('Benefits of Jado training.','Learning that can develop skills both on and off the training floor.',
 '<div class="j72-grid j72-grid-3">'+[
 ['Confidence & focus','Training encourages students to try new techniques, set goals and focus attention.'],
 ['Coordination & balance','Sequential movements develop control, balance and motor skills through practice.'],
 ['Self-defence & awareness','Practical skills sit alongside awareness, discipline and safe decision-making.'],
 ['Community & respect','Classes allow students to practise with others and learn mutual respect.']].map(([h,p])=>'<article class="j72-panel"><h2>'+h+'</h2><p>'+p+'</p></article>').join('')+'</div>'+
 '<p>These are themes described by WJO; individual experiences vary. Talk to your instructor about what you want to achieve.</p>'+
 '<div class="j72-actions">'+jBtn('jado','About Jado Kuin Do')+jBtn('grade-order','Your grading pathway',true)+'</div>');
const j74OldMembers=routes.members;
routes.members=function(){
 return j74OldMembers().replace('Beyond the belts','Benefits of training').replace('Reflect on confidence, coordination and learning.','How training develops movement, awareness and confidence.');
};
// Use reliable external video links in an offline HTML, not third-party iframes that show Error 153.
const j74VideoPath=id=>'https://www.youtube.com/watch?v='+encodeURIComponent(id);
function j74VideoCard(story){
 const id=story[0],title=story[1],sub=story[2];
 return '<article class="j74-video-card"><div class="j74-video-art"><img src="'+resolveAssetPath('assets/photos/brackley-partner-practice.webp')+'" alt="Students practising Jado Kuin Do" loading="lazy"><span aria-hidden="true">▶</span></div>'+
 '<div><span class="j72-eyebrow">WJO COMMUNITY</span><h2>'+jEsc(title)+'</h2><p>'+jEsc(sub)+'</p>'+
 '<a class="j72-btn" target="_blank" rel="noopener noreferrer" href="'+j74VideoPath(id)+'">Watch on YouTube ↗</a></div></article>';
}
routes.stories=()=>jPage('Life at Jado.','Real people and community experiences from WJO.',
 '<div class="j72-grid"><figure class="j72-panel"><img class="j72-story-photo" src="'+resolveAssetPath('assets/photos/brackley-partner-practice.webp')+'" alt="Jado students practising together at Brackley"><figcaption>Working together in a Jado class.</figcaption></figure>'+
 '<figure class="j72-panel"><img class="j72-story-photo" src="'+resolveAssetPath('assets/photos/brackley-belt-celebration.webp')+'" alt="Jado students celebrating their new belts"><figcaption>Celebrating progress at Brackley.</figcaption></figure></div>'+
 '<div class="j74-video-list">'+J72_STORIES.map(j74VideoCard).join('')+'</div>');
routes.story=()=>{
 const s=J72_STORIES.find(s=>s[0]===hashParams().get('id'));
 if(!s)return routes.stories();
 return jPage(s[1],s[2],j74VideoCard(s)+'<div class="j72-actions">'+jBtn('stories','All community stories',true)+'</div>',
  ['stories','Life at Jado']);
};
// A broken legacy photo must never disfigure the site; use bundled WJO artwork.
const j74OldClean=jCleanDom;
jCleanDom=function(){
 j74OldClean();
 const main=document.querySelector('#site main');
 if(!main)return;
 main.querySelectorAll('img').forEach(img=>{
   if(img.dataset.j74Handled)return;
   img.dataset.j74Handled='1';
   img.addEventListener('error',()=>{
     if(img.dataset.j74FallbackDone)return;
     img.dataset.j74FallbackDone='1';
     img.src=j74WorldLogo();
     img.style.objectFit='contain';
     img.style.background='#faf7ef';
     img.alt='World Jado Organisation';
   });
 });
};
// The supplied logo is for general page art and fallbacks; retain the established Jado crest in header.
const j74OldFooter=footer;
footer=function(){
 return j74OldFooter().replace('World Jado Organisation · V73','World Jado Organisation · V74')
 .replace('Interactive demonstration · Enquiries are not sent','Website preview · Enquiry forms and checkout are not connected')
 .replace('href="#find-school">Find a class','href="#school-directory">Browse locations');
};
// Keep the enquiry fields genuine while disclosing the limitation once at the form.
const j74PrevEnquire=routes.enquire;
routes.enquire=function(){
 return j74PrevEnquire()
 .replace('Your sample enquiry','Your enquiry')
 .replace('Use sample details for testing. A parent or guardian should enquire for a child. Please don’t enter medical or other sensitive information.',
          'A parent or guardian should enquire for a child. Please avoid including medical or other sensitive information.')
 .replace('Explore the demo.','')
 .replace('Enquiries stay in this tab. Nothing is sent and no class is booked.','')
 .replace('I understand this demonstrates an enquiry. Nothing will be sent or booked.','I understand that submitting this website preview will not contact the school.')
 .replace('Preview my enquiry →','Continue →');
};
const j74PrevNewTo=routes['new-to-jado'];
routes['new-to-jado']=()=>j74PrevNewTo().replace('Is my place booked when I fill in the demo enquiry?','Does sending an enquiry reserve a place?')
 .replace('No. The demo shows how the enquiry journey would work, but sends no bookings or emails.','An enquiry does not guarantee a place. An instructor must confirm availability. This website preview does not send messages.');
// Reinforce the internal paths: footer and public pages should not send visitors to the legacy WJO site.
const j74PrevRender=render;
render=function(){
 j74PrevRender();
 document.title=document.title.replace('V73','V74').replace('V72','V74');
};
Object.assign(window,{j74ToggleLocations});


// A painted/distorted legacy news image is replaced with an approved, real Brackley class photograph.
const j74PreviousNewsCard=cmsNewsCard;
cmsNewsCard=function(record){
 if(/social development and character building/i.test(String(record.title||''))){
   return j74PreviousNewsCard({...record,image:resolveAssetPath('assets/photos/brackley-partner-practice.webp')});
 }
 return j74PreviousNewsCard(record);
};
const j74PreviousNews=routes.news;
routes.news=function(){
 return j74PreviousNews().replace(/<div class="cms-public-note"><\/div>/,
 '<div class="j74-news-explainer"><h2>News from across Jado</h2><p>Updates and stories about WJO students, instructors and local communities. Check individual dates when planning events.</p></div>');
};
