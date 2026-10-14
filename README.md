# World Jado Kuin Do Organisation — website redesign

## Latest release: V74

The portable website is built from the latest source, with approved class photography and the **supplied World WJO JADO logo** used for page branding and fallback images.

**Downloads (after the successful GitHub Actions build):**
- [Complete V74 ZIP — recommended for mobile](WJO_V74_DOWNLOAD.zip)
- [Complete V74 single-file HTML](WJO_V74_SINGLE_FILE_DEMO.html)
- [Release notes](releases/V74_RELEASE_NOTES.md)

V74 keeps the popular V73 guided class finder and its mobile quick-access menu. It adds the World Jado organisation background, original factual Jado explanation, accessible county-by-county venue menu, instructor photo panels, direct YouTube story links, corrected news imagery and more natural enquiry wording. The downloaded HTML is a local preview, **not** a booking or payment service.

**Source of truth:** `source/v74/experience.js`, `source/v74/experience.css`, `source/v74/world-wjo-logo.b64` (approved WJO artwork), and `tools/rebuild_v74.py`.

Build: `python3 tools/rebuild_v74.py` (standard library).
Test: `npm install --no-save jsdom@30.1.2 && node tools/test_v74.cjs`.

The separate private hosted website was created for V72 and is **not** automatically deployed from this repository. Use the versioned downloads to evaluate V74.

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
