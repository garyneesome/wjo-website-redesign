/* V89: restore the original WJO welcome message and permanent cookie control.
 * These controls are intentionally outside the per-page #site rendering subtree.
 * The previous V72 rewrite disabled the original introduction and later builds
 * made the V52 quick link easy to lose during page replacement.
 */
(function(){
'use strict';
const W89_COOKIE_ID='w89-cookie-control';
const W89_WELCOME_ID='w89-welcome-dialog';
const W89_SEEN_KEY='wjo-v89-welcome-seen';
let w89WelcomeShown=false;
let w89PreviousFocus=null;

function safeSessionRead(){
  try{return sessionStorage.getItem(W89_SEEN_KEY)==='yes';}catch(_){return w89WelcomeShown;}
}
function safeSessionWrite(){
  w89WelcomeShown=true;
  try{sessionStorage.setItem(W89_SEEN_KEY,'yes');}catch(_){}
}
function cookieSvg(){
 return '<svg class="w89-cookie-icon" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
  '<path d="M20.2 10.5a3.5 3.5 0 0 1-4.7-4.7A3.5 3.5 0 0 1 11 3.1 9.1 9.1 0 1 0 20.2 10.5Z"/>'+
  '<circle cx="8.8" cy="13" r=".85" fill="currentColor" stroke="none"/>'+
  '<circle cx="13.4" cy="16.8" r=".85" fill="currentColor" stroke="none"/>'+
  '<circle cx="9.6" cy="18" r=".65" fill="currentColor" stroke="none"/>'+
  '</svg>';
}
function ensureCookieModal(){
  let modal=document.getElementById('cookie-modal-v38');
  if(modal) return modal;
  // Restore the existing fully functional preference editor rather than
  // introducing fake cookie toggles or redirecting to another website.
  if(typeof cookieModalV38==='function'){
    const container=document.createElement('div');
    container.innerHTML=cookieModalV38();
    modal=container.querySelector('#cookie-modal-v38');
    if(modal)document.body.appendChild(modal);
  }
  return modal;
}
function openCookiePrefs(){
  const modal=ensureCookieModal();
  if(modal&&typeof openCookieSettingsV38==='function'){
    openCookieSettingsV38();
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Cookie preferences');
    // Existing cookie controls remain bound to the original stored choices.
    return;
  }
  location.hash='#cookie-policy';
}
function ensureCookieControl(){
  const old=document.querySelectorAll('.cookie-quick-v52');
  old.forEach(el=>el.remove());
  let button=document.getElementById(W89_COOKIE_ID);
  if(!button){
    button=document.createElement('button');
    button.id=W89_COOKIE_ID;
    button.className='w89-cookie-control';
    button.type='button';
    button.setAttribute('aria-label','Open cookie settings');
    button.setAttribute('title','Cookie settings');
    button.innerHTML=cookieSvg()+'<span>Cookies</span>';
    button.addEventListener('click',openCookiePrefs);
    document.body.appendChild(button);
  }
  return button;
}
function closeWelcome(){
  const dialog=document.getElementById(W89_WELCOME_ID);
  if(!dialog)return;
  dialog.remove();
  document.body.classList.remove('w89-welcome-open');
  const focus=w89PreviousFocus;
  w89PreviousFocus=null;
  if(focus&&focus.isConnected&&typeof focus.focus==='function'){
    try{focus.focus({preventScroll:true});}catch(_){}
  }
}
function showWelcome(){
  if(safeSessionRead()||document.getElementById(W89_WELCOME_ID))return;
  const hash=(location.hash||'#home').split('?')[0];
  if(hash!=='#home'&&hash!=='#')return;
  safeSessionWrite();
  w89PreviousFocus=document.activeElement;
  const logo=typeof j74WorldLogo==='function'?j74WorldLogo():V38_LOGO;
  const overlay=document.createElement('div');
  overlay.id=W89_WELCOME_ID;
  overlay.className='w89-welcome-overlay';
  overlay.innerHTML=
    '<section class="w89-welcome-card" role="dialog" aria-modal="true" aria-labelledby="w89-welcome-title" aria-describedby="w89-welcome-message">'+
      '<button class="w89-welcome-close" type="button" aria-label="Close welcome message" onclick="dismissWjoIntroV29()">✕</button>'+
      '<div class="w89-welcome-logo"><img src="'+logo+'" alt="World Jado Organisation logo"></div>'+
      '<p class="w89-welcome-eyebrow">WELCOME TO JADO KUIN DO</p>'+
      '<h2 id="w89-welcome-title">A place to belong.</h2>'+
      '<blockquote id="w89-welcome-message">Inspiring healthier communities by teaching life skills, personal growth, well-being, and unity.</blockquote>'+
      '<p class="w89-welcome-attribution"><strong>Grand Master Jake Ogden</strong><span>Founder &amp; President · World Jado Organisation</span></p>'+
      '<button class="w89-welcome-continue" type="button" onclick="dismissWjoIntroV29()">Explore Jado <span aria-hidden="true">→</span></button>'+
    '</section>';
  overlay.addEventListener('click',event=>{if(event.target===overlay)closeWelcome();});
  document.body.appendChild(overlay);
  document.body.classList.add('w89-welcome-open');
  overlay.querySelector('.w89-welcome-close')?.focus({preventScroll:true});
}
showWjoIntroV29=showWelcome;
dismissWjoIntroV29=closeWelcome;
window.showWjoIntroV29=showWelcome;
window.dismissWjoIntroV29=closeWelcome;
window.w89OpenCookiePrefs=openCookiePrefs;

// V52 was previously injected into #site every render. The replacement is
// managed on document.body so it survives page changes and keeps its state.
cookieQuickLinkV52=function(){return '';};
const originalRender=render;
render=function(){
  originalRender();
  ensureCookieControl();
  if(!safeSessionRead()){
    // Returning to Home from a deep link should still show the initial welcome.
    setTimeout(showWelcome,350);
  }
};

// Startup in the V88 builder calls render() and showWjoIntroV29().
window.addEventListener('pageshow',ensureCookieControl);
})();
