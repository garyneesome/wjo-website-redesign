# V88 – Instructor portrait improvements

## Fix
The instructor directory used a forced 16:10 landscape crop on mobile (and 4:3 on desktop). This cut off parts of instructor heads in several real portraits.

- Portrait images are now shown at their original aspect ratio and use `object-fit: contain`.
- Wider media columns on desktop give more space to the instructor.
- Mobile profile cards show the full, larger image above each biography.
- The same non-cropping treatment applies to instructor cards on school pages and smaller instructor grids.
- This is a **CSS-only photographic presentation fix**. No portrait artwork is regenerated, stretched, relabelled or replaced.

## QA
- Browser tests open the full offline build at 390px and 1440px viewports.
- Tests verify image loads, aspect ratio matches its natural ratio, CSS uses `object-fit: contain`, and no horizontal overflow.
- Earlier V87 homepage, Resources, Brown 2nd Tag, Student Code, and Committee Hub demo-login fixes are retained.

## Downloads
- `WJO_V88_SINGLE_FILE_DEMO.html`
- `WJO_V88_DOWNLOAD.zip`
