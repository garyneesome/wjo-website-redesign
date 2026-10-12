// V71: preserve the real approved Brackley photos, avoid repeating them in the journey panel,
// and turn the next step into an approachable, interactive three-part guide.
// This is a presentation layer only; all original WJO routes and admin data remain intact.
const V71_JOURNEYS = {
  child: {
    eyebrow: 'For your child',
    headline: 'A little confidence goes a long way.',
    steps: ['Choose an age-appropriate programme', 'Talk to the local instructor', 'Discover a class that feels right'],
    art: ['Curiosity', 'Confidence', 'Community'],
    foot: 'Super J’s (3–6) and Confident Kidz (6–12) offer different starting points.'
  },
  self: {
    eyebrow: 'For you',
    headline: 'It starts with showing up.',
    steps: ['Explore movement that interests you', 'Ask your school about beginner classes', 'Learn at a pace that works for you'],
    art: ['Start', 'Practice', 'Progress'],
    foot: 'Whether you’re exploring Jado Kuin Do or Jado Tai Chi, ask your local instructor about joining.'
  },
  family: {
    eyebrow: 'For your family',
    headline: 'Individual journeys. Shared encouragement.',
    steps: ['Explore programmes for each age', 'Check local school times', 'Celebrate progress together'],
    art: ['Together', 'Support', 'Belong'],
    foot: 'Most children and adults train in separate classes. Your local school can explain its timetable.'
  }
};
v70JourneyContent = function(key){
  const p=V70_PATHS[key], j=V71_JOURNEYS[key];
  if(!p || !j) return '';
  return `<div class="v70-path-copy v71-path-copy">
    <span class="v70-label">${j.eyebrow} · the first step</span>
    <h3>${j.headline}</h3><p>${p.text}</p>
    <ol class="v71-checklist">${j.steps.map((step,i)=>`<li><span aria-hidden="true">0${i+1}</span>${step}</li>`).join('')}</ol>
    <div class="v70-path-links">${p.links.map(([href,text])=>`<a href="#${href}">${text}<span aria-hidden="true">↗</span></a>`).join('')}</div>
    <p class="v70-note">${j.foot}</p><a class="v70-textlink" href="#find-school">Find your local class →</a>
  </div>
  <div class="v71-path-poster" aria-hidden="true">
    <div class="v71-poster-top"><span>JADO KUIN DO</span><span>YOUR JOURNEY</span></div>
    <div class="v71-poster-title">Here is where<br><em>you begin.</em></div>
    <div class="v71-poster-sequence">${j.art.map((word,i)=>`<div><span>0${i+1}</span><b>${word}</b></div>`).join('')}</div>
    <div class="v71-poster-bottom">EVERY BELT HAS A BEGINNING <span>↗</span></div>
  </div>`;
};
// Reuse each real photograph once on the homepage. Resolve embedded photos
// so the single-file preview also displays them without a separate assets folder.
const v71PreviousHome=routes.home;
routes.home=function(...args){
  let html=v71PreviousHome.apply(this,args);
  for(const name of ['brackley-belt-celebration','brackley-partner-practice','brackley-adult-training']){
    const path='assets/photos/'+name+'.webp';
    html=html.split('src="'+path+'"').join('src="'+resolveAssetPath(path)+'"');
  }
  const ribbon=`<aside class="v71-ribbon" aria-label="Explore your starting point"><div class="wrap v71-ribbon-inner">
    <span class="v71-ribbon-label">Find your place</span>
    <a href="#super-js"><b>Little learners</b><small>Super J’s · 3–6</small><span aria-hidden="true">↗</span></a>
    <a href="#confident-kidz"><b>Growing confidence</b><small>Confident Kidz · 6–12</small><span aria-hidden="true">↗</span></a>
    <a href="#adults"><b>Teen & adult journeys</b><small>13+ and beginners</small><span aria-hidden="true">↗</span></a>
  </div></aside>`;
  html=html.replace('<section class="v70-section v70-journey"',ribbon+'<section class="v70-section v70-journey"');
  // One clear call to action after the photos, before the existing Five Animals section.
  const moment=`<div class="wrap v71-photo-next"><div><strong>These are real Jado moments.</strong><span>Curious about the people and classes near you?</span></div><a href="#find-school">Find a nearby school <span aria-hidden="true">↗</span></a></div>`;
  html=html.replace('</div></div></section>\n<section class="v70-section v70-animals"',moment+'</div></div></section>\n<section class="v70-section v70-animals"');
  return html;
};
// Make the programme chooser work with the revised journey content when navigating via hashes.
const v71PreviousJourneyRoute=routes['your-journey'];
routes['your-journey']=function(...args){return v71PreviousJourneyRoute.apply(this,args);};
