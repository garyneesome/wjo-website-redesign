/* V75 — WJO family welcome, clear actions, original-site content coverage and one correct logo. */
/* The V74 school data, approved venue imagery and guided journey remain unchanged. */
const J75_BRAND_ALT='World Jado Organisation: WORLD WJO JADO globe emblem';
const j75OldBrand=brand;
// Brand is shared by header, full mobile menu and footer. Use the user-provided artwork everywhere.
brand=function(){
  return '<a class="brand-v38 j75-brand" href="#home" aria-label="World Jado Kuin Do Organisation home">'+
   '<img src="'+j74WorldLogo()+'" alt="'+J75_BRAND_ALT+'" width="96" height="96">'+
   '<span class="brand-v38-copy"><b>WORLD JADO KUIN DO</b><span>ORGANISATION</span></span></a>';
};
const j75OldHeader=header;
header=function(){return j75OldHeader().replace('href="#about">About Jado','href="#jado">What is Jado');};
const j75OldFooter=footer;
footer=function(){
 let html=j75OldFooter().replace(/World Jado Organisation · V74/g,'World Jado Organisation · V75');
 html=html.replace('Your first class. Your next challenge. Your Jado family.','Everyone starts somewhere. Every student belongs.');
 html=html.replace('<div><h4>Support</h4>','<div><h4>Support</h4>');
 // Add genuine WJO destinations without removing the working links and member actions.
 html=html.replace('<div><h4>Discover</h4>','<div><h4>Discover</h4><a href="#jado">What is Jado Kuin Do?</a><a href="#vision">WJO vision</a><a href="#faq">Frequently asked questions</a><a href="#community">Community stories</a><a href="#chi">Jado Tai Chi</a>');
 html=html.replace('<div><h4>Support</h4>','<div><h4>Support</h4><a href="#safe-practice">Safe practice</a><a href="#safeguarding-children">Safeguarding children</a><a href="#safeguarding-adults">Safeguarding adults</a>');
 html=html.replace('</div><div class="footer-bottom">','</div><div class="j75-footer-reassure"><strong>Every Jado journey starts with a welcome.</strong><span>Explore a class, meet the people and discover a place to belong.</span><a href="#start">Help me find my place <span aria-hidden="true">→</span></a></div><div class="footer-bottom">');
 return html;
};
const j75OldMobileMenu=mobileMenu;
mobileMenu=function(){
 let html=j75OldMobileMenu();
 return html.replace('<nav class="mobile-nav">',
   '<nav class="mobile-nav"><a href="#explore-wjo" onclick="closeMenu()">Explore everything at WJO <span>→</span></a>'+
   '<a href="#faq" onclick="closeMenu()">Questions before joining <span>→</span></a>'+
   '<a href="#community" onclick="closeMenu()">Our Jado community <span>→</span></a>'+
   '<a href="#vision" onclick="closeMenu()">WJO vision <span>→</span></a>'+
   '<a href="#chi" onclick="closeMenu()">Jado Tai Chi <span>→</span></a>');
};
// Content taken from WJO FAQ topics; concise, understandable, no guarantees.
const J75_FAQS=[
 ['How young can my child start?','Some WJO programmes welcome children from age three, depending on the child and local school. Super J’s is designed for younger learners. Ask your instructor which class suits your child.'],
 ['Do I have to be fit or flexible?','No. The WJO explains that fitness and flexibility can develop through training. Your instructor can help you choose an appropriate starting point.'],
 ['Can parents and children train together?','Adults and children normally learn in separate classes because teaching approaches are tailored to age. Some schools run back-to-back sessions to make family training easier.'],
 ['Do I have to take gradings?','No. WJO confirms that grading is optional. You can enjoy classes without taking belt examinations.'],
 ['Do I have to enter competitions?','No. WJO competitions are optional and are not a requirement for training.'],
 ['What happens at our first class?','Confirm the session with your school, ask what clothing and equipment you need, and tell the instructor if you have questions or support requirements. Each school can explain its first-visit arrangements.'],
 ['How is safety approached?','The WJO publishes specific policies for safe practice, children and adults. Ask your school how these apply to your class, including supervision, protective equipment and reporting concerns.']
];
function j75FAQCards(limit=J75_FAQS.length){
 return '<div class="j75-faq-list">'+J75_FAQS.slice(0,limit).map(([question,answer],i)=>
  '<details class="j75-faq-item"><summary>'+jEsc(question)+' <span aria-hidden="true">+</span></summary><p>'+jEsc(answer)+'</p></details>').join('')+'</div>';
}
routes.faq=()=>jPage('Questions about joining Jado.','Everything you might want to ask before you take the first step.',
 '<section class="j75-faq-page"><h2>There is no such thing as a silly question.</h2><p>Getting started should feel comfortable. We have gathered the most common questions from the WJO’s published guidance.</p>'+
 j75FAQCards()+'<div class="j72-actions">'+jBtn('start','Help me choose a class')+jBtn('parents-information','Information for parents',true)+jBtn('safe-practice','Safe practice',true)+'</div></section>');
routes['frequently-asked-questions']=routes.faq;
// Grounded in WJO's 2003 foundation and published organisation vision.
routes['wjo-vision']=routes.vision;
routes['committee']=routes.leadership;
routes['about-wjo']=routes.about;
routes['community']=()=>jPage('More than a class. A community.','Friendships, shared achievements and experiences beyond the training hall.',
 '<div class="j75-community-lead"><img src="'+resolveAssetPath('assets/photos/brackley-belt-celebration.webp')+'" alt="Real Jado students celebrating a belt achievement at Brackley" loading="lazy">'+
 '<div><span class="j72-eyebrow">BELONGING IS PART OF THE JOURNEY</span><h2>Celebrate together. Grow together.</h2>'+
 '<p>WJO’s community stories include local awareness days, charity events, school displays and families supporting one another. A Jado club can be a place to train and meet people across generations.</p>'+
 '<div class="j72-actions">'+jBtn('stories','Watch Jado family stories')+jBtn('events','Events & gradings',true)+'</div></div></div>'+
 '<div class="j75-community-stories">'+[
 ['Fun and Awareness Day','Daventry students and families joined a community event that raised awareness and supported improvements to the local centre.'],
 ['Corby Carnival','Students from several clubs took part in an event that brought the wider local Jado community together.'],
 ['Banbury Santa Run','Jado families joined a local charity run, bringing members together outside the training hall.'],
 ['Community Sports Award','WJO has documented recognition for its contribution to local sporting and community activities.']
 ].map(([h,p])=>'<article class="j72-panel"><h3>'+h+'</h3><p>'+p+'</p></article>').join('')+'</div>'+
 '<p class="j72-small">Community stories are adapted from published WJO reporting; they are not invented testimonials.</p>');
// Jado Tai Chi remains accessible but school availability must be confirmed.
routes.chi=()=>jPage('Jado Tai Chi.','Calm, flowing movement and a different way to discover Jado.',
 '<div class="j75-chi"><div class="j75-chi-symbol"><img src="'+j74WorldLogo()+'" alt="'+J75_BRAND_ALT+'"></div>'+
 '<div><h2>Relaxed movement. Balance and focus.</h2><p>WJO describes Jado Tai Chi Chuan as a mind-and-body exercise concept drawing on traditional Lee-style Tai Chi and modern health and fitness ideas. Movements are performed calmly and fluidly, with attention to posture, breathing and balance.</p>'+
 '<p>Availability has not been confirmed for every WJO school. Please contact your local instructor to ask whether sessions are offered and whether the programme suits you.</p>'+
 '<div class="j72-actions">'+jBtn('school-directory','Find a local school')+jBtn('contact','Ask WJO a question',true)+'</div></div></div>');
routes['jado-chi']=routes.chi;
// Single discovery hub accounts for the original site's public pages without external website jumps.
const J75_TOPICS=[
 ['Explore Jado',[['jado','What is Jado Kuin Do?'],['about','About WJO'],['vision','Our vision'],['leadership','Committee & leadership'],['instructors','The people who teach'],['faq','Frequently asked questions']]],
 ['Find a class',[['start','Get guided help'],['programmes','Training programmes'],['super-js','Super J’s'],['confident-kidz','Confident Kidz'],['adults','Teens & adults'],['chi','Jado Tai Chi'],['school-directory','Locations by county']]],
 ['Learn & take part',[['grade-order','Grade order & meanings'],['jado-animals','Five Animals'],['events','Events & gradings'],['community','Jado in the community'],['news','News & articles'],['stories','Student & family stories']]],
 ['Students & families',[['new-to-jado','Your first visit'],['parents-information','For parents'],['members','Student information'],['my-jado','My Jado'],['training-app','myTraining app'],['resources','Training resources'],['membership','Memberships & shop']]],
 ['Trust & support',[['safeguarding','Safeguarding guidance'],['safe-practice','Safe practice'],['safeguarding-children','Safeguarding children'],['safeguarding-adults','Safeguarding adults'],['privacy-notice','Privacy notice'],['cookie-policy','Cookie policy'],['contact','Contact WJO']]]
];
routes['explore-wjo']=()=>jPage('Explore World Jado.','Everything from the World Jado Organisation in one place, with no links back to the old website.',
 '<div class="j75-topics">'+J75_TOPICS.map(([title,items])=>
 '<section class="j75-topic-group"><h2>'+title+'</h2><div>'+items.map(([href,label])=>'<a href="#'+href+'">'+label+' <span aria-hidden="true">→</span></a>').join('')+'</div></section>').join('')+'</div>');
routes.memberships=routes.memberships||routes.members;
routes.membership=routes.memberships; // WJO membership entry stays inside the preview.
// Homepage: show an actual WJO community moment and practical welcome; do not invent personal testimonials.
const j75OldHome=routes.home;
routes.home=function(){
 let html=j75OldHome();
 const family='<section class="j75-welcome" aria-labelledby="j75-family-heading"><div class="wrap j75-welcome-layout">'+
 '<figure><img src="'+resolveAssetPath('assets/photos/brackley-partner-practice.webp')+'" alt="Jado students smiling and practising together at a real Brackley class" loading="lazy">'+
 '<figcaption>Real moments from training in Brackley.</figcaption></figure>'+
 '<div><span class="v70-label">YOU ARE WELCOME HERE</span><h2 id="j75-family-heading">Not just a class. A Jado family.</h2>'+
 '<p>Starting something new can feel daunting — for children, parents and adults alike. Your local instructor can help you understand the class, talk through questions and find a comfortable starting point.</p>'+
 '<div class="j75-care-points"><div><strong>Feel prepared</strong><span>See what to expect on your first visit.</span></div>'+
 '<div><strong>Find your people</strong><span>Meet the instructors and hear real Jado family stories.</span></div>'+
 '<div><strong>Know you can ask</strong><span>Learn about support, safeguarding and practical arrangements.</span></div></div>'+
 '<div class="j72-actions">'+jBtn('new-to-jado','Your first visit')+jBtn('faq','Questions families ask',true)+'</div></div></div></section>';
 html=html.replace('<section class="v70-section v70-life"',family+'<section class="v70-section v70-life"');
 const faq='<section class="j75-home-faq"><div class="wrap"><div class="v70-heading"><div><div class="v70-label">TAKE YOUR TIME</div>'+
 '<h2>Questions are always welcome.</h2></div><p>From first-time nerves to training alongside family, here are a few things you may want to know.</p></div>'+
 j75FAQCards(4)+'<a class="j75-all-faq" href="#faq">See all questions before joining <span aria-hidden="true">→</span></a></div></section>';
 html=html.replace('<section class="v70-section v70-next"',faq+'<section class="v70-section v70-next"');
 return html;
};
// Add a clear pathway from the local school page to safeguarding and the FAQ.
const j75OldSchool=routes.school;
routes.school=function(){
 let html=j75OldSchool();
 const next='<section class="j75-school-welcome j72-panel"><h2>First time at this school?</h2>'+
 '<p>You can ask the instructor about the welcome, arrival point, accessibility and whether a parent can watch. The school will confirm the arrangements for your chosen session.</p>'+
 '<div class="j72-actions">'+jBtn('visit-guide','Plan your first visit')+jBtn('faq','Frequently asked questions',true)+jBtn('safeguarding','Safeguarding information',true)+'</div></section>';
 return html.replace('<section class="j72-section j74-teacher-section"',next+'<section class="j72-section j74-teacher-section"');
};
// Reuse existing real safeguarding and legal pages; add an internal FAQ link in the family guide.
const j75OldNewTo=routes['new-to-jado'];
routes['new-to-jado']=function(){
 return j75OldNewTo().replace('<div class="j72-actions">'+jBtn('start','Help me choose a class'),
 '<div class="j75-family-guide"><p><strong>For a child:</strong> Please ask about the teaching group, collection arrangements and the WJO safeguarding policy before attending.</p>'+
 '<a href="#faq">See frequently asked questions <span aria-hidden="true">→</span></a></div><div class="j72-actions">'+jBtn('start','Help me choose a class'));
};


// Version label is set after the inherited router's render hook.
const j75PreviousRender=render;
render=function(){
 j75PreviousRender();
 document.title=document.title.replace(/V7[234]/g,'V75');
};
