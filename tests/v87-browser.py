#!/usr/bin/env python3
"""Real Chromium smoke tests on the standalone offline WJO V87 HTML file."""
from pathlib import Path
import sys
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'WJO_V87_SINGLE_FILE_DEMO.html').resolve().as_uri()
preview=ROOT/'assets/previews'
preview.mkdir(parents=True,exist_ok=True)

def check_main(page, variant):
    page.goto(html+'#home',wait_until='domcontentloaded',timeout=45000)
    page.locator('main.w86-home').wait_for(timeout=30000)
    hero=page.locator('.w86-home .w86-hero')
    assert hero.count()==1,variant
    button=page.locator('.w86-home .w86-hero .w86-button-red')
    assert button.count()==1,variant
    assert button.get_attribute('href')=='#start',variant
    assert 'Find my Jado class' in button.inner_text(),variant
    image=page.locator('.w86-hero-photo img')
    image.wait_for(state='visible',timeout=15000)
    assert image.evaluate('(img)=>img.complete && img.naturalWidth>0'), 'Jado hero photo did not load'
    cta=button.bounding_box()
    heading=page.locator('.w86-home #w86-hero-title').bounding_box()
    photo=image.bounding_box()
    assert cta and heading and photo
    assert cta['y']>heading['y'],(variant,'CTA must follow headline')
    if variant=='mobile':
        assert cta['y']+cta['height']<page.viewport_size['height']-83,('CTA is below mobile bottom navigation',cta)
        assert cta['y']+cta['height']<photo['y']+5,('CTA should be above the photo',cta,photo)
    overflow=page.evaluate('document.documentElement.scrollWidth-window.innerWidth')
    assert overflow<=3,(variant,'horizontal overflow',overflow)
    page.screenshot(path=str(preview/f'wjo-v87-{variant}.jpg'),type='jpeg',quality=79)
    print(variant,'CTA bounds',cta,'hero photo bounds',photo,'no horizontal overflow')

def check_login(page):
    page.goto(html+'#admin',wait_until='domcontentloaded',timeout=45000)
    page.locator('#admin-username').wait_for(state='attached',timeout=30000)
    page.locator('#admin-username').fill('committee')
    page.locator('#admin-password').fill('incorrect')
    page.locator('#admin-username').evaluate('(el)=>{const form=el.closest("form"); if(form)form.requestSubmit();else window.submitAdminLogin({preventDefault(){}})}')
    assert page.locator('#admin-login-message').get_attribute('role')=='alert','Bad credentials not rejected'
    assert page.evaluate('isAdminLoggedIn()') is False,'Invalid credentials authorised'
    page.locator('#admin-password').fill('jado2026')
    page.locator('#admin-username').evaluate('(el)=>{const form=el.closest("form"); if(form)form.requestSubmit();else window.submitAdminLogin({preventDefault(){}})}')
    page.wait_for_function('location.hash === "#admin-hub" && isAdminLoggedIn()===true',timeout=12000)
    page.locator('.admin-layout').wait_for(state='attached',timeout=12000)
    assert page.locator('a[href="#admin-news"]').count()>0,'Original hub functionality unavailable'
    page.evaluate('adminLogout()')
    page.wait_for_function('location.hash==="#admin" && isAdminLoggedIn()===false',timeout=10000)
    print('login/logout: original committee hub opens with correct demo credentials')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    mobile=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    desktop=browser.new_context(viewport={'width':1440,'height':900},device_scale_factor=1)
    check_main(mobile.new_page(),'mobile')
    page=desktop.new_page()
    check_main(page,'desktop')
    check_login(page)
    mobile.close()
    desktop.close()
    browser.close()
print('V87 Chromium smoke tests passed')
