# V83 implementation and verification checklist

## Implemented in source
- V81 family-first homepage and approved image crops retained.
- V82 article-body importer retained; fetches original WJO WordPress post content at build time.
- V83 first-visit guide, linked to existing school records and published timetables.
- Duplicate instructor biographies suppressed rather than incorrectly attributed.
- Mobile typography, keyboard focus and reduced-motion improvements.

## Required acceptance checks before customer sign-off
1. Confirm V83 GitHub Action succeeds and HTML/ZIP exist. Verify offline opening on Android.
2. Open each published WJO news item and compare full text, images, headings, dates and embedded media with its original WJO article. The current importer uses WordPress REST posts; articles published as another content type may need a separate importer. Do not label unverified items as complete.
3. Check every instructor against an approved original biography and photograph; replace any pending placeholder with verified individual copy.
4. Compare all school timetables, addresses and venue photographs with the live directory, including Market Harborough.
5. Review all primary and secondary mobile navigation routes; confirm no sticky controls obscure content.
6. Verify programme ages, belt order, grading explanations, policies and safeguarding contact information with WJO.
7. Test admin create/edit/delete/import/export, persistence and rollback. Do not deploy to a live site without authentication and backend storage.
8. Confirm links, assets, contrast, focus order, alt text, and no accidental links back to the original site.

This is a demonstration website, not a live booking or payments system. Published class times may change.
