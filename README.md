# WJO Website Redesign

Interactive front-end concept for the **World Jado Kuin Do Organisation** website.

## Current version

**V66**

This repository is now the source-control home for the WJO redesign mockup.

The V66 baseline includes the responsive public website, training programmes, school finder, instructors and committee, events/calendar, news, safeguarding content, shop mockups, student areas and the front-end committee/admin CMS concept.

## Run V66

For the easiest local copy of the original self-contained demo:

```bash
python tools/rebuild_v66.py
```

That creates:

```
WJO_V66_SINGLE_FILE_DEMO.html
```

Then open that HTML file in a browser.

You can also serve the repository over HTTP and open `index.html`:

```bash
python -m http.server
```

Then browse to the local address shown by Python.

The repository stores the large V66 single-file source in ordered chunks under `source/v66/`. The manifest and rebuild script reassemble those chunks into the original standalone HTML mockup.

## V66 baseline

- Corrected global JADO / KUIN / DO crest
- Corrected opening Grand Master Jake Ogden popup logo
- Corrected favicon/branding
- Plain black Black Belt presentation
- Approved varied Jado training image set
- Responsive/mobile layouts
- Interactive front-end admin/CMS concept

Future releases should be committed here so approved content, images and functionality remain under version control.

**Current baseline: V66**
