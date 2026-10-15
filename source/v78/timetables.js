/* V78 — Timetables verified against all seven WJO county timetable pages.
   Never invent a venue assignment when the original table gives only a town.
   All existing venue photos, introductions, instructors and local CMS edits remain. */
const J78_DATA=window.WJO_V78_TIMETABLES||{venues:{},venueAssignments:{}};
const J78_DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const j78Html=v=>jEsc(v);
function j78ApplyTimetables(){
 const data=cmsData();
 if(!data||!Array.isArray(data.schools))return;
 const keys=new Set();
 for(const s of data.schools){
   const record=J78_DATA.venues[s.id];
   if(!record)continue;
   keys.add(s.id);
   // A locally customised school has priority over the imported WJO dataset.
   // Built-in seed schools are reconciled with the WJO's published regional lists.
   if(s.seed===false)continue;
   s.sessions=record.sessions.map(row=>row.slice());
   s.days=[...new Set(record.sessions.map(r=>r[0]))].sort((a,b)=>J78_DAYS.indexOf(a)-J78_DAYS.indexOf(b));
   s.programmes=[...new Set(record.sessions.map(r=>r[2]))];
   s.timetableSourceRegion=record.region;
   s.timetableChecked=J78_DATA.checkedOn;
   s.timetableScope=J78_DATA.venueAssignments?.[s.id]?.scope||'venue';
   s.timetableNote=J78_DATA.venueAssignments?.[s.id]?.note||'';
   s.timetableSourceUrl=record.source; // auditing metadata, not a public link
 }
 if(!data.schools.some(s=>s.id==='online-chi')&&J78_DATA.venues['online-chi']){
   const rec=J78_DATA.venues['online-chi'];
   data.schools.push({
     id:'online-chi',name:'Online Jado Chi (Zoom)',town:'Online',region:'Northamptonshire',
     postcode:'',address:'Online class · joining details available from WJO',
     status:'Live',seed:true,image:'',sessions:rec.sessions.map(r=>r.slice()),
     days:['Wednesday'],programmes:['Jado Chi'],timetableScope:'online',
     timetableSourceRegion:rec.region,timetableChecked:J78_DATA.checkedOn,
     timetableNote:J78_DATA.venueAssignments?.['online-chi']?.note||'',
     timetableSourceUrl:rec.source
   });
 }
}
j78ApplyTimetables();
const j78PreviousReset=cmsResetData;
cmsResetData=function(){
 j78PreviousReset();
 j78ApplyTimetables();
 render();
};
window.cmsResetData=cmsResetData;
const j78PreviousMatch=jMatchesAge;
jMatchesAge=function(r,age){
 const level=String(r[3]||'').replace(/[–—]/g,'-');
 const p=String(r[2]||'').toLowerCase();
 const range=level.match(/(\d+)\s*-\s*(\d+)\s*(?:year|yrs|y\b)/i);
 if(range)return age>=+range[1]&&age<=+range[2];
 if(/black belt|levels|advanced/i.test(level)&&!/\ball\b/i.test(level))return false;
 if(p.includes('super'))return age>=3&&age<=7;
 if(p.includes('confident kidz'))return age>=6&&age<=12;
 if(p==='kids')return age>=3&&age<=12;
 if(p==='ladies only')return age>=16;
 if(p==='adults & teens'||p.includes('adult'))return age>=13;
 if(p.includes('chi'))return age>=13;
 return j78PreviousMatch(r,age);
};
function j78TimeRange(r){return j78Html(r[1])+(r[4]?'–'+j78Html(r[4]):'');}
function j78SourceNote(s){
 let line='WJO-published timetable · checked 15 October 2026. Session times and availability must be confirmed with the instructor.';
 if(s.timetableScope==='area')line='These are the published Market Harborough area sessions, not a confirmed timetable for this hall. WJO lists both Great Bowden and Stoke Albany but does not say which hall hosts the Monday classes. Ask the instructor to confirm the venue.';
 if(s.timetableScope==='online')line='This is an online WJO session, not a physical school. Ask WJO for joining details and current availability.';
 if(s.seed===false)line='Local timetable entry. Ask the instructor to confirm all details.';
 return '<p class="j78-provenance">'+j78Html(line)+'</p>';
}
// Replace the inherited summary so full end times are visible, with explicit programme and grade.
jSchedule=function(s,pick=true){
 const rows=s.sessions||[];
 if(!rows.length)return '<div class="j72-panel j78-no-timetable"><p>No weekly class times are published for this venue in the WJO county timetable. Please ask the instructor for current details.</p>'+
 (pick?'<button class="j72-btn" onclick="jPick(\''+j78Html(s.id)+'\',-1)">Ask about class times →</button>':'')+'</div>';
 return j78SourceNote(s)+'<div class="j72-session-list j78-session-list">'+rows.map((r,i)=>
 '<article><div><strong>'+j78Html(r[0])+' · '+j78TimeRange(r)+'</strong><h3>'+j78Html(r[2])+'</h3>'+
 '<p>'+j78Html(r[3]||'Ask the instructor about suitability')+'</p>'+
 ((/advanced|sparring|black belt|levels/i.test(r[3]||'')&&!/beginners|all/i.test(r[3]||''))?'<span class="j72-small">Ask about experience requirements.</span>':'')+
 '</div>'+(pick?'<button class="j72-btn" type="button" onclick="jPick(\''+j78Html(s.id)+'\','+i+')">'+
 (s.timetableScope==='area'?'Ask which hall hosts this class →':'Enquire about this class →')+'</button>':'')+'</article>').join('')+'</div>';
};
// Search cards: expose the complete time window, not a start time alone.
const j78PreviousResult=jResult;
jResult=function(s,guided){
 let html=j78PreviousResult(s,guided);
 if(s.timetableScope==='area'){
   html=html.replace('</ul>','</ul><p class="j78-area-tag">Market Harborough area times — hall to be confirmed.</p>');
 }
 const match=s.sessions||[];
 for(const r of match){
   html=html.replace(j78Html(r[0])+' '+j78Html(r[1])+'</strong>',
    j78Html(r[0])+' '+j78TimeRange(r)+'</strong>');
 }
 return html;
};
const j78OriginalSchool=routes.school;
routes.school=function(){
 let html=j78OriginalSchool();
 const s=jSchool(hashParams().get('id'));
 if(!s)return html;
 if(s.timetableScope==='area'){
   html=html.replace('<h2 id="j-timetable" tabindex="-1">Choose your session.</h2>',
   '<h2 id="j-timetable" tabindex="-1">Market Harborough area timetable.</h2>');
 }
 // Correct original prose: the source is WJO's published county timetable, not a local verified schedule.
 html=html.replace('These are the timetable details recorded for this school. Ask the instructor to confirm availability and suitability before attending.',
 'The times below are reproduced from the WJO county timetable. The instructor can confirm current arrangements and suitability.');
 return html;
};
const j78PreviousCounty=routes.county;
routes.county=function(){
 let html=j78PreviousCounty();
 const county=hashParams().get('name');
 if(!J74_COUNTIES.includes(county))return html;
 let schools=jSchools().filter(s=>s.region===county&&s.sessions?.length);
 const entries=[];
 for(const s of schools){
   // WJO publishes one Market Harborough timetable, not two separate village-hall timetables.
   if(s.timetableScope==='area'&&s.id==='stoke-albany')continue;
   for(const r of s.sessions){
     entries.push({name:s.timetableScope==='area'?'Market Harborough (venue to confirm)':s.name,
       id:s.id,day:r[0],start:r[1],end:r[4],programme:r[2],grade:r[3]});
   }
 }
 entries.sort((a,b)=>J78_DAYS.indexOf(a.day)-J78_DAYS.indexOf(b.day)||a.start.localeCompare(b.start)||a.name.localeCompare(b.name));
 let detail='<section class="j78-county-times"><h2>Published weekly class times</h2><p>Browse the full '+j78Html(county)+
   ' timetable as published by WJO. Please confirm current times with your instructor before travelling.</p>'+
  '<div class="j78-county-rows">'+entries.map(e=>
  '<a href="#school?id='+encodeURIComponent(e.id)+'"><span class="j78-day">'+j78Html(e.day)+'</span>'+
  '<strong>'+j78Html(e.start)+'–'+j78Html(e.end)+'</strong>'+
  '<span>'+j78Html(e.programme)+' · '+j78Html(e.grade)+'</span><small>'+j78Html(e.name)+'</small><b aria-hidden="true">→</b></a>').join('')+'</div></section>';
 html=html.replace('<div class="j72-actions">',detail+'<div class="j72-actions">');
 return html;
};


// The inherited V77 render hook sets its version label; V78 owns the final public title.
const j78PreviousRender=render;
render=function(){
 j78PreviousRender();
 document.title=document.title.replace(/V7[2-7]/g,'V78');
};
