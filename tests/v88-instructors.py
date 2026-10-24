#!/usr/bin/env python3
"""Chromium regression check: instructor heads aren't cropped by CSS in V88."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
URL=(ROOT/"WJO_V88_SINGLE_FILE_DEMO.html").resolve().as_uri()+"#instructors"
PREVIEW=ROOT/"assets/previews"
PREVIEW.mkdir(parents=True,exist_ok=True)

def test(page,label):
    page.goto(URL,wait_until="domcontentloaded",timeout=60000)
    page.locator(".v81-instructor-list .v81-instructor").first.wait_for(state="attached",timeout=45000)
    imgs=page.locator(".v81-instructor-list .v81-instructor figure img")
    assert imgs.count()>=1,"Instructor directory unexpectedly empty"
    for i in range(min(imgs.count(),5)):
        img=imgs.nth(i)
        img.scroll_into_view_if_needed()
        result=img.evaluate("""e=>{
          const css=getComputedStyle(e),rect=e.getBoundingClientRect();
          return {naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,
            objectFit:css.objectFit,aspectRatio:css.aspectRatio,
            height:rect.height,width:rect.width};
        }""")
        assert result["naturalWidth"]>0 and result["naturalHeight"]>0,(label,i,result)
        assert result["objectFit"]=="contain",(label,i,"Cropping present",result)
        assert result["aspectRatio"]=="auto",(label,i,"Forced aspect-ratio",result)
        ratio=result["width"]/result["height"]
        original=result["naturalWidth"]/result["naturalHeight"]
        assert abs(ratio-original)<.035,(label,i,"Image stretched or cropped",result)
        if i==0: print(label,"first portrait",result)
    page.locator(".v81-instructor-list").first.scroll_into_view_if_needed()
    page.screenshot(path=str(PREVIEW/f"wjo-v88-instructors-{label}.jpg"),type="jpeg",quality=83)
    assert page.evaluate("document.documentElement.scrollWidth-window.innerWidth")<=3, "Page has horizontal overflow"

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
    for label,width,height in (("mobile",390,844),("desktop",1440,900)):
        context=browser.new_context(viewport={"width":width,"height":height},device_scale_factor=1)
        page=context.new_page()
        test(page,label)
        context.close()
    browser.close()
print("V88 instructor crop and aspect-ratio regression tests passed")
