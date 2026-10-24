#!/usr/bin/env python3
"""Test V89 welcome and cookie UI in the actual single-file WJO site."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'WJO_V89_SINGLE_FILE_DEMO.html').resolve().as_uri()
PREVIEW=ROOT/'assets/previews'
PREVIEW.mkdir(parents=True,exist_ok=True)

def verify(page,device):
    page.goto(HTML+'#home',wait_until='domcontentloaded',timeout=65000)
    welcome=page.locator('#w89-welcome-dialog')
    welcome.wait_for(state='visible',timeout=18000)
    assert 'Grand Master Jake Ogden' in welcome.inner_text()
    assert 'Inspiring healthier communities by teaching life skills' in welcome.inner_text()
    assert welcome.get_attribute('class')=='w89-welcome-overlay'
    logo=welcome.locator('img')
    assert logo.evaluate('(e)=>e.complete && e.naturalWidth>0'), 'The welcome logo did not load'
    assert welcome.locator('[role="dialog"][aria-modal="true"]').count()==1
    page.screenshot(path=str(PREVIEW/f'wjo-v89-welcome-{device}.jpg'),type='jpeg',quality=83)
    welcome.locator('.w89-welcome-continue').click()
    welcome.wait_for(state='detached',timeout=8000)

    cookie=page.locator('#w89-cookie-control')
    cookie.wait_for(state='visible',timeout=6000)
    assert cookie.get_attribute('aria-label')=='Open cookie settings'
    assert cookie.count()==1

    if device=='mobile':
        bar=page.locator('.j72-mobile-bar')
        if bar.count():
            cookie_box=cookie.bounding_box()
            bar_box=bar.bounding_box()
            assert cookie_box and bar_box
            assert cookie_box['y']+cookie_box['height']<=bar_box['y']+3, ('cookie button overlaps bottom nav',cookie_box,bar_box)
        assert page.evaluate('document.documentElement.scrollWidth-window.innerWidth')<=3, 'Mobile horizontal overflow'

    cookie.click()
    modal=page.locator('#cookie-modal-v38')
    modal.wait_for(state='attached',timeout=6500)
    assert 'open' in (modal.get_attribute('class') or '').split(), 'Existing cookie preferences were not opened'
    assert 'Cookie preferences' in modal.inner_text()
    assert modal.get_attribute('role')=='dialog'
    page.evaluate('closeCookieSettingsV38()')
    assert 'open' not in (modal.get_attribute('class') or '').split()

    page.evaluate("location.hash='#instructors'")
    page.wait_for_function("location.hash==='#instructors' && document.querySelector('.v81-instructor-list')",timeout=18000)
    assert page.locator('#w89-cookie-control').count()==1
    cookie.click()
    assert 'open' in (page.locator('#cookie-modal-v38').get_attribute('class') or '').split()
    page.evaluate('closeCookieSettingsV38()')
    page.evaluate("location.hash='#cookie-policy'")
    page.wait_for_function("location.hash==='#cookie-policy' && document.querySelector('main')",timeout=18000)
    assert page.locator('#w89-cookie-control').count()==1
    page.screenshot(path=str(PREVIEW/f'wjo-v89-cookie-{device}.jpg'),type='jpeg',quality=82)

    # The popup is displayed only once per session; navigating never retriggers it.
    page.evaluate("location.hash='#home'")
    page.wait_for_function("location.hash==='#home' && document.querySelector('.w86-home')",timeout=20000)
    page.wait_for_timeout(650)
    assert page.locator('#w89-welcome-dialog').count()==0,'Welcome unexpectedly reopened'
    assert page.locator('#w89-cookie-control').count()==1
    print(device,'welcome + cookie modal + navigation verified')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    for name,width,height in [('mobile',390,844),('desktop',1440,900)]:
        ctx=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1)
        verify(ctx.new_page(),name)
        ctx.close()
    browser.close()
print('V89 browser tests passed.')
