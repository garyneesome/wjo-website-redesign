/* V85: Two Brown Belt 2nd Tag reference charts and restored Committee Hub.
   This release preserves V84 and earlier routes. It does not bypass the original
   committee-login check or replace the existing front-end CRUD dashboards.
*/
(function(){
'use strict';
const charts=window.WJO_V85_CHARTS||[];
const images=window.WJO_V85_CHART_IMAGES||{};
const esc=v=>jEsc(String(v??''));
const findChart=id=>charts.find(c=>c.id===id);
function chartCard(c){
  const src=images[c.id]||'';
  return '<article class="v85-chart-card">'+
    '<a class="v85-chart-preview" href="#grading-reference?id='+encodeURIComponent(c.id)+'" aria-label="View '+esc(c.label)+'">'+
    '<img loading="lazy" alt="'+esc(c.label)+' showing the '+esc(c.subheading)+' grading requirements" src="'+src+'"></a>'+
    '<div class="v85-chart-details"><h3>'+esc(c.label)+'</h3><p>'+esc(c.subheading)+'</p>'+
    '<div class="v85-chart-links"><a class="j72-btn" href="#grading-reference?id='+encodeURIComponent(c.id)+'">View chart →</a>'+
    '<button type="button" class="j72-btn secondary" onclick="j85DownloadChart(\''+esc(c.id)+'\')">Download PNG ↓</button></div></div>'+
    '</article>';
}
const previousResources=routes.resources;
routes.resources=function(){
  let markup=previousResources();
  // Put 2nd Tag into the advanced belt section immediately after Brown 1st Tag,
  // without changing the original 12 individual syllabus records.
  const marker='<a href="#syllabus?id=black-1st-degree"';
  const card='<a class="v84-grade-card v85-tag-card" style="--v84-belt:#7a4326" href="#brown-second-tag">'+
    '<div class="v84-belt-block" aria-hidden="true"><span></span></div>'+
    '<div><small>Advanced · Two reference documents</small><h3>Brown Belt – 2nd Tag</h3><span>View both reference charts →</span></div></a>';
  if(markup.includes(marker))markup=markup.replace(marker,card+marker);
  else markup=markup.replace('</main>',card+'</main>');
  return markup;
};
routes['student-resources']=routes.resources;
routes['grading-resources']=routes.resources;
routes['brown-second-tag']=function(){
  return jPage('Brown Belt – 2nd Tag.','Two combined WJO reference charts covering the previous belt requirements.',
    '<section class="v85-chart-intro"><span class="j72-eyebrow">BROWN BELT · 2ND TAG</span>'+
    '<h2>Requirements from White Belt through Brown Belt.</h2>'+
    '<p>These two reference documents reproduce the grading topics from your supplied WJO combined reference sheets. Each grade is given its own colour-coded panel, with full-width text and the decorative lettering moved into the background.</p>'+
    '<p><strong>Note:</strong> These are combined reference charts, not a separate official 2nd Tag assessment syllabus. Please confirm current expectations with your instructor.</p></section>'+
    '<div class="v85-chart-grid">'+charts.map(chartCard).join('')+'</div>'+
    '<div class="j72-actions">'+jBtn('resources','All grading resources')+jBtn('grade-order','Belt progression',true)+'</div>',
    ['resources','Student Resources']);
};
routes['grading-reference']=function(){
  const chart=findChart(hashParams().get('id'));
  if(!chart)return routes['brown-second-tag']();
  return jPage(chart.label+'.', 'Brown Belt 2nd Tag · WJO combined grading reference document.',
    '<div class="v85-print-toolbar">'+jBtn('brown-second-tag','← Both charts',true)+
    '<button type="button" class="j72-btn" onclick="j85Print()">Print / Save as PDF</button>'+
    '<button type="button" class="j72-btn secondary" onclick="j85DownloadChart(\''+esc(chart.id)+'\')">Download PNG ↓</button></div>'+
    '<figure class="v85-chart-full"><img src="'+images[chart.id]+'" alt="'+esc(chart.label)+': '+esc(chart.subheading)+'. Full colour-coded requirements from the supplied WJO reference sheet.">'+
    '<figcaption>'+esc(chart.subheading)+' · '+esc(chart.copyright)+'</figcaption></figure>'+
    '<p class="v85-chart-note">Reformatted from the WJO combined reference sheet supplied for this redesign. Check with your instructor for the current grading requirements.</p>'+
    '<div class="j72-actions">'+jBtn('brown-second-tag','Brown 2nd Tag resources',true)+jBtn('resources','All Resources',true)+'</div>',
    ['brown-second-tag','Brown Belt 2nd Tag']);
};
window.j85Print=function(){window.print()};
window.j85DownloadChart=function(id){
  const chart=findChart(id),src=images[id];if(!chart||!src)return;
  const a=document.createElement('a');a.href=src;a.download=chart.filename;
  document.body.appendChild(a);a.click();a.remove();
};
// Restore, do not replace, the full original committee CRUD, content editors and login.
routes['committee-hub']=function(){
 return typeof routes['admin-hub']==='function'?routes['admin-hub']():routes.admin();
};
const previousMobile=mobileMenu;
mobileMenu=function(){
 let html=previousMobile();
 if(html.includes('href="#admin-hub"'))return html;
 const link='<a class="j79-main-link v85-committee-link" href="#admin-hub" onclick="closeMenu()">Committee Hub <span aria-hidden="true">→</span></a>';
 return html.replace('</nav>',link+'</nav>');
};
const previousHeader=header;
header=function(){
 let html=previousHeader();
 if(html.includes('href="#admin-hub"'))return html;
 // Place the link in the same desktop navigation as Resources.
 return html.replace(/(<nav\b[^>]*class="nav"[^>]*>[\s\S]*?)(<\/nav>)/,
   '$1<a href="#admin-hub" class="v85-committee-nav">Committee Hub</a>$2');
};
const previousFooter=footer;
footer=function(){
 let html=previousFooter();
 if(html.includes('href="#admin-hub"'))return html;
 // Keep all existing footer and quick links, adding one committee shortcut.
 return html.replace('</footer>','<div class="v85-footer-committee"><a href="#admin-hub">Committee Hub →</a> <a href="#admin">Committee login</a></div></footer>');
};
if(typeof routes['explore-wjo']==='function'){
 const explore=routes['explore-wjo'];
 routes['explore-wjo']=function(){
  let html=explore();
  if(!html.includes('href="#admin-hub"'))html=html.replace('</main>','<section class="v85-committee-shortcut">'+jBtn('admin-hub','Committee Hub')+'</section></main>');
  return html;
 };
}
})();