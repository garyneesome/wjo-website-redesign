# WJO V76 — original brand restored and shop gallery improvements

## What changed
- Restores **Grand Master Jake D. Ogden** throughout public copy without doubling the title when it is already correct.
- Removes public-facing research and history-verification notes while preserving real content and the preview-only enquiry disclosure.
- Keeps the exact existing WORLD / WJO / JADO logo design. The build converts only the connected off-white background outside the logo into transparency; typography, globe and fighters are left untouched. All copies of the brand, including header, footer and content sections, use the same original artwork.
- Fixes a cramped two-column layout on narrow phones: the Jado overview emblem now sits above a full-width, readable heading and text.
- Uses the original **Jado Online photo on all 31 product cards and product pages**.
- Adds an interactive original-photo thumbnail gallery on product pages, with **official photo**, **closer look**, and **detail crop** views, without claiming that a zoomed crop is another camera angle.
- Modernises the shop cards, separates clear `View photos & sizes` and `Add to basket` actions, and discourages quick-add for multi-size products until a size has been chosen.
- Adds a short first-time-buyer help panel advising students to confirm uniform and protection choices with their school.
- Preserves the V73/V74 guided join experience, real venues, class photographs, member pages and contact guidance.

## Honest image limitations and next steps
The original catalogue has 31 items. Some official Jado Online products (such as Gi Adults) already show alternative product photos at the supplier. Those images are not yet reliably available as separate verified or archived file assets in this GitHub build. **Do not create fictitious rear/side product photographs or falsely label zoomed images as different angles.** The current secondary images are accurate enlargements from the original photographs, and the labels say so.

An earlier AI illustrative collage of the adult full sparring bundle was not included as an authoritative product image, because logos, components and precise construction cannot be verified against actual stock. The next enhancement should ingest the supplier's authentic alternative-view photographs or approved exact-product reference photos, or generate clearly marked illustrations only after item-by-item approval.

The V76 HTML is still a **website preview**; enquiries are not sent and checkout is not connected. Prices and stock should be reconfirmed against the official Jado shop before public launch.

## Tests
- Python build removes the white square background and verifies the centre graphic is unchanged.
- JSDOM browser regression checks verify the logo appears across header/footer/about, all 31 products are present, the thumbnail controls respond, the original shop photograph remains primary, internal navigation works, and the title is Grand Master.
- Reproducible workflow: `.github/workflows/build-v76-demo.yml`.
- Build: `python3 tools/rebuild_v76.py` with Pillow installed.
