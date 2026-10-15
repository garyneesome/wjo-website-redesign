# World Jado Kuin Do Organisation — Website redesign

## Latest test version: V78

**Download after successful build:**
- [V78 complete ZIP — recommended for Android](WJO_V78_DOWNLOAD.zip)
- [V78 single-file HTML](WJO_V78_SINGLE_FILE_DEMO.html)
- [V78 changes and original WJO timetable evidence](releases/V78_RELEASE_NOTES.md)

All seven WJO regional timetable pages were reviewed on **15 October 2026**. V78 now includes the published days, starting **and finishing times**, age/class labels and levels for every listed session: **80 entries across 31 school or online records**. That includes 2 Market Harborough sessions displayed against both listed halls with **an explicit venue-to-be-confirmed warning** because the live county page does not name the exact hall. The full WJO-published timetable is also available inside each county page.

V78 retains V77's original product photographs, square Five Animals cards, guided first-class pathway and mobile improvements, family-friendly information, real venue images, and corrected WJO logo.

**Please note:** These are the class times *published on the original WJO website*, not live availability. Ask the instructor to verify the current session before travelling. The demo does not send enquiries or take payments.

Rebuild: `python3 tools/rebuild_v78.py` (requires Pillow).
Browser checks: `node tools/test_v78.cjs dist/index.html` (requires jsdom).

### Previous releases
- [V77 notes](releases/V77_RELEASE_NOTES.md)
- [V76 notes](releases/V76_RELEASE_NOTES.md)
- [V75 notes](releases/V75_RELEASE_NOTES.md)
