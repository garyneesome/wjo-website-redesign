#!/usr/bin/env node
/** Test the V87 demo login even when Android denies localStorage/sessionStorage. */
const fs=require('fs');
const vm=require('vm');
const assert=require('assert/strict');
const source=fs.readFileSync('source/v87/experience.js','utf8');
const elems={
 'admin-username':{value:''},
 'admin-password':{value:''},
 'admin-login-message':{textContent:'',setAttribute(k,v){this[k]=v;}}
};
let renderCount=0;
const ctx={
 window:{},
 ADMIN_DEMO_USER:'committee',
 ADMIN_DEMO_PASS:'jado2026',
 isAdminLoggedIn:()=>false,
 submitAdminLogin:()=>false,
 fillAdminDemo:()=>false,
 adminLogout:()=>{},
 document:{getElementById:id=>elems[id]||null},
 location:{hash:'#admin'},
 render:()=>{renderCount++},
 routes:{
  admin:()=>'<div class="admin-login-card"><form onsubmit="submitAdminLogin(event)"></form><div id="admin-login-message">Demo login</div></div>',
  home:()=>'<main><a href="#start">Find your Jado class</a><a>What happens at my first class?</a></main>'
 }
};
Object.defineProperty(ctx,'localStorage',{get(){throw new DOMException('The operation is insecure.','SecurityError')}});
Object.defineProperty(ctx,'sessionStorage',{get(){throw new DOMException('The operation is insecure.','SecurityError')}});
vm.createContext(ctx);
vm.runInContext(source,ctx);
assert(!ctx.isAdminLoggedIn(),'The demo should begin logged out');
assert(ctx.routes.admin().includes('w87-admin-help'),'The login note was not added');
let prevented=0;
elems['admin-username'].value='committee';
elems['admin-password'].value='wrong';
ctx.submitAdminLogin({preventDefault(){prevented++}});
assert.equal(prevented,1);
assert.equal(elems['admin-login-message'].role,'alert');
assert(!ctx.isAdminLoggedIn(),'Invalid credentials must not grant access');
assert.equal(ctx.location.hash,'#admin');
ctx.fillAdminDemo();
assert(ctx.isAdminLoggedIn(),'Valid demo credentials must work even when storage is denied');
assert.equal(ctx.location.hash,'#admin-hub');
assert(renderCount>0,'Navigation must trigger rendering even with the current hash');
ctx.adminLogout();
assert(!ctx.isAdminLoggedIn(),'Logout must clear temporary demo auth');
assert.equal(ctx.location.hash,'#admin');
const home=ctx.routes.home();
assert(home.includes('Find my Jado class'));
assert(home.includes('What to expect at my first class'));
const css=fs.readFileSync('source/v87/experience.css','utf8');
for(const snippet of ['display:contents','order:3','order:4','@media(max-width:760px)','font-size:16px','min-height:61px']) {
 assert(css.includes(snippet),'Missing responsive CTA rule '+snippet);
}
console.log('V87: storage-denied Android demo login, invalid credentials, logout and CTA tests passed');
