/* V81 — one carefully structured family-first home, with no repeated class-finder sections.
   WJO values: warmth, practical support, real community photos and optional progression. */
function j81Photo(which,fallback){
  return window.WJO_V81_FAMILY_PHOTOS?.[which]||resolveAssetPath(fallback);
}
function j81Programme(name,ages,line,desc,link,src,alt){
 return '<a class="v81-programme" href="#'+link+'"><div class="v81-programme-photo"><img src="'+src+'" alt="'+alt+'" loading="lazy"></div>'+
 '<div class="v81-programme-text"><span class="v81-age">'+ages+'</span><h3>'+name+'</h3><strong>'+line+'</strong><p>'+desc+'</p>'+
 '<span class="v81-programme-link">Explore this programme <span aria-hidden="true">→</span></span></div></a>';
}
routes.home=function(){
 const group=j81Photo('group','assets/photos/brackley-belt-celebration.webp');
 const pupils=j81Photo('pupils','assets/photos/brackley-partner-practice.webp');
 const awards=j81Photo('awards','assets/photos/brackley-adult-training.webp');
 const older=resolveAssetPath('assets/photos/brackley-adult-training.webp');
 const kids=resolveAssetPath('assets/photos/brackley-belt-celebration.webp');
 return shell('<main class="v81-home">'+
 '<section class="v81-hero"><div class="wrap v81-hero-grid"><div class="v81-hero-copy">'+
 '<div class="v81-eyebrow">World Jado Kuin Do Organisation · Everyone belongs</div>'+
 '<h1>A place to belong.<br><em>A path to grow.</em></h1>'+
 '<p>From a child’s very first class to an adult’s next challenge, Jado Kuin Do brings people together through encouragement, shared achievements and progressive learning.</p>'+
 '<p class="v81-hero-support"><strong>New to martial arts?</strong> You can ask questions, meet the instructor and choose a class suited to your stage.</p>'+
 '<a class="v81-primary" href="#start">Find my Jado class <span aria-hidden="true">→</span></a>'+
 '<a class="v81-simple-link" href="#school-directory">Already know your school? Browse locations <span aria-hidden="true">→</span></a>'+
 '</div><figure class="v81-hero-figure"><img src="'+group+'" alt="Real Jado students celebrating with their instructor" fetchpriority="high">'+
 '<figcaption>Real students. Shared achievements. A welcoming community.</figcaption></figure></div></section>'+
 '<section class="v81-family" aria-labelledby="v81-family-title"><div class="wrap v81-family-grid">'+
 '<div class="v81-family-pictures"><figure><img src="'+pupils+'" alt="Young Jado students proudly showing certificates" loading="lazy"><figcaption>Every achievement matters.</figcaption></figure>'+
 '<figure><img src="'+awards+'" alt="Jado instructor celebrating a young student’s achievement" loading="lazy"><figcaption>Encouragement along the way.</figcaption></figure></div>'+
 '<div class="v81-family-copy"><div class="v81-eyebrow">More than a martial arts club</div>'+
 '<h2 id="v81-family-title">You’re part of the Jado family.</h2>'+
 '<p>Beginning something new can feel daunting. Your local Jado instructor can help you understand the class, talk through practical questions and find a starting point that feels right.</p>'+
 '<div class="v81-care"><div><strong>Feel welcome</strong><span>Get to know the people who teach and what to expect.</span></div>'+
 '<div><strong>Feel supported</strong><span>Age-appropriate learning, clear guidance and safeguarding information.</span></div>'+
 '<div><strong>Grow together</strong><span>Learn alongside others and celebrate personal progress.</span></div></div>'+
 '<a class="v81-text-link" href="#community">Explore the Jado community <span aria-hidden="true">→</span></a>'+
 '</div></div></section>'+
 '<section class="v81-progress" aria-labelledby="v81-progress-title"><div class="wrap">'+
 '<div class="v81-heading"><div class="v81-eyebrow">A progressive approach</div>'+
 '<h2 id="v81-progress-title">A place for every stage.</h2>'+
 '<p>Jado offers age-appropriate programmes and a clear route to keep learning. You don’t have to rush towards a belt: grading is optional, and everyone progresses differently.</p></div>'+
 '<div class="v81-programmes">'+
 j81Programme('Super J’s','Typically 3–6 years','Little steps. Big smiles.','The Five Animals introduce movement and confidence through age-appropriate activities.','super-js',pupils,'Young Jado students celebrating their awards')+
 j81Programme('Confident Kidz','Typically 6–12 years','Growing skills. Growing confidence.','Practise techniques, respect and positive habits in a supportive group.','confident-kidz',kids,'Young Jado students celebrating new belts')+
 j81Programme('Teens & adults','Typically 13+ years','Your challenge. Your pace.','Develop movement, practical self-defence skills and focus with others.','adults',older,'Adult Jado martial arts students during practice')+
 '</div><div class="v81-progression-note"><strong>Progression is personal, not a race.</strong><a href="#grade-order">Discover belts and gradings <span aria-hidden="true">→</span></a></div>'+
 '</div></section>'+
 '<section class="v81-first" aria-labelledby="v81-first-title"><div class="wrap v81-first-grid">'+
 '<div><div class="v81-eyebrow">A welcoming first step</div><h2 id="v81-first-title">Your first visit, made easier.</h2>'+
 '<p>Not sure what to wear, where to go or whether a parent can watch? Ask your instructor — you do not need all the answers before you start.</p>'+
 '<a class="v81-text-link" href="#new-to-jado">What to expect at your first class <span aria-hidden="true">→</span></a></div>'+
 '<div class="v81-start-steps"><div><strong>Choose a suitable school</strong><span>Review published times and the right age group.</span></div>'+
 '<div><strong>Talk things through</strong><span>Ask about trial arrangements, clothing and support needs.</span></div>'+
 '<div><strong>Enjoy your first session</strong><span>Meet your instructor, try something new and learn at your pace.</span></div></div></div></section>'+
 '<section class="v81-support"><div class="wrap"><div class="v81-eyebrow">People you can get to know</div>'+
 '<h2>Friendly faces. Real experience.</h2><p>Find out who teaches, how your local school works and the support available before you join.</p>'+
 '<div class="v81-support-links"><a href="#instructors">Meet our instructors →</a><a href="#safeguarding">Safeguarding and support →</a>'+
 '<a href="#faq">Questions before joining →</a></div></div></section>'+
 '</main>');
};
// Keep biographies human, factual and genuinely readable, without repeating the first paragraph.
function j81InstructorCard(p){
 const m=j74InstructorMedia(p);
 const text=String(p.summary||'').trim();
 const first=text.search(/[.!?]\s+[A-Z]/);
 const lead=first>=35?text.slice(0,first+1):text.slice(0,185).replace(/\s+\S*$/,'')+(text.length>185?'…':'');
 const remainder=first>=35?text.slice(first+1).trim():text.slice(lead.replace(/…$/,'').length).trim();
 const extra=remainder&&remainder.replace(/^…/,'').trim().length>12?
  '<details class="v81-instructor-details"><summary>Read more about '+jEsc(p.name)+'</summary><p>'+jEsc(remainder.replace(/^…/,'').trim())+'</p></details>':'';
 return '<article class="v81-instructor"><figure><img src="'+m.src+'" alt="'+jEsc(m.alt)+'" loading="lazy" onerror="this.onerror=null;this.src=j74WorldLogo()">'+
 '<figcaption>'+jEsc(m.note)+'</figcaption></figure><div><h3>'+jEsc(p.name)+'</h3>'+
 '<p class="v81-instructor-role">'+jEsc(p.role||'Jado instructor')+'</p><p>'+jEsc(lead||'Ask your local school about your instructor.')+'</p>'+extra+
 '<a class="v81-text-link" href="#school-directory">Find a local school →</a></div></article>';
}
j74TeacherCard=j81InstructorCard;
j74CompactTeacherCard=j81InstructorCard;
routes.instructors=function(){
 const people=cmsCollection('instructors').filter(p=>String(p.status).toLowerCase()==='live');
 return jPage('Meet the people who teach.','Get to know the instructors who welcome students across WJO.',
 '<div class="v81-instructor-list">'+people.map(j81InstructorCard).join('')+'</div>'+
 '<p class="v81-instructor-footer">Your school can confirm which instructor teaches the session you choose.</p>'+
 '<div class="j72-actions">'+jBtn('school-directory','Find a local school')+'</div>');
};
const v81OldRender=render;
render=function(){
 v81OldRender();
 document.title=document.title.replace(/V7[2-9]|V80/g,'V81');
};
