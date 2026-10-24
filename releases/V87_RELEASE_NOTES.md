# WJO V87 — Mobile CTA and Committee Hub login repairs

## Main changes
- Homepage CTA redesigned as a prominent cream button on the dark hero, with a red directional icon.
- On mobile, the hero headline and primary **Find my Jado class** button appear **before** the photograph. Supporting copy and reassurance follow the photograph.
- Original WJO photography and family-oriented content are preserved.
- Mobile CTA width and spacing optimised for narrow screens; first action no longer hidden below the hero photograph.
- The existing Committee Hub demo login accepts the original demo-only credentials, including when offline Android browsers disallow access to Web Storage.
- Adds fallback in-memory authentication for this single-page demonstration when local/session storage is blocked, while retaining the original admin routes, login UI, and editor tools.
- Invalid credentials remain rejected; logout clears the demo state.
- Clarifies that the offline HTML demo does not provide production-grade authentication or guaranteed persistent local edits.

## Regression coverage
- `node tests/v87-smoke.js`: simulates storage permission failures, wrong credentials, successful demo login, logout and homepage copy.
- `python tests/v87-browser.py`: boots the full portable demo in Chromium, checks mobile CTA position, photo loading, horizontal overflow, authentic login → existing Committee Hub → logout, and captures mobile/desktop preview screenshots.
- V85 Brown Belt 2nd Tag resources, V84 Student Code and grading sheets, earlier full news import and other pages are preserved.

## Download files
- `WJO_V87_SINGLE_FILE_DEMO.html`
- `WJO_V87_DOWNLOAD.zip`
- `assets/previews/wjo-v87-mobile.jpg`
- `assets/previews/wjo-v87-desktop.jpg`

This offline mockup must not be published as a live privileged admin interface without proper server-side authentication and authorisation. The browser-storage fallback is for demonstration use only.
