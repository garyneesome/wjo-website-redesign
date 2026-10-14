# V73 — an easier journey from curious to first class

## How to test
- Download the latest **WJO_V73_DOWNLOAD.zip** and extract **WJO_V73_SINGLE_FILE_DEMO.html**. Open the HTML locally in a browser.
- Alternatively use the complete web build in `dist/` where a suitable static host is available.
- The prior private hosted demo URL may still serve V72 until the external host is redeployed; do **not** use it to judge V73.

## Changes from V72
1. Replaces the decorative dark journey poster with three functional steps and a personalised “Guide me” action.
2. Adds an internal New to Jado guide, first-lesson questions, parent advice, adult-beginner reassurance, and a “Why Jado?” route.
3. Adds optional motivation and preferred day to the guided programme chooser, without falsifying age suitability or withholding other sessions.
4. Keeps the existing real class/school data, approved photos, uniform requirements, grades, five animals and CMS.
5. Adds homepage first-visit reassurance and a concise “training that grows with you” section.
6. Provides a four-position, light mobile navigation: Start, Classes, My Jado, **Menu**, with access to the full menu from every scroll position. It leaves page content clear at the bottom.
7. Calms the mobile hero typography and cuts down the tall poster treatment.
8. Adds automated browser checks and a reproducible self-contained ZIP distribution.

## Important limits
- The demo never transmits class enquiries, makes bookings or takes payment.
- No invented testimonials or invented three-month grading results are presented.
- Preferred interests are questions to raise with an instructor, not promises about class outcomes.
- Club timetables, fees, uniform on first visit, trial options and venue accessibility require instructor confirmation.
- This source commit does not automatically deploy the unrelated private hosted test site.

## Build and validate
```bash
python3 tools/rebuild_v73.py
npm install --no-save jsdom@30.1.2
node tools/test_v73.cjs
```
The portable HTML and ZIP are compiled and committed by the GitHub Actions V73 workflow.
