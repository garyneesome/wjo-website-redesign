/* V73: clearer family journey, honest first-visit guidance, and one mobile navigation. 
   V72 remains the source of schools, venue photographs, timetables, grade details and CMS. */
const J73={goal:'',preferredDay:''};
const J73_GOALS=[
  ['','What interests you most? (optional)'],
  ['confidence','Confidence and self-belief'],
  ['fitness','Fitness and movement'],
  ['self-defence','Practical martial arts skills'],
  ['friends','Friendship and belonging'],
  ['discipline','Focus, respect and discipline'],
  ['exploring','Just exploring']
];
const J73_DAYS=['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
function j73Options(items,selected){
  return items.map(function(row){
    var value=Array.isArray(row)?row[0]:row;
    var label=Array.isArray(row)?row[1]:(row||'Any day');
    return '<option value="'+jEsc(value)+'"'+(value===selected?' selected':'')+'>'+jEsc(label)+'</option>';
  }).join('');
}
function j73Fit(event){
  var form=event.target;
  J73.goal=form.elements.goal.value;
  J73.preferredDay=form.elements.preferredDay.value;
  jFit(event);
}
window.j73Fit=j73Fit;
// Existing age matching remains authoritative; goals are a discussion starter, not a promise.
const j73OldStart=routes.start;
routes.start=function(){
  var html=j73OldStart();
  if(J72.step===2){
    var fields='<div class="j73-preferences"><label for="j73-goal">What would you most like to gain?</label>'+
      '<select id="j73-goal" name="goal">'+j73Options(J73_GOALS,J73.goal)+'</select>'+
      '<label for="j73-day">Is there a day that suits you?</label>'+
      '<select id="j73-day" name="preferredDay">'+j73Options(J73_DAYS,J73.preferredDay)+'</select>'+
      '<p class="j72-small">These preferences help you prepare questions for the instructor. Age and published sessions determine the initial matches; a preferred day does not hide other options.</p></div>';
    html=html.replace('onsubmit="jFit(event)"','onsubmit="j73Fit(event)"');
    html=html.replace('<div class="j72-actions"><button class="j72-btn" type="submit">',fields+'<div class="j72-actions"><button class="j72-btn" type="submit">');
  }
  if(J72.step>=3&&(J73.goal||J73.preferredDay)){
    var goal=J73_GOALS.find(function(item){return item[0]===J73.goal});
    var pref='<aside class="j73-search-context"><strong>What matters to you</strong><p>'+
      (goal&&goal[0]?jEsc(goal[1]):'Finding a suitable class')+
      (J73.preferredDay?' · Preferred day: '+jEsc(J73.preferredDay):'')+
      '</p><p>Ask the instructor how their class supports your goal and which session works best.</p></aside>';
    html=html.replace('<div class="j72-result-head">',pref+'<div class="j72-result-head">');
  }
  return html;
};
routes['your-journey']=routes.start;
// Transform the non-interactive poster into actual steps and meaningful decisions.
v70JourneyContent=function(key){
  var p=V70_PATHS[key];
  var title=key==='child'?'Helping your child get started':key==='family'?'Getting your family started':'Starting something for you';
  var steps=[
    ['01','Choose a starting point',key==='child'?'Explore Super J’s and Confident Kidz.':'We’ll suggest a programme from age and interests.','#programmes'],
    ['02','Find a school','Compare local venues, ages and published session times.','#find-school'],
    ['03','Feel ready for day one','Know what to bring and what to ask your instructor.','#new-to-jado']
  ];
  return '<div class="v70-path-copy v73-path-copy"><span class="v70-label">A welcoming place to start</span>'+
    '<h3>'+title+'</h3><p>'+p.text+'</p><p class="v73-step-intro">No pressure and no guesswork. Here’s the route from curious to your first conversation.</p>'+
    '<button class="j72-btn" type="button" onclick="jWho(\''+key+'\')">Guide me through the steps →</button>'+
    '<p class="v70-note">'+p.note+'</p></div>'+
    '<aside class="v73-path-guide" aria-label="Three steps to your first class">'+
    '<div class="v73-guide-kicker"><span>START HERE</span><span>YOUR FIRST THREE STEPS</span></div>'+
    '<ol>'+steps.map(function(s){return '<li><span class="v73-step-num">'+s[0]+'</span><div><h4>'+s[1]+'</h4><p>'+s[2]+'</p><a href="'+s[3]+'">Explore this step <span aria-hidden="true">↗</span></a></div></li>'}).join('')+'</ol>'+
    '<div class="v73-guide-bottom">You can ask questions before committing to a class.</div></aside>';
};
const j73OldHome=routes.home;
routes.home=function(){
  var html=j73OldHome();
  // Primary call to action brings visitors into the real age-and-school wizard.
  html=html.replace('href="#find-school">Find your local class','href="#start">New to Jado? Start here');
  html=html.replace('href="#start">Help me choose','href="#find-school">Find a class');
  // Add a dedicated, practical entry rather than another marketing graphic.
  var newBlock='<section class="v73-welcome"><div class="wrap v73-welcome-grid">'+
    '<div><span class="v70-label">NEW HERE?</span><h2>Your first Jado class starts before you arrive.</h2>'+
    '<p>Explore the programmes, choose a local venue and find out what happens on your first visit. Parents, children and adult beginners can take their time.</p>'+
    '<div class="v73-welcome-actions"><a class="j72-btn" href="#new-to-jado">New to Jado? Read this first →</a><a class="j72-btn secondary" href="#start">Help me choose a class →</a></div></div>'+
    '<div class="v73-reassurance"><h3>Good to know</h3><ul><li>Beginners are welcome to enquire.</li><li>You can ask about watching or observing before attending.</li>'+
    '<li>Ask your instructor about suitable clothing, fees and trial arrangements.</li><li>Share questions about accessibility or extra support privately with your instructor.</li></ul></div></div></section>';
  html=html.replace('<section class="v70-section v70-first"',newBlock+'<section class="v70-section v70-first"');
  var why='<section class="v73-why"><div class="wrap"><div class="v73-why-heading"><span class="v70-label">BEYOND THE FIRST CLASS</span>'+
    '<h2>Training that grows with you.</h2><p>Jado is about learning skills and building confidence, with support from your local instructor and a clear route to explore.</p></div>'+
    '<div class="v73-benefits"><article><span>01</span><h3>Find your confidence</h3><p>Start with age-appropriate activities, learn step by step and ask questions as you go.</p></article>'+
    '<article><span>02</span><h3>Be part of a community</h3><p>Explore classes, meet instructors and take part in WJO events if they suit you.</p></article>'+
    '<article><span>03</span><h3>Keep progressing</h3><p>Learn about belts, animal awards for younger students and the choice to pursue gradings.</p></article></div>'+
    '<a class="v73-text-link" href="#why-jado">Explore what makes Jado different →</a></div></section>';
  html=html.replace('<section class="v70-section v70-next"',why+'<section class="v70-section v70-next"');
  return html;
};
// No invented testimonials, invented instructor promises, or fabricated grading milestones.
routes['new-to-jado']=function(){
 return jPage('New to Jado? Start here.','A simple guide to choosing a class, asking questions and feeling prepared.',
  '<div class="j73-journey-intro"><h2>Three small steps. Your pace.</h2><p>It is fine to be curious, nervous, or unsure which group fits. Your instructor can help you decide.</p>'+
  '<div class="v73-mini-path"><a href="#start"><span>01</span><strong>Choose who is training</strong><small>Tell us an age and what matters most →</small></a>'+
  '<a href="#find-school"><span>02</span><strong>Find a local school</strong><small>View session information and venue photos →</small></a>'+
  '<a href="#visit-guide"><span>03</span><strong>Plan your first visit</strong><small>Clothing, arrival, questions and reassurance →</small></a></div></div>'+
  '<div class="j72-grid"><section class="j72-panel"><h2>For parents and carers</h2><p>Ask about the suitable age group, who will be teaching, child collection arrangements, and whether parents can watch. A class timetable is not a guaranteed booking.</p>'+
  jBtn('parents-information','Questions parents can ask')+'</section><section class="j72-panel"><h2>For adult beginners</h2><p>You do not need to know a martial art to ask about starting. Tell the instructor what you hope to gain, and ask what beginners can expect in the first session.</p>'+
  jBtn('adults','Teens & adults')+'</section></div>'+
  '<section class="j72-panel j72-section"><h2>Common first-lesson questions</h2><div class="j72-faq">'+
  '<details><summary>Do I need a gi for my first class?</summary><p>Ask your instructor what to wear. Do not buy equipment until you know the arrangements at your school. Jado uses its own black gi.</p></details>'+
  '<details><summary>Can I watch before trying?</summary><p>Ask your local school whether a visit or observation can be arranged and about any safeguarding rules.</p></details>'+
  '<details><summary>What if I need extra support?</summary><p>Tell the instructor in advance so you can discuss your needs and what is practical for that session.</p></details>'+
  '<details><summary>Is my place booked when I fill in the demo enquiry?</summary><p>No. The demo shows how the enquiry journey would work, but sends no bookings or emails.</p></details></div></section>'+
  '<div class="j72-actions">'+jBtn('start','Help me choose a class')+jBtn('find-school','Browse local schools',true)+jBtn('visit-guide','First-visit checklist',true)+'</div>'
 );
};
routes['why-jado']=function(){
 return jPage('Why Jado Kuin Do?','More than a class listing: explore the people, programmes and your own progression.',
 '<div class="j72-grid j72-grid-3"><article class="j72-panel"><h2>For little learners</h2><p>Super J’s introduces the five animal awards; Confident Kidz offers a next stage as children grow. Ask your instructor about the right class.</p>'+jBtn('jado-animals','Explore the animals')+'</article>'+
 '<article class="j72-panel"><h2>For teenagers and adults</h2><p>Explore programmes that help you learn movement and technique in a supportive local setting.</p>'+jBtn('adults','Teens & adults')+'</article>'+
 '<article class="j72-panel"><h2>For your next challenge</h2><p>Belts and gradings offer milestones. Grading is optional and the pathway depends on programme and instructor guidance.</p>'+jBtn('grade-order','What belts mean')+'</article></div>'+
 '<section class="j72-section"><h2>Get a feel for the community.</h2><p>See real Brackley training photographs and WJO community videos instead of made-up testimonials.</p>'+jBtn('stories','Life at Jado')+jBtn('instructors','Meet instructors',true)+'</section>'+
 '<section class="j72-panel"><h2>Starting in the first few months</h2><p>Every learner progresses differently. Early sessions may involve learning the class routine, practising core movements and asking for feedback. There is no guaranteed three-month belt timetable.</p>'+
 '<p>Whether you continue for confidence, fitness, friendship or progression, your local instructor can help shape the next step.</p>'+jBtn('new-to-jado','Plan your first class')+'</section>'
 );
};
const j73PrevFooter=footer;
footer=function(){
 var html=j73PrevFooter();
 var nav='<nav class="j72-mobile-bar v73-mobile-bar" aria-label="Mobile shortcuts">'+
   '<a href="#start"><span aria-hidden="true">✦</span><strong>Start</strong></a>'+
   '<a href="#find-school"><span aria-hidden="true">⌕</span><strong>Classes</strong></a>'+
   '<a href="#my-jado"><span aria-hidden="true">◇</span><strong>My Jado</strong></a>'+
   '<button type="button" onclick="openMenu()" aria-label="Open full site menu"><span aria-hidden="true">☰</span><strong>Menu</strong></button></nav>';
 return html.replace(/<nav class="j72-mobile-bar"[^>]*>[\s\S]*?<\/nav>/,nav).replace('World Jado Organisation · V72','World Jado Organisation · V73');
};
const j73PrevMenu=mobileMenu;
mobileMenu=function(){
 return j73PrevMenu().replace('<nav class="mobile-nav">','<nav class="mobile-nav"><a href="#new-to-jado" onclick="closeMenu()">New to Jado? Start here <span>→</span></a><a href="#why-jado" onclick="closeMenu()">Why Jado? <span>→</span></a>');
};
const j73OldHeader=header;
header=function(){
 return j73OldHeader().replace('[','['); // Keep the approved logo and desktop navigation.
};
const j73PrevRender=render;
render=function(){
 j73PrevRender();
 document.title=document.title.replace('Jado Kuin Do V72','Jado Kuin Do V73');
 // Mark the relevant quick shortcut but never hide the main menu.
 var current=jKey();
 document.querySelectorAll('.v73-mobile-bar a').forEach(function(a){
   if(a.getAttribute('href')==='#'+current)a.setAttribute('aria-current','page');
   else a.removeAttribute('aria-current');
 });
};
Object.assign(window,{j73Fit});
