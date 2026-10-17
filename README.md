# World Jado Kuin Do Organisation — Website redesign

## Latest demo: V81 — A place to belong. A path to grow.

V81 uses the familiar guided class journey but makes the homepage simpler, more welcoming and more focused on the Jado family.

- **[V81 ZIP download — recommended for Android](WJO_V81_DOWNLOAD.zip)**
- **[V81 single-file HTML download](WJO_V81_SINGLE_FILE_DEMO.html)**
- **[V81 release details](releases/V81_RELEASE_NOTES.md)**

The homepage now offers one primary action, **Find my Jado class**, which opens the working guided age-and-venue chooser. The programme cards are larger, the colour scheme matches the established WJO red/black/cream branding, and the progression message clearly explains that everyone develops at their own pace.

Four genuine photographs cropped from the user-provided “We’re so proud!” Jado collage are embedded into the standalone HTML and shown once each. Instructor profiles have been revised to avoid repeating the same opening biography when the expanded text is shown.

The seven-county school menu, WJO-published class timetables, WJO logo, venue photographs, events, safeguarding, WJO shop and member resources are preserved from V80.

**This is a standalone preview:** enquiry forms do not send messages and checkout is not connected. Published class times should be confirmed by an instructor before attending.

**Rebuild:** `python3 tools/rebuild_v81.py`

**Test:** `npm install --no-save --ignore-scripts jsdom@30.1.2 && node tools/test_v81.cjs dist/index.html`

Previous: [V80](releases/V80_RELEASE_NOTES.md) · [V79](releases/V79_RELEASE_NOTES.md) · [V78](releases/V78_RELEASE_NOTES.md).
