# V81 — A Jado family from first visit to lasting progress

## Why this release exists

The V78–V80 site contained several competing ways of starting: hero buttons for “New to Jado” and “Find a class”, a separate children/adults/family chooser, repeated programme category tiles, further “Find a class” calls, and several similar welcome/benefits panels. The mobile screenshots also showed that the green-grey card scheme competed with WJO's established red, black and neutral palette.

V81 deliberately **replaces the homepage, not its underlying pages or data**, creating one continuous narrative.

## New homepage journey

1. **Belong** — a welcoming cream hero with one primary action, `Find my Jado class` → the existing `#start` guided journey. A quieter text link opens the complete locations directory for visitors who already know their school.
2. **Supported** — a warm family/community section emphasising talking to a local instructor, age-appropriate classes, accessible safeguarding information and celebrating small achievements.
3. **Progress** — three large programme cards (Super J’s 3–6, Confident Kidz 6–12, teens/adults 13+) with distinct imagery. Clear note that belt progression is personal and grading optional.
4. **First visit** — clear practical steps and a link to the existing first-visit guide, without another competing school search.
5. **People & support** — routes to the actual instructor directory, safeguarding and family FAQs.

## Authentic imagery
The “We’re so proud!” collage supplied by the user was **split into four independently embedded WebP photographs**, cropped without changing the original content:
- Students with their instructor celebrating together (hero)
- Two young students receiving awards (Super J’s card)
- Instructor celebrating with a young student (family section)
- Certificates and white belts ready for students (family section)

All four are stored as source data in `source/v81/family-photos.json`. They are embedded in the single-file HTML so the Android download works offline. Each is used only once on the homepage. The older verified WJO Brackley images continue to support other pages.

The imagery is used as ordinary community photography, not as fabricated individual testimonials or claimed identities.

## Instructor profiles
The directory and school instructor cards show a name, role, image, an introductory passage and an optional expand control. **The introduction is not repeated verbatim in the expanded biography.** Where a real instructor photograph isn't available, the existing approved asset fallback still applies; a group photo isn't misidentified as an individual's portrait.

## Maintained functionality
- V78 published school timetables and source notes, full seven-county navigation and corrected Market Harborough location ambiguity
- Guided onboarding, visit planning, school pages, venue photographs and internal WJO content
- Mobile bottom shortcuts, safeguarding, events, shop, member resources and admin tools
- Original WJO branding and Grand Master Ogden title
- Demo-only disclosure for unconnected enquiries and checkout

## Build and validation
```bash
python3 tools/rebuild_v81.py
npm install --no-save --ignore-scripts jsdom@30.1.2
node tools/test_v81.cjs dist/index.html
```
The build checks all four cropped-photo WebP payloads before embedding and publishes `WJO_V81_SINGLE_FILE_DEMO.html` plus `WJO_V81_DOWNLOAD.zip`. Browser tests cover the one-CTA homepage, correct programme links, no duplicate panels or image reuse, instructor biographies, class finding, seven-county menu and the preserved V78 timetable data.

This is still a standalone website preview, **not** a live booking or payment system.
