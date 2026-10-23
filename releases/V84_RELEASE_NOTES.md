# V84 — Grading Resources and the Jado Student Code

## What is in the downloadable V84 demo
- A Resources landing page with 12 individually named, colour-coded grading syllabus pages.
- Each syllabus is an accessible HTML transcription based on the supplied original WJO pages, and is embedded in the single-file demo for offline use.
- Print / Save as PDF and standalone HTML download for each syllabus.
- Links from the main and mobile navigation, and from the grading pathway.
- The RACHEL code — Respect, Attitude, Commitment, Honesty, Etiquette, Loyalty — in Resources and About Jado.
- The prior V83 guided journey, V81 family homepage, and V82 news importer remain part of the build.

## Outstanding artwork integration
The images generated and approved in the ChatGPT conversation were not available to the GitHub Actions builder as binary files at publication time. V84 presents grade-coloured *typeset HTML sheets*, not the exact approved PNG image assets. Do **not** represent the images as uploaded to GitHub. The images may be transferred into `assets/grading/v84/` and integrated in a later build when the original binaries are available to the repository.

## Content review
The original photographed WJO sheets are authoritative. Digital transcriptions may have errors and must be proofread against the originals by an authorised WJO instructor before use as an official assessment syllabus. The website includes a current-syllabus confirmation note.

## Build
`python tools/rebuild_v84.py` — requires prior build scripts and their dependencies.
`WJO_V84_SINGLE_FILE_DEMO.html` and `WJO_V84_DOWNLOAD.zip` are published by the V84 workflow.
