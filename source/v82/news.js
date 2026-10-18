/* V82: restore complete WJO article bodies from archived build-time source data. */
(function(){
const archive=window.WJO_FULL_NEWS_ARCHIVE||[];
const tidy=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
function match(n){
 const url=String(n.external||n.url||'');
 return archive.find(a=>url&&a.url&&url.replace(/\/$/,'')===a.url.replace(/\/$/,''))||
 archive.find(a=>tidy(a.title)===tidy(n.title));
}
const originalArticle=routes.article;
routes.article=function(){
 const id=hashParams().get('id');
 const record=cmsCollection('news').find(n=>String(n.id)===String(id));
 const full=record&&match(record);
 if(!full||!full.html)return originalArticle();
 const image=record.image||record.photo||'';
 const img=image?'<img class="v82-hero" src="'+jEsc(resolveAssetPath(image))+'" alt="'+jEsc(record.title)+'" loading="lazy">':'';
 return jPage(record.title,'Published '+jEsc(full.date||record.date||'')+(full.author?' · '+jEsc(full.author):''),
 '<article class="v82-article">'+img+'<div class="v82-body">'+full.html+'</div></article>'+
 '<div class="j72-actions">'+jBtn('news','More Jado news')+jBtn('events','Events & gradings',true)+'</div>',
 ['news','Jado news']);
};
const oldNews=routes.news;
routes.news=function(){
 let page=oldNews();
 return page;
};
})();
