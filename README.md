# World Jado Kuin Do Organisation — Website redesign

## Latest build: V80

Download the fully self-contained test website:
- [V80 ZIP — recommended for Android](WJO_V80_DOWNLOAD.zip)
- [V80 single-file HTML](WJO_V80_SINGLE_FILE_DEMO.html)
- [V80 verified venue corrections and release notes](releases/V80_RELEASE_NOTES.md)

V80 builds on V79's shorter menus, original video testimonials and carefully labelled AI shop illustration. The complete WJO published seven-region timetables and the guided new-student journey are retained.

### Venue corrections
- Southam is now **Everyone Active Southam, Welsh Road West, CV47 0JW**, consistent with the original WJO directory and Warwickshire timetable.
- The Sunart Centre already has the correct Monday 18:00–18:50 adult class time through the V78 importer.
- Where legacy venue-image mappings show other buildings or unverified photographs, the real WJO badge is now used as the placeholder until an approved photo is provided. Existing verified venue pictures remain.

These are **published WJO timetables**, not live availability; students should confirm classes and venues before travelling. Demo enquiries and payments are not connected.

Build: `python3 tools/rebuild_v80.py`; test: `node tools/test_v80.cjs dist/index.html` (requires jsdom and Pillow).

[View V79 improvements](releases/V79_RELEASE_NOTES.md) · [View V78 timetable reconciliation](releases/V78_RELEASE_NOTES.md)
