# WJO Website Redesign

Interactive front-end concept for the **World Jado Kuin Do Organisation** website.

## Current version

**V67**

V67 builds on the V66 responsive website and front-end CMS baseline, with a venue-image audit across the school/location data. Missing photographs have been added where the venue could be confidently verified, and the incorrect placeholder images for Gateway School and The Barn Houlton have been replaced.

The public venue pages, admin/CMS image previews and School Locations media library now use the same venue-image mapping.

Wollaston Village Hall at **52 High Street, Wollaston, NN29 7QQ** deliberately remains on the WJO crest fallback because searches repeatedly surfaced a different Wollaston Village Hall near Stourbridge. V67 does not substitute an unverified image.

## Run V67

For the self-contained demo:

```bash
python tools/rebuild_v67.py
```

That creates:

```
WJO_V67_SINGLE_FILE_DEMO.html
```

Then open that HTML file in a browser.

You can also serve the repository over HTTP and open `index.html`:

```bash
python -m http.server
```

V67 is stored as a small versioned patch over the complete V66 baseline, avoiding another duplicate 30+ MB source set while still reproducing the exact V67 single-file build.

## V67 baseline

- Everything from the V66 responsive/public/CMS baseline
- Venue image audit across all school locations
- New verified imagery for previously blank venue records
- Correct Gateway School and The Barn Houlton imagery
- Admin venue previews synchronised with public venue pages
- New venue sources visible in the Media Library under **School Locations**
- Image provenance documented in `releases/V67_VENUE_IMAGE_SOURCES.md`
- Existing approved Jado crest, gi imagery and plain Black Belt presentation retained

**Current baseline: V67**
