/* V78 — reconcile every published WJO county timetable with the local CMS school dataset.
   School id is the stable join key; all images, addresses and instructor associations are preserved. */
const J78_TIMETABLE = window.WJO_V78_TIMETABLE || {schools:[],checkedDate:''};
const J78_SOURCE_BY_ID = new Map(J78_TIMETABLE.schools.map(record=>[record.id,record]));
const J78_AUDIT = {matched:[],missing:[],added:[],sessions:0};
function j78SyncTimetables(){
 const cms=cmsData();
 let changed=false;
 const ids=new Set((cms.schools||[]).map(s=>s.id));
 cms.schools=(cms.schools||[]).map(s=>{
   const ref=J78_SOURCE_BY_ID.get(s.id);
   if(!ref)return s;
   const canonical=ref.rows.map(r=>r.slice());
   const updated={...s,
     sessions:canonical,
     days:[...new Set(canonical.map(row=>row[0]))],
     programmes:[...new Set(canonical.map(row=>row[2]))],
     timetableSource:ref.sourceUrl,
     timetableChecked:J78_TIMETABLE.checkedDate,
     timetableNote:ref.note||'',
     areaTimetable:Boolean(ref.areaOnly),
     sourceLocation:ref.area||''
   };
   J78_AUDIT.matched.push(ref.id);
   J78_AUDIT.sessions+=canonical.length;
   if(JSON.stringify(s.sessions||[])!==JSON.stringify(canonical)
     ||s.timetableChecked!==J78_TIMETABLE.checkedDate
     ||s.timetableNote!==(ref.note||'')){
     changed=true;
   }
   return updated;
 });
 // WJO lists one online Jado Chi class, not a physical school: do not invent a street address.
 for(const ref of J78_TIMETABLE.schools.filter(x=>x.virtual&&!ids.has(x.id))){
    const s={id:ref.id,name:ref.name,town:ref.town,postcode:ref.postcode||'',
      address:ref.address,region:ref.region,status:'Live',
      image:'assets/wjo-crest.png',seed:true,
      sessions:ref.rows.map(r=>r.slice()),
      days:[...new Set(ref.rows.map(r=>r[0]))],
      programmes:[...new Set(ref.rows.map(r=>r[2]))],
      timetableSource:ref.sourceUrl,timetableChecked:J78_TIMETABLE.checkedDate,
      timetableNote:ref.note||'',areaTimetable:false,sourceLocation:''};
    cms.schools.push(s);
    J78_AUDIT.added.push(ref.id);
    J78_AUDIT.sessions+=s.sessions.length;
    changed=true;
 }
 J78_AUDIT.missing=J78_TIMETABLE.schools.filter(x=>!ids.has(x.id)&&!x.virtual).map(x=>x.id);
 if(changed)cmsSaveData(cms);
 window.WJO_V78_AUDIT=J78_AUDIT;
 return cms;
}
j78SyncTimetables();

const j78PreviousMatch=jMatchesAge;
jMatchesAge=function(row,age){
 const text=String(row[3]||'').replace(/[–—]/g,'-');
 const ranges=text.match(/(\d+)\s*-\s*(\d+)\s*(?:yrs?|years? old)?/i);
 if(ranges && /yr|year/i.test(text))return age>=Number(ranges[1])&&age<=Number(ranges[2]);
 const programme=String(row[2]||'').toLowerCase();
 if(programme.includes('adults 16+'))return age>=16;
 if(programme.includes('kids') && !programme.includes('kidz'))return age>=3&&age<=12;
 if(programme.includes('ladies only'))return age>=18;
 if(programme==='advanced class' || programme==='levels')return false; // No beginner recommendation for specialist-only classes.
 if(programme.includes('teen'))return age>=13;
 return j78PreviousMatch(row,age);
};
const j78PreviousSchedule=jSchedule;
jSchedule=function(s,pick=true){
 const warning=s.areaTimetable?
  '<div class="j78-area-warning"><strong>Market Harborough area timetable — venue unconfirmed</strong>'+
  '<p>WJO publishes these Monday class times under Market Harborough, without specifying whether the venue is Stoke Albany Village Hall or Great Bowden Village Hall. Please confirm the correct hall before travelling.</p></div>':
  s.timetableNote?'<div class="j78-area-warning"><p>'+jEsc(s.timetableNote)+'</p></div>':'';
 const footer=s.timetableChecked?'<p class="j78-times-footnote">Class times as listed by WJO. Please confirm the session, availability and meeting point with your instructor before visiting.</p>':'';
 return warning+j78PreviousSchedule(s,pick)+footer;
};
const j78PreviousResult=jResult;
jResult=function(s,guided){
 let html=j78PreviousResult(s,guided);
 if(s.areaTimetable)html=html.replace('</ul>', '</ul><p class="j78-area-label">Market Harborough area times · confirm which village hall</p>');
 return html;
};
// A single, well-described notice is preferable to implying that town-level times are hall-confirmed.
const j78PreviousSchool=routes.school;
routes.school=function(){
 let html=j78PreviousSchool();
 if(hashParams().get('id')==='great-bowden'){
  html=html.replace('This school’s timetable is awaiting confirmation.',
    'The WJO Leicestershire timetable lists Monday Market Harborough classes but does not identify whether they meet at Great Bowden or Stoke Albany. Check with the instructor before attending.');
 }
 return html;
};
