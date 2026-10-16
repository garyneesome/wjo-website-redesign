# V80 — final verification of WJO venue records and photos

V80 is a focused follow-up to the completed V79 release. It preserves the full guided website, 80 WJO-published schedule entries from V78, mobile venue finder, WJO logo, real photos, five animal cards, shop and V79 navigation and storytelling improvements.

## Verified corrections
- **Southam:** The original WJO website lists **Everyone Active, Welsh Road West, Southam, CV47 0JW** — not "Southam College Gymnasium", the incorrect original demo name. The demo now shows **Everyone Active Southam** everywhere the venue appears: school detail, region directory, class finder, older school search and menu. Its Monday Kids 17:00–17:45 and Adults 18:00–18:50 sessions are preserved.
- **Sunart:** Original WJO Highlands timetable lists Monday Confident Kidz 16:30–17:20 and Adult and Advanced 18:00–18:50. The V78 timetable importer already corrected this, so V80 preserves it. The obsolete 17:30 entry remains only in the historical seed, which is superseded by the imported public timetable.
- **Unverified hall images:** Five inherited image mappings were not demonstrably photographs of the correct buildings or pointed to generic/different buildings. Until verified venue photographs are supplied, the user-approved WJO emblem is displayed for Southam, Gateway School, The Barn Houlton, Priors Hall Park Community Centre, and Oakley Vale Community Centre. The real venue photos that the user provided for Brackley, Deanshanger, Earls Barton, Danesholme and Wollaston are kept.
- **Protect local edits:** If the committee has customised a school record, its local name and timetable are not overwritten on load or reset by these corrections.

## Sources
- [WJO Warwickshire timetable](https://wjo.org.uk/find-a-school/wjo-warwickshire/)
- [WJO school and venue directory](https://wjo.org.uk/find-a-school/)
- [WJO Highlands timetable](https://wjo.org.uk/find-a-school/wjo-highlands/)
- Seven-county snapshot and source metadata: `source/v78/wjo-published-timetables.json`.

Some original WJO pages have old publication dates and are not a live booking service; visitors should confirm venue and time with instructors.

## Build & tests
```bash
python3 tools/rebuild_v80.py
npm install --no-save --ignore-scripts jsdom@30.1.2
node tools/test_v80.cjs dist/index.html
```
GitHub Action: `.github/workflows/build-v80-demo.yml`.

Expected portable files: `WJO_V80_SINGLE_FILE_DEMO.html` and `WJO_V80_DOWNLOAD.zip`.
