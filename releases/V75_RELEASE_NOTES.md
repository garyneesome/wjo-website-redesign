# V75 — Family-first WJO release and original-site audit

## Changes
- Header, footer and full mobile menu use the supplied WORLD/WJO/JADO globe artwork via their shared brand function, replacing the old circular Jado crest.
- A shorter mobile header uses WJO wording beside its logo.
- Clearly bordered and raised programme choice cards, strong button states, higher contrast and accessibility focus rings.
- Family-first homepage section, real Brackley training photography, link to first-visit and parent guidance.
- New accessible FAQ based on original WJO content, including training ages, no prerequisite fitness or flexibility, optional belts/competitions and family back-to-back classes where available.
- Complete in-demo Explore WJO directory; restored internal Jado Tai Chi and Community pages; no external legacy WJO page navigation required.
- Keeps the four-action mobile bottom navigation, original school data, real venue images and guided class selection.

## Original WJO site coverage audit (15 October 2026)

| Original area | Demo route | Notes |
|---|---|---|
| Home; orientation | #home; #start | Family-first guide preserved |
| About WJO, formed in 2003 | #about | Existing content retained |
| WJO vision | #vision | Existing content retained |
| Jado Kuin Do history (1998; Flore 2004) | #jado | Original-aligned V74 content |
| Committee and founder | #leadership | Verify live names/positions before publication |
| Frequently asked questions | #faq | Missing route added in V75 |
| Grades and belt meanings | #grade-order | Junior intermediate stripe order still needs confirmation |
| Safe practice | #safe-practice | Original policy requires final approval |
| Safeguarding children | #safeguarding-children | Original policy requires final approval |
| Safeguarding adults | #safeguarding-adults | Original policy requires final approval |
| Super J’s / Five Animals | #super-js; #jado-animals | Present |
| Confident Kidz | #confident-kidz | Present |
| Adult & young adults | #adults | Present |
| Jado Tai Chi Chuan | #chi | Internal route restored; current sessions not presumed |
| Seven regions, all listed venues | #school-directory; #county | Present; timetable details subject to local confirmation |
| Jado community | #community; #stories | Real community themes, no fabricated testimonials |
| News & blogs | #news | Curated in-demo news and committee-authored articles |
| Events & gradings | #events | Live-calendar integration not yet active |
| Contact and trials | #contact; #enquire | Forms remain an honest non-sending preview |
| Shop and memberships | #shop; #memberships | Demonstration checkout; no real payments |
| Students and myTraining | #members; #my-jado; #training-app | Real member login not connected |
| Privacy and cookies | #privacy-notice; #cookie-policy | Production legal sign-off required |

The live WJO site also offers a free "True Spirit of Jado Kuin Do" publication. Its reusable download asset and permission need verification; this release does not invent a PDF. Specific instructor headshots remain outstanding: the Brackley class image is explicitly labelled and not misidentified as Sifu Mark Bruce.

## Reviewed pages
- https://wjo.org.uk/
- https://wjo.org.uk/about-world-jado-kuin-do/
- https://wjo.org.uk/wjo-mission-statement/
- https://wjo.org.uk/jado-kuin-do/
- https://wjo.org.uk/frequently-asked-questions/
- https://wjo.org.uk/wjo-grade-order/
- https://wjo.org.uk/wjo-training-programmes/jado-tai-chi-health-exercise/
- https://wjo.org.uk/wjo-in-the-community/
- https://wjo.org.uk/find-a-school/
- https://wjo.org.uk/safeguarding-in-martial-arts-safe-practice/
- https://wjo.org.uk/contact-us/

## Build and validation
Build: python3 tools/rebuild_v75.py
DOM tests: npm install --no-save --ignore-scripts jsdom@30.1.2 && node tools/test_v75.cjs dist/index.html
