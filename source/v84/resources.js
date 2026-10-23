/* V84: accessible, offline grading resources using source-checked WJO sheets.
   The supplied originals are authoritative. This is a faithful digital transcription
   of their requirements, not a new grading syllabus. */
(function(){
'use strict';
const grades=window.WJO_V84_GRADES||[];
const safe=v=>jEsc(String(v??''));
const G=id=>grades.find(g=>g.id===id);
const studentCode=[['R','Respect'],['A','Attitude'],['C','Commitment'],['H','Honesty'],['E','Etiquette'],['L','Loyalty']];
function codeBlock(){
 return '<section class="v84-code" aria-labelledby="v84-student-code"><div class="v84-code-heading"><span class="j72-eyebrow">THE JADO STUDENT CODE</span><h2 id="v84-student-code">Values to train by. Values to live by.</h2>'+
 '<p>RACHEL is a way to remember the six qualities encouraged throughout Jado Kuin Do training, both in class and beyond.</p></div>'+
 '<div class="v84-code-letters">'+studentCode.map(x=>'<div><span aria-hidden="true">'+x[0]+'</span><strong>'+x[1]+'</strong></div>').join('')+'</div></section>';
}
function sectionMarkup(section){
 const heading=safe(section[0]),kind=section[1],items=section[2]||[];
 const body=kind==='numbered'?'<ol>'+items.map(t=>'<li>'+safe(t)+'</li>').join('')+'</ol>':
  kind==='bullets'?'<ul>'+items.map(t=>'<li>'+safe(t)+'</li>').join('')+'</ul>':
  '<div class="v84-lines">'+items.map(t=>'<p>'+safe(t)+'</p>').join('')+'</div>';
 return '<section class="v84-syllabus-section"><h3>'+heading+'</h3>'+body+'</section>';
}
function originalLogo(){
 if(typeof j74WorldLogo==='function')return j74WorldLogo();
 return resolveAssetPath('assets/wjo-crest.png');
}
function sheet(g){
 return '<article class="v84-sheet" style="--v84-belt:'+safe(g.color)+'" aria-label="'+safe(g.name)+' syllabus">'+
 '<div class="v84-sheet-header"><img src="'+originalLogo()+'" alt="Jado Kuin Do crest">'+
 '<div><span>JADO KUIN DO</span><h2>'+safe(g.name)+'</h2></div>'+
 '<img src="'+originalLogo()+'" alt="" aria-hidden="true"></div>'+
 '<p class="v84-intro">'+safe(g.note||'')+'</p>'+
 (g.intro?'<p class="v84-intro v84-secondary-intro">'+safe(g.intro)+'</p>':'')+
 '<div class="v84-sheet-main">'+(g.sections||[]).map(sectionMarkup).join('')+'</div>'+
 '<div class="v84-sheet-footer"><p><strong>www.wjo.org.uk</strong></p><p>WORLD JADO ORGANISATION</p><small>© COPYRIGHT '+safe(g.copyright||'WJO')+'</small></div>'+
 '</article>';
}
function gradeCard(g){
 return '<a href="#syllabus?id='+encodeURIComponent(g.id)+'" class="v84-grade-card" style="--v84-belt:'+safe(g.color)+'">'+
 '<div class="v84-belt-block" aria-hidden="true"><span></span></div>'+
 '<div><small>'+safe(g.group)+'</small><h3>'+safe(g.name)+'</h3><span>View requirements &amp; print →</span></div></a>';
}
function group(name){
 const entries=grades.filter(x=>x.group===name);
 return '<section class="v84-resource-section" aria-label="'+safe(name)+' grades"><h2>'+safe(name)+' grades</h2>'+
 '<div class="v84-grades">'+entries.map(gradeCard).join('')+'</div></section>';
}
function gradeList(){
 return group('Foundation')+group('Intermediate')+group('Advanced')+group('Degree / Level');
}
const existingResources=routes.resources;
routes.resources=function(){
 return jPage('Student resources.','Your Jado Kuin Do grading journey, values and helpful guides.',
 '<div class="v84-resources-lead"><h2>Find your grading requirements.</h2><p>Choose your grade to open a full, colour-coded requirements sheet. Read it here, print it or save it as a standalone HTML document. These sheets are transcribed from supplied WJO documents; your instructor should confirm the current syllabus before a grading.</p></div>'+
 '<div class="v84-resource-jump"><a href="#student-code">Student Code (RACHEL) →</a><a href="#grade-order">View belt order →</a><a href="#visit-guide">First class checklist →</a></div>'+
 gradeList()+codeBlock()+
 '<div class="v84-resources-more"><h2>More support</h2><p>Find guidance for your first visit, member information and safeguarding.</p>'+
 '<div class="j72-actions">'+jBtn('visit-guide','First visit')+jBtn('grade-order','Belt progression',true)+jBtn('safeguarding','Safeguarding',true)+jBtn('members','My training',true)+'</div></div>');
};
routes['student-resources']=routes.resources;
routes['grading-resources']=routes.resources;
routes.syllabus=function(){
 const id=hashParams().get('id');
 const g=G(id);
 if(!g)return jPage('Choose a grading sheet.','That grade is not in the supplied document collection.',
 gradeList()+jBtn('resources','All resources'));
 return jPage(g.name+' requirements.','World Jado Organisation · Official source sheet transcribed for accessibility.',
 '<div class="v84-sheet-toolbar"><a class="j72-btn secondary" href="#resources">← All grading resources</a>'+
 '<button type="button" class="j72-btn" onclick="j84Print()">Print / Save as PDF</button>'+
 '<button type="button" class="j72-btn secondary" onclick="j84Download('+JSON.stringify(g.id)+')">Download HTML sheet ↓</button></div>'+
 sheet(g)+
 '<p class="v84-document-caveat">The requirements above follow the original WJO grading sheets supplied for the redesign. These archived versions carry their original copyright dates; ask your instructor to confirm current requirements. Downloaded HTML works offline. Use Print / Save as PDF for a PDF copy.</p>'+
 '<div class="v84-neighbours">'+(grades.filter(x=>x.group===g.group&&x.id!==g.id).map(gradeCard).join(''))+'</div>', ['resources','Resources']);
};
routes['student-code']=function(){
 return jPage('The Jado Student Code.','Remember the six qualities behind the RACHEL student code.',
 codeBlock()+'<div class="v84-code-explanation"><p>Practising Jado Kuin Do involves more than developing techniques. The student code encourages positive behaviour, discipline and a supportive approach to others.</p>'+
 '<div class="j72-actions">'+jBtn('resources','Explore grading resources')+jBtn('jado','About Jado Kuin Do',true)+'</div></div>', ['resources','Resources']);
};
const oldAbout=routes.jado;
routes.jado=function(){return oldAbout().replace('</main>',codeBlock()+'</main>');};
if(typeof routes.about==='function'){
 const oldAboutOverview=routes.about;
 routes.about=function(){return oldAboutOverview().replace('</main>',codeBlock()+'</main>');};
}
const oldGradeOrder=routes['grade-order'];
if(typeof oldGradeOrder==='function'){
 routes['grade-order']=function(){
  return oldGradeOrder().replace('</main>','<section class="v84-order-cta"><div class="wrap"><h2>Ready to see what each grade involves?</h2><p>Explore full grading requirements for every belt in the resources library.</p>'+jBtn('resources','Browse grading sheets')+'</div></section></main>');
 };
}
const oldHome=routes.home;
routes.home=function(){
 return oldHome().replace('href="#grade-order">Discover belts and gradings','href="#resources">Discover belts and gradings');
};
const originalMobile=mobileMenu;
mobileMenu=function(){
 let markup=originalMobile();
 if(markup.includes('href="#resources"'))return markup;
 if(markup.includes('href="#shop"')){
  return markup.replace('<a class="j79-main-link" href="#shop"', '<a class="j79-main-link" href="#resources" onclick="closeMenu()">Grading resources <span aria-hidden="true">→</span></a><a class="j79-main-link" href="#shop"');
 }
 return markup.replace('</nav>','<a href="#resources" onclick="closeMenu()">Resources &amp; grading sheets →</a></nav>');
};
const oldHeader=header;
header=function(){
 const markup=oldHeader();
 if(markup.includes('href="#resources"'))return markup;
 return markup.replace(/(<nav\b[^>]*class="nav"[^>]*>[\s\S]*?)(<\/nav>)/,
  '$1<a href="#resources">Resources</a>$2');
};
const oldFooter=footer;
footer=function(){
 return oldFooter().replace('href="#resources">Resources','href="#resources">Grading resources');
};
window.j84Print=function(){window.print();};
window.j84Download=function(id){
 const g=G(id);if(!g)return;
 // Copy the document's style and logo into a genuinely standalone downloadable page.
 const css=document.getElementById('wjo-v84-css')?.textContent||'';
 const content='<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+
 safe(g.name)+' · Jado Kuin Do</title><style>'+css+'</style></head><body><main class="v84-export">'+sheet(g)+'</main></body></html>';
 const url=URL.createObjectURL(new Blob([content],{type:'text/html;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='WJO-'+g.id+'-grading-requirements.html';
 document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
};
})();
