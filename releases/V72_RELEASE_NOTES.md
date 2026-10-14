# V72 — a complete guided Jado journey

## Test

Private hosted demo: https://jado-kuin-do-demo.peachypark2.chatgpt.site

Start Here → My child / Myself / Our family → ages and town → matching schools → venue and session → sample enquiry → confirmation → saved school in My Jado.

## Changes

- Four-step guided journey; family age matching identifies full and partial matches, including local session age ranges.
- A browse-all school finder with retained town, programme and day filters.
- Complete venue pages with supplied photos, session-specific enquiries, relevant instructor profiles and arrival guidance. Unknown details are explicitly unconfirmed.
- My Jado saves only a school ID locally and offers the timetable, relevant events/news, venue, My Training and member shortcuts.
- Clear Start Here / Find a Class / About Jado / Events / Members navigation. Separate committee access, breadcrumbs, mobile quick actions, skip link, focus handling and reduced motion.
- Five internal animal-award pages, progress beyond belts, first-visit guide, downloadable checklist and on-page community videos.
- Public original-site links removed or mapped to their internal destination. Legacy member resource links now open the internal resource hub.
- Enquiries validate and demonstrate confirmation without sending messages or bookings. Shop checkout has a sample completion screen without payment collection.
- Entrance, parking/access and entrance-photo fields in the school editor. Saving arrival guidance preserves existing session data.
- Latest supplied Brackley, Deanshanger, Earls Barton, Danesholme and Wollaston venue photos embedded.
- Existing accessible external images archived into the build; malformed legacy image payloads repaired using approved embedded assets.

## Verification and limits

DOM-based functional checks cover child/family matching, validation, session carry-over, saved school, retained filters, menu controls, route recovery and internal links. Public pages were checked for JavaScript errors, broken hash destinations and original-site outbound links. Bundled images were decoded for integrity.

No visual browser test was available in this environment. Please review phone/tablet/desktop layout using the test link.

Videos play within the demo but need an internet connection. Real member login, restricted student documents, live booking and payments are not connected; the interface states this explicitly. Venue parking/entrance and instructor-session assignments still need local confirmation. Bushfield and Towcester use the WJO crest with a photograph-unavailable note where inherited imagery could not be recovered.

The repo remains the source of truth. Build with `python3 tools/rebuild_v72.py`. Hosted output is `dist/`; the complete portable artifact is `WJO_V72_SINGLE_FILE_DEMO.html`.
