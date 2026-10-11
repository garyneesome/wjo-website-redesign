# WJO Website Redesign

Interactive front-end concept for the **World Jado Kuin Do Organisation** website.

## Current version

**V68**

V68 preserves the complete V67 venue-image audit and replaces the Brackley Leisure Centre photograph with the specific image supplied and verified by the project owner on 11 October 2026.

The same Brackley photograph is linked in the Find a School public venue listings, saved school details, admin/CMS school previews, and the School Locations media library. Previously saved Brackley placeholder photos are refreshed without overwriting the other schools.

- Photo: `assets/venues/brackley-leisure-centre.webp` (1536 × 864, WebP)
- Venue record ID: `brackley-leisure`
- Source: user-supplied photograph
- Photo attribution and change: `releases/V68_RELEASE_NOTES.txt`

## Run V68

For a self-contained demo with the Brackley photo embedded:

```bash
python tools/rebuild_v68.py
```

This creates `WJO_V68_SINGLE_FILE_DEMO.html`. Open it in a browser.

To use the repository's in-browser loader:

```bash
python -m http.server
```

Then open `index.html`. The loader assembles the V66 source with the V67 and V68 versioned patches. GitHub Pages can serve the same loader and hosted venue photo.

## Previous work preserved

- All V66 responsive site and front-end CMS features
- The V67 audited venue photograph mapping and media library updates
- Approved Jado crest, gi imagery and plain black belt
- Fallback WJO crest at Wollaston Village Hall, 52 High Street, Wollaston NN29 7QQ, until a correct venue photo is verified
- Previously identified address discrepancies remain unchanged pending review

**Current baseline: V68**
