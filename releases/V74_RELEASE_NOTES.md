# V74 — WJO identity, schools, photography and dependable media

## Improvements
- Keeps the **guided V73 journey**, age/programme matching, saved school, mobile shortcut bar and school enquiries.
- Adds an internal **What is Jado Kuin Do?** page, homepage introduction and original-source history (1998 creation and 2004 public Flore school); explains the meaning of *Jado / Kuin / Do* and the organisation’s emphasis on self-defence, coordination, life skills, balance and discipline.
- Restores **all seven location regions in the mobile menu**, each with direct venue links generated from current local school data; adds all-county and individual county pages, plus compact desktop locations navigation.
- Replaces generic page artwork with the user-supplied WORLD/WJO/JADO globe logo (scaled copy suitable for icon/card contexts). The already approved Jado crest remains in the main header.
- Provides a photo for each instructor panel. Real portrait if the supplied data contains one; otherwise WJO logo; for Sifu Mark Bruce a **genuine Brackley class photo**, clearly labelled as a class image, is displayed. No portrait is misidentified.
- Routes WJO stories to **open official YouTube watch pages** directly instead of embedding a player that fails in local HTML with YouTube error 153.
- Uses real approved Brackley pictures in place of the distorted social-development article art.
- Publishes a concise in-demo news index based on verified WJO article titles, dates and summaries. Committee-created public articles remain available.
- Removes “Notice the little steps” invented page, replacing it with a WJO-aligned page about training benefits. Repeated “sample” explanations are reduced while forms still accurately disclose that enquiries are not submitted.

## Important limits
- The local HTML preview never sends an enquiry or takes a payment. Keep the one factual submission disclosure.
- Instructor portraits cannot be inferred from group pictures. A dedicated headshot of Sifu Mark Bruce has **not** been supplied; the approved Brackley training photo is not labelled as his portrait.
- The supplied WJO globe was downsampled for fast loading on generic art and fallbacks; maintain the original supplied full-resolution artwork for future production.
- Some inherited committee and school information needs final confirmation by WJO before going live, particularly schedule and instructor assignments.
- No automation in this repository deploys the separate privately hosted test URL. Judge this release using the V74 ZIP or HTML download.

## Source evidence
WJO live pages consulted October 2026:
- /jado-kuin-do/
- /find-a-school/
- /wjo-grade-order/
- /frequently-asked-questions/
- /september-and-october-at-jado-kuin-do/
- /letter-from-grand-master-ogden/
- /wjo-sparring/
- /news/

## Build and check
```bash
python3 tools/rebuild_v74.py
npm install --no-save --ignore-scripts jsdom@30.1.2
node tools/test_v74.cjs dist/index.html
```

The V74 GitHub Actions workflow builds and commits:
- `WJO_V74_SINGLE_FILE_DEMO.html`
- `WJO_V74_DOWNLOAD.zip`

The ZIP contains the portable HTML with embedded imagery.
