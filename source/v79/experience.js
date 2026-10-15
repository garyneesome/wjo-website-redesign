/* V79: tidy navigation and restore actual WJO people, animals and video story previews.
   V78 published schedules, WJO logo, original store images, guided class finder stay intact. */
const J79_ANIMALS=['snake','tiger','crane','panther','dragon'];
function j79Mascot(p){
  let t=0;for(const char of String(p.name||p.id||'Jado'))t=(t*31+char.charCodeAt(0))%99991;
  return 'assets/mascot-'+J79_ANIMALS[t%J79_ANIMALS.length]+'.jpg';
}
j74InstructorMedia=function(p){
 const source=String(p.photo||'');
 if(source&&!/mascot|wjo-logo|wjo-crest|undefined|^data:image\/png;base64/i.test(source)){
    return {src:j74LocalImage(source),alt:'Photograph of '+String(p.name||'WJO instructor'),note:'Instructor photograph'};
 }
 const animal=j79Mascot(p);
 return {src:resolveAssetPath(animal),alt:'Jado '+animal.match(/mascot-([a-z]+)/)[1]+' character illustration',note:'Jado animal illustration'};
};
// The original creator/founder and committee portraits remain from the verified image library.
const j79OriginalLeadership=routes.leadership;
routes.committee=()=>{
 const body=j79OriginalLeadership();
 return body.replace('MEET THE <em>WJO LEADERSHIP.</em>','MEET THE <em>WJO COMMITTEE.</em>')
   .replace('The people responsible for leadership, safeguarding, technical development and grading standards across the organisation.',
   'Meet the people who help guide, protect and support the World Jado Organisation.');
};
routes['wjo-committee']=routes.committee;
// Consolidate previously stacked mobile menus. Counties and individual venues remain accessible.
function j79CountyMenu(){
 return J74_COUNTIES.map(c=>'<details class="j79-county"><summary>'+jEsc(c)+' <span aria-hidden="true">⌄</span></summary>'+
 '<div class="j79-county-items"><a href="'+j74CountyLink(c)+'" onclick="closeMenu()">All '+jEsc(c)+' schools →</a>'+
 jSchools().filter(s=>j74County(s)===c && s.timetableScope!=='online')
  .sort((a,b)=>a.name.localeCompare(b.name))
  .map(s=>'<a href="'+j74SchoolLink(s)+'" onclick="closeMenu()">'+jEsc(s.name)+'</a>').join('')+
 '</div></details>').join('');
}
function j79NavLink(id,label){return '<a class="j79-main-link" href="#'+id+'" onclick="closeMenu()">'+label+' <span aria-hidden="true">→</span></a>';}
mobileMenu=function(){
 return '<div id="mobileMenu" class="mobile-overlay j79-menu" role="dialog" aria-modal="true" aria-label="WJO navigation">'+
 '<div class="mobile-head">'+brand()+'<button class="close" type="button" onclick="closeMenu()" aria-label="Close navigation">×</button></div>'+
 '<nav class="j79-menu-nav" aria-label="Main menu">'+
 j79NavLink('home','Home')+
 j79NavLink('start','New to Jado? Start here')+
 '<details class="j79-menu-group"><summary>Find a class <span aria-hidden="true">⌄</span></summary><div class="j79-menu-contents">'+
 j79NavLink('find-school','Find classes by town')+j79NavLink('school-directory','Browse all locations')+
 j79CountyMenu()+'</div></details>'+
 j79NavLink('jado','About Jado Kuin Do')+
 '<details class="j79-menu-group"><summary>Our people <span aria-hidden="true">⌄</span></summary><div class="j79-menu-contents">'+
 j79NavLink('instructors','Instructors')+j79NavLink('committee','WJO Committee')+
 j79NavLink('stories','Student & family stories')+'</div></details>'+
 j79NavLink('events','Events & gradings')+
 j79NavLink('shop','Shop')+
 j79NavLink('my-jado','My Jado')+
 j79NavLink('safeguarding','Safeguarding')+
 j79NavLink('contact','Contact WJO')+
 '<div class="j79-menu-directory">'+j79NavLink('explore-wjo','Explore all WJO pages')+'</div>'+
 '</nav></div>';
};
// Keep the all-pages index as a true sitemap, adding a working committee destination.
const j79ExploreBefore=routes['explore-wjo'];
routes['explore-wjo']=function(){
 return j79ExploreBefore().replace('Everything from the World Jado Organisation in one place, with no links back to the old website.',
 'A complete directory of WJO information, training, schools, support and membership.')
 .replace('href="#leadership">Committee & leadership','href="#committee">WJO Committee');
};
// Restore committee access for desktop and footer visitors as well.
const j79HeaderBefore=header;
header=function(){
 return j79HeaderBefore().replace('href="#instructors"','href="#instructors"');
};
const j79FooterBefore=footer;
footer=function(){
 return j79FooterBefore().replace('href="#leadership"','href="#committee"')
 .replace('href="#admin">Committee','href="#committee">WJO Committee');
};
// Remove the second school finder explanation in the green "Your next steps" panel.
// The interactive wizard itself and venue chooser are unaffected.
const j79JourneyBefore=v70JourneyContent;
v70JourneyContent=function(key){
 return j79JourneyBefore(key).replace(/<aside class="v73-path-guide"[\s\S]*?<\/aside>/,'');
};
// Video thumbnails derive from the original WJO video IDs. The original video opens directly
// on YouTube because embedded playback fails for local file:// demos.
const J79_VIDEO_STORIES=[
 {id:'k0PL3aq-eSo',title:"Billy’s Story",subtitle:'A student’s perspective',fallback:'assets/photos/brackley-adult-training.webp'},
 {id:'RlAgOido-MY',title:'A Parent’s View',subtitle:'From a parent',fallback:'assets/photos/brackley-partner-practice.webp'},
 {id:'1w0wcMe-fRI',title:'Family Testimonial',subtitle:'A family’s experience',fallback:'assets/photos/brackley-belt-celebration.webp'}
];
function j79VideoThumb(story){
 return window.WJO_V79_STORY_POSTERS?.[story.id]||
    resolveAssetPath(story.fallback);
}
function j79VideoCard(story){
 return '<a class="j79-video-story" href="https://www.youtube.com/watch?v='+story.id+'" target="_blank" rel="noopener noreferrer" aria-label="Watch '+story.title+' on YouTube">'+
 '<div class="j79-video-poster"><img src="'+j79VideoThumb(story)+'" alt="Video preview for '+story.title+'" loading="lazy" onerror="this.onerror=null;this.src=resolveAssetPath(\''+story.fallback+'\')"><span class="j79-video-play" aria-hidden="true">▶</span></div>'+
 '<div class="j79-video-copy"><small>'+story.subtitle+'</small><h3>'+story.title+'</h3><strong>Watch the story <span aria-hidden="true">↗</span></strong></div></a>';
}
const j79HomeBefore=routes.home;
routes.home=function(){
 let html=j79HomeBefore();
 const cards=J79_VIDEO_STORIES.map(j79VideoCard).join('');
 // The V70 video-story links were text-only. Restore photographic previews in-place.
 html=html.replace(/<div class="v70-story-links">[\s\S]*?<\/div>(?=<\/div><\/section>)/,
   '<div class="j79-video-stories">'+cards+'</div>');
 return html;
};
routes.stories=()=>jPage('Stories from the Jado family.','Hear from a student, a parent and a family involved in Jado Kuin Do.',
 '<div class="j79-video-stories">'+J79_VIDEO_STORIES.map(j79VideoCard).join('')+'</div>'+
 '<div class="j72-actions">'+jBtn('start','Find your first class')+jBtn('instructors','Meet the instructors',true)+'</div>');
const j79OriginalStory=routes.story;
routes.story=function(){
 const id=hashParams().get('id');
 const story=J79_VIDEO_STORIES.find(s=>s.id===id);
 return story?jPage(story.title,story.subtitle,j79VideoCard(story)+'<div class="j72-actions">'+jBtn('stories','All stories',true)+'</div>'):
    j79OriginalStory();
};
// Old fallback behaviour substituted the WJO globe; use the original Jado animals for missing media.
const j79PrevClean=jCleanDom;
jCleanDom=function(){
 j79PrevClean();
 document.querySelectorAll('.j74-instructor-card img').forEach(img=>{
  const card=img.closest('.j74-instructor-card');
  if(!card)return;
  const name=card.querySelector('h3')?.textContent||'Jado';
  const fallback=resolveAssetPath(j79Mascot({name}));
  img.onerror=function(){
    if(img.dataset.j79FallbackDone)return;
    img.dataset.j79FallbackDone='1';
    img.src=fallback; img.style.objectFit='cover';
    img.alt='Jado animal illustration';
  };
 });
};
