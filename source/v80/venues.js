/* V80 — independently checked WJO venue identity, source-consistent listings and safe photographs.
 * V78's 80 schedule entries, original school records, and guided visitor journey are preserved. */
const J79_SOUTHAM_NAME='Everyone Active Southam';
const J79_SOUTHAM_ADDRESS='Welsh Road West, Southam, CV47 0JW';
// These older image mappings were either different venues or unverified generic external images.
// In the absence of a genuine photograph, show the user's official WJO badge, not another building.
const J79_UNVERIFIED_VENUE_IMAGES=new Set(['southam','gateway','houlton','priors-hall','oakley-vale']);
function j79UpdateSchoolIdentity(){
  const official={name:J79_SOUTHAM_NAME,town:'Southam',postcode:'CV47 0JW',address:J79_SOUTHAM_ADDRESS};
  const fresh=cmsData()?.schools;
  if(Array.isArray(fresh)){
    const record=fresh.find(s=>s.id==='southam');
    if(record&&record.seed!==false)Object.assign(record,official);
  }
  // Older public finder and its links still reference the original seed array.
  // Keep it aligned even when users navigate via an old route.
  if(typeof SCHOOLS!=='undefined'){
    const record=SCHOOLS.find(s=>s.id==='southam');
    if(record)Object.assign(record,official);
  }
}
j79UpdateSchoolIdentity();
const j79OldReset=cmsResetData;
cmsResetData=function(){
  j79OldReset();
  j79UpdateSchoolIdentity();
  render();
};
window.cmsResetData=cmsResetData;
// Preserve verified user-supplied venue photographs; suppress only stale/unverified mappings.
const j79OriginalSchoolBgPath=schoolBgPath;
schoolBgPath=function(s){
  if(J79_UNVERIFIED_VENUE_IMAGES.has(s?.id))return '';
  return j79OriginalSchoolBgPath(s);
};
const j79PreviousJImage=jImage;
jImage=function(s){
  if(J79_UNVERIFIED_VENUE_IMAGES.has(s?.id))return j74WorldLogo();
  return j79PreviousJImage(s);
};
// Helpful clarification on any timetable that could be confused with another physical venue.
const j79PreviousSchool=routes.school;
routes.school=function(){
  const html=j79PreviousSchool();
  const s=jSchool(hashParams().get('id'));
  if(!s||!J79_UNVERIFIED_VENUE_IMAGES.has(s.id))return html;
  return html.replace(
    '<div class="j72-venue-hero">',
    '<div class="j79-venue-image-note"><span aria-hidden="true">ⓘ</span> Venue photograph pending verification; WJO emblem shown instead.</div><div class="j72-venue-hero">'
  );
};
const j79OriginalRender=render;
render=function(){
  j79OriginalRender();
  document.title=document.title.replace(/V7[2-9]/g,'V80');
};
