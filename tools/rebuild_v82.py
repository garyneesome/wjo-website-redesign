#!/usr/bin/env python3
"""Build V82 and import complete published WJO article HTML at build time."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import json,re,urllib.request,html as htmlmod
from rebuild_v81 import build as previous
ROOT=Path(__file__).resolve().parents[1]
MARKER="window.addEventListener('hashchange',render);render();setTimeout(showWjoIntroV29,120);scheduleNewsletterV40();"
def get_json(url):
 req=urllib.request.Request(url,headers={'User-Agent':'WJO-site-redesign/1.0'})
 with urllib.request.urlopen(req,timeout=25) as response:return json.load(response)
def archive():
 posts=[]
 for page in range(1,8):
  try:batch=get_json('https://wjo.org.uk/wp-json/wp/v2/posts?per_page=100&page='+str(page)+'&_fields=title,link,date,content,author')
  except Exception as exc:
   if page==1:raise RuntimeError('Cannot fetch WJO full news articles: '+str(exc))
   break
  if not batch:break
  for p in batch:
   body=p.get('content',{}).get('rendered','')
   body=re.sub(r'<script\b[^>]*>[\s\S]*?</script>','',body,flags=re.I)
   body=re.sub(r'<iframe\b[^>]*>[\s\S]*?</iframe>','',body,flags=re.I)
   body=re.sub(r'\s(on\w+)=([\x22\x27]).*?\2','',body,flags=re.I)
   posts.append({'title':htmlmod.unescape(re.sub('<[^>]+>','',p['title']['rendered'])),'url':p['link'],'date':p.get('date','')[:10],'html':body})
  if len(batch)<100:break
 if not posts:raise RuntimeError('WJO news API returned no articles')
 return posts
def upgrade(html):
 data=json.dumps(archive(),ensure_ascii=False).replace('</','<\\/')
 js=(ROOT/'source/v82/news.js').read_text(encoding='utf-8')
 assert html.count(MARKER)==1
 html=html.replace(MARKER,'window.WJO_FULL_NEWS_ARCHIVE='+data+';\n'+js+'\n'+MARKER,1)
 html=html.replace('</head>','<style>.v82-article{max-width:850px;margin:0 auto 55px}.v82-article img{max-width:100%;height:auto}.v82-body{font-size:1.08rem;line-height:1.8}.v82-body p{margin-bottom:1.2em}.v82-body h2,.v82-body h3{margin:1.5em 0 .5em}</style></head>',1)
 return html.replace('World Jado Kuin Do Organisation • V81','World Jado Kuin Do Organisation • V82').replace('wjo-build" content="V81"','wjo-build" content="V82"').replace('<title>Jado Kuin Do V81','<title>Jado Kuin Do V82')
def build():
 previous()
 target=ROOT/'WJO_V82_SINGLE_FILE_DEMO.html'
 target.write_text(upgrade((ROOT/'WJO_V81_SINGLE_FILE_DEMO.html').read_text(encoding='utf-8')),encoding='utf-8')
 (ROOT/'dist/index.html').write_text(upgrade((ROOT/'dist/index.html').read_text(encoding='utf-8')),encoding='utf-8')
 with ZipFile(ROOT/'WJO_V82_DOWNLOAD.zip','w',ZIP_DEFLATED,compresslevel=5) as z:z.write(target,target.name)
if __name__=='__main__':build()
