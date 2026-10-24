/* V86 — a coherent, photographic, family-first WJO homepage.
 * Replaces only routes.home. All other V85 routes, CMS, Committee Hub,
 * approved photographs, grading resources and member journeys remain intact.
 */
(function(){
'use strict';
const photo=(key,fallback)=>window.WJO_V81_FAMILY_PHOTOS?.[key]||resolveAssetPath(fallback);
const pictures={
  hero:photo('group','assets/photos/brackley-belt-celebration.webp'),
  young:photo('pupils','assets/photos/brackley-partner-practice.webp'),
  celebrating:photo('awards','assets/photos/brackley-belt-celebration.webp'),
  adult:resolveAssetPath('assets/photos/brackley-adult-training.webp'),
  milestones:photo('certificates','assets/photos/brackley-partner-practice.webp')
};
function programme(name,ages,heading,description,route,img,alt,num){
  return '<a class="w86-programme" href="#'+route+'" aria-label="Explore '+name+' training">'+
    '<div class="w86-programme-visual"><img src="'+img+'" alt="'+alt+'" loading="lazy">'+
    '<span class="w86-programme-number" aria-hidden="true">'+num+'</span></div>'+
    '<div class="w86-programme-copy"><div class="w86-programme-meta">'+ages+'</div>'+
    '<h3>'+name+'</h3><p>'+description+'</p>'+
    '<div class="w86-programme-bottom"><span>'+heading+'</span><span class="w86-arrow" aria-hidden="true">↗</span></div></div></a>';
}
const gradeColors=['#e6e1d7','#efc62b','#f18427','#cb343a','#228452','#3272bb','#7645a2','#7d5134','#242424'];
function step(num,title,description){
  return '<li class="w86-step"><span class="w86-step-number" aria-hidden="true">'+num+'</span>'+
    '<div><h3>'+title+'</h3><p>'+description+'</p></div></li>';
}
routes.home=function(){
 return shell('<main class="w86-home" id="main-content">'+

 // Hero: a powerful, simple message with one dominant next action.
 '<section class="w86-hero" aria-labelledby="w86-hero-title"><div class="wrap w86-hero-layout">'+
 '<div class="w86-hero-text">'+
 '<span class="w86-kicker w86-kicker-light"><span class="w86-kicker-line"></span> WORLD JADO KUIN DO ORGANISATION</span>'+
 '<h1 id="w86-hero-title">A stronger you.<br><em>A place to belong.</em></h1>'+
 '<p class="w86-hero-lead">Real people, real progress and a warm welcome. Discover Jado Kuin Do — martial arts for children, teenagers and adults, taught with encouragement at every step.</p>'+
 '<div class="w86-hero-actions">'+
 '<a class="w86-button w86-button-red" href="#start">Find your Jado class <span aria-hidden="true">→</span></a>'+
 '<a class="w86-link-on-dark" href="#first-visit">What happens at my first class? <span aria-hidden="true">↗</span></a>'+
 '</div>'+
 '<div class="w86-hero-notes" aria-label="Why people enjoy training"><span>Learn at your pace</span><span>Grow in confidence</span><span>Feel part of the family</span></div>'+
 '</div>'+
 '<figure class="w86-hero-photo"><img src="'+pictures.hero+'" alt="Real Jado Kuin Do students and instructor celebrating their achievements together" fetchpriority="high">'+
 '<figcaption><span class="w86-photo-dot" aria-hidden="true"></span> Real Jado people. Real moments.</figcaption>'+
 '</figure></div><div class="w86-hero-edge" aria-hidden="true"></div></section>'+

 // Three programmes: one purposeful choice per audience, no repeat class finder.
 '<section class="w86-paths" aria-labelledby="w86-paths-title"><div class="wrap">'+
 '<div class="w86-section-top"><div><span class="w86-kicker">FIND YOUR STARTING POINT</span>'+
 '<h2 id="w86-paths-title">There’s a place for <em>everyone.</em></h2></div>'+
 '<p>Whether it’s a child’s first class or a new challenge for you, there’s a welcoming way to get started.</p></div>'+
 '<div class="w86-programme-grid">'+
 programme('Super J’s','TYPICALLY 3–6 YEARS','Little steps. Big smiles.','Playful movement, the Five Animals and the joy of learning together.','super-js',pictures.young,'Young Jado students developing confidence together','01')+
 programme('Confident Kidz','TYPICALLY 6–12 YEARS','Confidence that grows.','Skills, respect and a sense of achievement in a supportive class.','confident-kidz',pictures.celebrating,'Young Jado students celebrating an award with their instructor','02')+
 programme('Teens & adults','TYPICALLY 13+ YEARS','Your challenge. Your pace.','Practical self-defence, movement and focus, with room to progress.','adults',pictures.adult,'Adult Jado students practising martial arts together','03')+
 '</div>'+
 '<p class="w86-paths-footnote">Not sure where to start? Your local instructor can help you choose the right class.</p>'+
 '</div></section>'+

 // Authentic community warmth with a single feature photo, not two staggered cards.
 '<section class="w86-family" aria-labelledby="w86-family-title"><div class="wrap w86-family-layout">'+
 '<div class="w86-family-picture"><figure><img src="'+pictures.milestones+'" alt="Genuine Jado certificates and belts marking students’ achievements" loading="lazy">'+
 '<figcaption><span>EVERY STEP COUNTS</span><strong>Big moments. Little victories.</strong></figcaption></figure>'+
 '<span class="w86-family-decoration" aria-hidden="true">JADO<br>FAMILY</span></div>'+
 '<div class="w86-family-story"><span class="w86-kicker">MORE THAN JUST MARTIAL ARTS</span>'+
 '<h2 id="w86-family-title">The people make <em>the difference.</em></h2>'+
 '<p>Progress feels different when you’re surrounded by people who want to see you succeed. Jado is about learning together, building trust and celebrating each other along the way.</p>'+
 '<div class="w86-family-values"><div><span class="w86-values-icon" aria-hidden="true">01</span><strong>Feel welcome</strong><p>Your instructor helps you feel comfortable from the first session.</p></div>'+
 '<div><span class="w86-values-icon" aria-hidden="true">02</span><strong>Feel supported</strong><p>Learn at a pace that suits you, with guidance along the way.</p></div>'+
 '<div><span class="w86-values-icon" aria-hidden="true">03</span><strong>Grow together</strong><p>Share achievements with your Jado friends and family.</p></div></div>'+
 '<a class="w86-text-link" href="#stories">See life in the Jado community <span aria-hidden="true">↗</span></a>'+
 '</div></div></section>'+

 // Progress as a recognisable, striking visual motif — not fabricated grade criteria.
 '<section class="w86-progression" aria-labelledby="w86-progression-title"><div class="wrap w86-progression-layout">'+
 '<div><span class="w86-kicker w86-kicker-light">PROGRESS IS PERSONAL</span>'+
 '<h2 id="w86-progression-title">Your journey.<br><em>One step at a time.</em></h2>'+
 '<p>From your very first movement to your next grading, Jado offers a structured path to keep learning. Grading is optional; every achievement matters.</p>'+
 '<a class="w86-text-link w86-text-link-light" href="#grade-order">Explore the belt journey <span aria-hidden="true">↗</span></a></div>'+
 '<div class="w86-belt-art" role="img" aria-label="An illustration of Jado belt progression from white through yellow, orange, red, green, blue, purple and brown to black">'+
 '<div class="w86-belt-line">'+gradeColors.map((color,i)=>'<span style="--w86-grade:'+color+'" aria-hidden="true"></span>').join('')+'</div>'+
 '<div class="w86-belt-legend"><span>YOUR FIRST STEPS</span><span>KEEP GROWING</span><span>YOUR NEXT CHALLENGE</span></div>'+
 '<p>Little by little, you build something lasting.</p></div>'+
 '</div></section>'+

 // Practical new-student onboarding, distinct from the programme selector.
 '<section class="w86-first" aria-labelledby="w86-first-title"><div class="wrap w86-first-layout">'+
 '<div class="w86-first-heading"><span class="w86-kicker">YOUR FIRST CLASS</span>'+
 '<h2 id="w86-first-title">Starting is easier <em>together.</em></h2>'+
 '<p>You don’t need to know the moves. You don’t need to arrive with confidence. You just need a place to begin.</p>'+
 '<a class="w86-button w86-button-outline" href="#first-visit">Plan your first visit <span aria-hidden="true">→</span></a></div>'+
 '<ol class="w86-steps">'+
 step('01','Find your class','Explore local schools and published session times.')+
 step('02','Say hello','Ask your instructor what to expect and what to wear.')+
 step('03','Give it a go','Meet the people, try a session and learn at your own pace.')+
 '</ol></div></section>'+

 // A quiet, trustworthy ending – no repeated primary class CTA.
 '<section class="w86-closing"><div class="wrap w86-closing-layout">'+
 '<div><span class="w86-kicker">A COMMUNITY YOU CAN TRUST</span><h2>Meet the people behind Jado.</h2>'+
 '<p>Learn about our instructors, safeguarding and the values that make Jado welcoming.</p></div>'+
 '<div class="w86-closing-links"><a href="#instructors">Our instructors <span aria-hidden="true">↗</span></a>'+
 '<a href="#student-code">The Student Code <span aria-hidden="true">↗</span></a>'+
 '<a href="#safeguarding">Safeguarding <span aria-hidden="true">↗</span></a></div>'+
 '</div></section>'+

 '</main>');
};
})();