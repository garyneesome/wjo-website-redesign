# V78 — Full published WJO timetable reconciliation

Reviewed the seven original county timetable pages on **15 October 2026** and reproduced their published weekly class data in the standalone demo. The source dataset covers **31 entries, 80 displayed session records** (78 distinct published records: the same two Market Harborough-area sessions are available as enquiries through both listed halls pending confirmation). These are *published times*, not real-time availability and not independently confirmed current classes.

## Corrections

- **Leicestershire:** Original site lists Monday Market Harborough Confident Kidz 18:00–19:00 and Adults 19:00–20:00. It names Great Bowden and Stoke Albany as venues in its directory, but the weekly timetable does **not** identify which hall hosts these sessions. Both venue pages now show the area timetable with an explicit prominent “hall to be confirmed” note; neither is described as a confirmed venue.
- **Hertfordshire:** Harpenden's previously blank schedule now shows Monday Confident Kidz 17:00–17:50, Advanced 19:00–19:50 and Adults & Teens 20:00–21:00.
- **Warwickshire:** Southam's previously blank schedule now lists Monday Kids 17:00–17:45 and Adults 18:00–18:50. Paddox Wednesday Kids start corrected to **15:20**, ending 16:20.
- **Northamptonshire:** Danes Camp Saturday classes corrected from 08:30 and 09:30 to **09:00–09:50** and **10:00–11:00**, respectively. Restores missing advanced-level classes at Earl's Barton, updates Rothwell and other sessions to their exact published finish times and class grades, and adds the WJO-published Wednesday online Jado Chi 19:15–20:15 session.
- **Buckinghamshire:** Adds missing Tuesday 19:00–20:00 advanced Kids at Stantonbury and Thursday 20:00–21:00 advanced Adults.
- **Highlands/Oxfordshire:** All listed original sessions, including accurate finish times and grade levels, are reflected.
- **All regions:** Mobile venue pages show start–finish, class and published grade; the guided finder updates from the same data. Each county page has a compact browsable timetable with links to venue information, without duplicating the Market Harborough area timetable in its regional overview.

## Source of truth

Data: `source/v78/wjo-published-timetables.json`.
Display/reconciliation: `source/v78/timetables.js`, `source/v78/timetables.css`.

Original region URLs:
- https://wjo.org.uk/find-a-school/wjo-buckinghamshire/
- https://wjo.org.uk/find-a-school/wjo-hertfordshire/
- https://wjo.org.uk/find-a-school/wjo-highlands/
- https://wjo.org.uk/find-a-school/wjo-leicestershire/
- https://wjo.org.uk/find-a-school/wjo-northampton/
- https://wjo.org.uk/find-a-school/wjo-oxfordshire/
- https://wjo.org.uk/find-a-school/wjo-warwickshire/

The original pages have old publication dates and may not reflect real-time updates. Before attending a session, users should confirm the current class time, instructor and venue. The demo does not submit enquiries.

## Editorial safety and CMS
- **Published WJO** details are used for built-in seed records. If the site admin has locally edited a school, those locally edited details are preserved.
- Each displayed school record retains the source's county and the comparison date.
- The online Zoom listing is explicitly labelled an online session, not a physical venue.
- Menu, member tools, logos, images, school names, postcode details, and the guided route from V77 are preserved.

## Verification
```
python3 tools/rebuild_v78.py
npm install --no-save --ignore-scripts jsdom@30.1.2
node tools/test_v78.cjs dist/index.html
```
