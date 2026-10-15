# World Jado Kuin Do Organisation — Website redesign

## Latest version: V75 (family-focused experience)

**Test the complete demo**
- [V75 ZIP — recommended for Android](WJO_V75_DOWNLOAD.zip)
- [V75 single-file HTML](WJO_V75_SINGLE_FILE_DEMO.html)
- [V75 improvements and full original-WJO-site coverage audit](releases/V75_RELEASE_NOTES.md)

V75 **keeps the guided V73–V74 school chooser** but improves the World Jado branding and warm family welcome. It uses the supplied WJO globe in header/footer/menu, makes interactive cards look clickable, brings the WJO FAQ, community news and Tai Chi into the demo, and links to existing safeguarding and student resources.

V75 is an **offline browser preview**: class enquiries do not send messages, checkout takes no payments and member login is not connected. The old separately hosted preview may still serve an earlier version.

Build: python3 tools/rebuild_v75.py

Browser tests: npm install --no-save --ignore-scripts jsdom@30.1.2 && node tools/test_v75.cjs

Source: source/v75/experience.js and source/v75/experience.css; earlier version sources are retained.

### V74 foundation preserved

V74 restored real WJO history, county and venue menus, approved class images, teaching biographies and direct YouTube video links. [V74 release notes](releases/V74_RELEASE_NOTES.md).

### V73 foundation preserved

V73 introduced the practical three-step guide, beginner routes and fixed four-item mobile bar, with the entire V72 school and CMS dataset retained.

### V72 foundation preserved

V72 introduced the complete guided class journey, venue visit planning, remembered My Jado school, internal member resources and animal pages. Sample enquiries and checkout do not transmit anything or take payment.

Build: `python3 tools/rebuild_v72.py`. Source: `source/v72/`. Release notes: `releases/V72_RELEASE_NOTES.md`.

### V71 foundation preserved

V71 builds on the real, Mark-approved Brackley club photographs and V70's family homepage. It adds a more documentary photo treatment, a quick-entry programme strip, a three-step interactive chooser without repeated photography, and responsive presentation improvements. Original belts, logo, gi, animals, programme routes, school finder, venues and admin/CMS are preserved.

**Preview the latest work:** Open `preview.html` through an HTML preview service, or serve `index.html` over HTTP. `preview.html` fetches V66–V71 source files from this repository.

Editable V71 design files: `source/v71/refinements.js`, `source/v71/refinements.css`. Compiled patch: `source/v71/patch.json`.
Release notes: `releases/V71_RELEASE_NOTES.txt`.

### V70 family experience preserved

V70 introduces a warmer family homepage, a working three-choice programme guide, first-visit guidance, real Brackley photo stories and the Five Animals. Existing class information, school finder, belt meanings, events and admin remain accessible.

Edit `source/v70/family.js` and `source/v70/family.css`, then run `python tools/prepare_v70_patch.py` before rebuilding.

Release details and content sources: `releases/V70_RELEASE_NOTES.txt`.

### V69 photography preserved

V69 adds three approved real photographs from the Brackley club gallery. The homepage, Confident Kidz, teens/adults and programme overview now show real celebrations and partner practice. The responsive hero separates the headline from the photograph so faces remain visible.

Photo sources and approval: `releases/V69_IMAGE_SOURCES.md`.
Release details: `releases/V69_RELEASE_NOTES.txt`.

### V68 venue update preserved

V68 preserves the complete V67 venue-image audit and replaces the Brackley Leisure Centre photograph with the specific image supplied and verified by the project owner on 11 October 2026.

The same Brackley photograph is linked in the Find a School public venue listings, saved school details, admin/CMS school previews, and the School Locations media library. Previously saved Brackley placeholder photos are refreshed without overwriting the other schools.

- Photo: `assets/venues/brackley-leisure-centre.webp` (1536 × 864, WebP)
- Venue record ID: `brackley-leisure`
- Source: user-supplied photograph
- Photo attribution and change: `releases/V68_RELEASE_NOTES.txt`

### Deanshanger Primary School venue photograph

The owner-supplied, full-resolution 1536 × 696 photograph was added on 13 October 2026 at `assets/venues/deanshanger-primary-school.jpg` (original JPEG, no resizing). The venue entry ID is `deanshanger`. Both browser preview loaders now point to this GitHub-hosted asset rather than the previous external school website URL. `tools/rebuild_v71.py` embeds the photo in future offline single-file rebuilds. The already-committed V71 single-file HTML predates this venue-image update and must be regenerated before it will include the new photograph.

### Earls Barton Youth Club venue photograph

Owner-supplied photograph (13 October 2026) saved unchanged as `assets/venues/earls-barton-youth-club.jpg` (1536 × 864, JPEG). The `earls-youth` school record uses this image instead of the previous third-party URL. Both preview loaders load the GitHub-hosted image and offline builds embed it in the single HTML file. The existing committed standalone V71 HTML predates this photograph and must be rebuilt to reflect the change.

### Wollaston Village Hall and Danesholme Community Centre photos

The owner-supplied original JPEG photographs were added on 13 October 2026. Wollaston Village Hall uses `assets/venues/wollaston-village-hall.jpg` (1536 × 1020) for school record `wollaston`, replacing the WJO crest fallback. Danesholme Community Centre uses `assets/venues/danesholme-community-centre.jpg` (1536 × 1037) for school record `danesholme`, replacing the earlier third-party image. Original image bytes are retained; the Wollaston upload had a misleading .webp filename but is actually JPEG. Website preview loaders and the standalone rebuild code now use these images in public listings, the school CMS and built-in venue media. Already compiled V71 standalone HTML needs rebuilding to include them.

## Run V71

For a self-contained demo with the Brackley photo embedded:

```bash
python tools/rebuild_v71.py
```

This creates `WJO_V71_SINGLE_FILE_DEMO.html`. Open it in a browser.

To use the repository's in-browser loader:

```bash
python -m http.server
```

Then open `index.html`. The loader assembles the V66 source with the V67 through V71 versioned patches. GitHub Pages can serve the same loader and hosted venue photo.

## Previous work preserved

- All V66 responsive site and front-end CMS features
- The V67 audited venue photograph mapping and media library updates
- Approved Jado crest, gi imagery and plain black belt
- Fallback WJO crest at Wollaston Village Hall, 52 High Street, Wollaston NN29 7QQ, until a correct venue photo is verified
- Previously identified address discrepancies remain unchanged pending review

**Current release: V72**
