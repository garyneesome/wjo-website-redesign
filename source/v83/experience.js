/* V83: first-visit guidance, instructor integrity and mobile navigation polish.
   All school information comes from the existing WJO directory, never invented. */
(function(){
const esc=v=>jEsc(String(v??''));
const schoolLink=s=>'#school?id='+encodeURIComponent(s.id);
function venueDetails(s){
 const times=(s.sessions||[]).map(r=>'<li><strong>'+esc(r[0])+' · '+esc(r[1])+'</strong> — '+esc(r[2])+(r[3]?' ('+esc(r[3])+')':'')+'</li>').join('');
 const teachers=typeof jTeachers==='function'?jTeachers(s):[];
 return '<div class="v83-venue"><h2>'+esc(s.name)+'</h2><p>'+esc(s.address||s.postcode||'Ask the instructor for venue details')+'</p>'+
 '<h3>Published class times</h3>'+(times?'<ul>'+times+'</ul>':'<p>Contact the school to confirm its current timetable.</p>')+
 '<h3>Your instructor</h3>'+(teachers.length?'<p>'+teachers.map(t=>esc(t.name)).join(', ')+'</p>':'<p>Ask the school who will lead your session.</p>')+
 '<p>Class times and teaching arrangements may change. Please confirm before travelling.</p>'+
 '<a class="j72-btn" href="'+schoolLink(s)+'">View school and enquire →</a></div>';
}
routes['first-visit']=function(){
 const sId=hashParams().get('school');
 const school=sId?jSchool(sId):null;
 return jPage('Your first Jado class.','A friendly guide to getting started.',
 '<div class="v83-first-intro"><h2>Everyone starts somewhere.</h2><p>It is fine to feel nervous, have questions or have no previous martial arts experience. Your local instructor can explain what happens at your class and what to bring.</p></div>'+
 (school?venueDetails(school):'<div class="v83-first-intro"><h2>Start with a local school</h2><p>Choose a school to see its published timetable and venue information.</p>'+jBtn('find-school','Find a local class')+'</div>')+
 '<div class="v83-first-grid">'+
 '<section><h2>Before you arrive</h2><p>Contact your instructor to confirm your session, trial arrangements, suitable clothing and any equipment requirements.</p></section>'+
 '<section><h2>When you get there</h2><p>Ask where to meet the instructor, whether a parent can observe and how beginners are welcomed.</p></section>'+
 '<section><h2>During your first session</h2><p>Learn at your own pace, ask questions and let the instructor know if you need extra support.</p></section></div>'+
 '<div class="j72-actions">'+jBtn('find-school','Find a class')+jBtn('parents-information','Information for parents',true)+jBtn('safeguarding','Safeguarding',true)+'</div>');
};
routes['new-to-jado']=routes['first-visit'];
routes['visit-guide']=routes['first-visit'];
// Retain individual biographies; do not publish identical text against multiple people.
if(typeof j81InstructorCard==='function'){
 const originalCard=j81InstructorCard;
 const people=cmsCollection('instructors').filter(p=>String(p.status).toLowerCase()==='live');
 const counts=new Map();
 for(const p of people){const bio=String(p.summary||'').replace(/\s+/g,' ').trim().toLowerCase();if(bio.length>65)counts.set(bio,(counts.get(bio)||0)+1);}
 const card=p=>{
   const bio=String(p.summary||'').replace(/\s+/g,' ').trim().toLowerCase();
   if(!bio||counts.get(bio)>1){
     const safe={...p,summary:'Please contact this instructor’s school for an individual introduction.'};
     return originalCard(safe);
   }
   return originalCard(p);
 };
 j74TeacherCard=card;j74CompactTeacherCard=card;
 routes.instructors=function(){
   const list=cmsCollection('instructors').filter(p=>String(p.status).toLowerCase()==='live');
   return jPage('Meet the people who teach.','Get to know the instructors who welcome students across WJO.',
     '<div class="v81-instructor-list">'+list.map(card).join('')+'</div>'+
     '<p class="v81-instructor-footer">Profiles without a verified individual biography are awaiting confirmation. Ask your school for details.</p>'+
     '<div class="j72-actions">'+jBtn('school-directory','Find a local school')+'</div>');
 };
}
// Keep the primary homepage journey intact and add one discoverable first-class guide.
const previousHome=routes.home;
routes.home=function(){
 const html=previousHome();
 return html.replace('href="#new-to-jado"','href="#first-visit"');
};
})();
