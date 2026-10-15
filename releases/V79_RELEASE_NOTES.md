# WJO V79 — Simplified menu, WJO people and family videos, and a shop illustration

## Improvements
- **Navigation:** Replaces several stacked menu layers with one concise main menu: Home, Start, Find a Class, About Jado, Our People, Events, Shop, My Jado, Safeguarding, Contact and **Explore all WJO pages**. The complete seven-county/individual-school directory is still available as a collapsible part of Find a Class, rather than occupying the whole initial menu.
- **Homepage:** Removes the repeated dark-green “Your Next Steps” box with another Find a School link. The interactive guided class chooser, full first-visit guidance and four-item mobile shortcut bar remain.
- **WJO Committee:** Restores the original committee's visual leadership page at `#committee`, with the existing founder, COO/safeguarding lead, Guardian and grading examiner cards. Adds an obvious route from the Our People menu and Explore index. The committee-admin editor at `#admin` is kept separate.
- **Instructors:** More generous, full-width images on mobile; original verified instructor portraits are kept. When an individual portrait has not been supplied, cards now use one of the **five original Jado animal images** as the image fallback, never a WJO logo or a photograph falsely identified as a portrait.
- **Testimonials:** Billy’s Story, A Parent’s View and Family Testimonial again use visual cards. Their original YouTube thumbnail images are archived into the portable file where accessible; otherwise the page uses approved local training photographs as fallback. Each card opens the known official YouTube story URL directly to avoid local iframe error 153.
- **AI shop visual:** A genuine AI-generated **illustration** showing adults wearing Jado-inspired black/red martial-arts uniforms in a dojo is included as a *labelled example* on the shop page and alongside uniform gallery photos. It is not an exact product representation. **All official product photos remain primary and no AI illustration is claimed to depict exact stock.**

## Still needed before production
The shop contains 31 items. Precisely correct AI front/side/back simulations for every item are **not complete**. Accurate additional-angle generation requires product-specific references, especially the true badges, stitching, rear construction, material and components in sparring protection. V79 introduces one generated uniform lifestyle illustration for review; the existing certified Jado Online alternative photographs remain separate. Request approval or additional original-angle references before treating AI art as merchandising content.

Current user-provided photos, black/red WJO gi design, original WJO circular globe logo, seven-county corrected schedules, school details and safeguarding pages remain.

## Test
Build from GitHub: `python3 tools/rebuild_v79.py` (Pillow needed).
Run browser checks: `npm install --no-save --ignore-scripts jsdom@30.1.2 && node tools/test_v79.cjs dist/index.html`.
Deliverables: `WJO_V79_SINGLE_FILE_DEMO.html` and `WJO_V79_DOWNLOAD.zip`.
