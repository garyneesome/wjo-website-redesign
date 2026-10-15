# World Jado Kuin Do Organisation — website redesign

## New version: V79

- [Complete V79 ZIP — recommended for mobile](WJO_V79_DOWNLOAD.zip)
- [V79 single-file offline HTML](WJO_V79_SINGLE_FILE_DEMO.html)
- [V79 release notes](releases/V79_RELEASE_NOTES.md)

**V79** focuses on making WJO easier to navigate: one simple mobile menu with expandable county/school entries, a clearly accessible **WJO Committee**, a larger gallery of people with animal imagery when a genuine portrait is missing, and photographic previews of the three original WJO testimonial videos. The repeated homepage guidance card has been removed while the age-and-location guided first-class journey remains.

The shop also includes **one labelled AI-generated uniform-wearing illustration for review**. This is an illustration, not a product-specific side or rear photograph; the 31 official product pictures and any confirmed Jado Online alternative photos remain the authoritative shopping images.

All seven regions' published timetables and correct WJO globe logo from V78 remain. Times are checked against the live WJO source on 15 October 2026, but users should confirm them with their school.

A local demo only: no emails, booking requests or payments are submitted.

Build: `python3 tools/rebuild_v79.py`; checks: `node tools/test_v79.cjs dist/index.html` (Pillow and jsdom needed).

[See V78 timetable release](releases/V78_RELEASE_NOTES.md).
