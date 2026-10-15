# WJO V77 — clearer, cleaner guided website

## Changes
- **No duplicated homepage benefit panels**: keeps the welcome, guided class chooser, first-visit information, family reassurance, five animals, stories and contact journey. Removed repeated V73 welcome/benefit tiles and the second repeated Brackley story photo panel.
- **No numbered marketing tiles** on the homepage, guide or shop categories. The route still flows step by step with names rather than arbitrary numbering.
- **Animals are square/rectangular rather than arch-shaped**; mobile uses a balanced two-column grid with an intentional wide final Dragon card.
- **Button contrast fix**: the pale “Explore the animal awards” action now has dark, clearly visible wording.
- **Category photo head crop fix**: official imagery is fitted inside the tile rather than zoomed behind it; overlay and copy remain legible.
- **Real multiple photos, not resized duplicate photos**: removes the V76 close/detail-crop gallery, attempts to archive alternative official Jado Online photographs when they actually exist, and offers a thumbnail selector. Products with just one verified official image show that image and no artificial duplicates. All verified alternative photos are embedded in the downloadable demo.
- Preserves logo, Grand Master Ogden title, school finder, venue photos, menu, safeguarding, shop prices, guided first class and My Jado.

## Shop images: important distinction
The AI presentation sample created during design exploration illustrates how multi-angle photography **could** look, but exact badges, construction and rear details of physical stock are not verifiable solely from one front photo. This release uses *actual source photos* where available rather than putting potentially inaccurate generated merchandise into purchase screens. Alternative views are genuine only when downloaded from the official Jado supplier CDN and validated as decodable images.

## Build
```bash
python3 tools/rebuild_v77.py
npm install --no-save --ignore-scripts jsdom@30.1.2
node tools/test_v77.cjs dist/index.html
```
Requires Pillow. The build attempts official alternate image URLs with a short timeout; network restrictions leave the primary image untouched. Release files: `WJO_V77_SINGLE_FILE_DEMO.html` and `WJO_V77_DOWNLOAD.zip`. No booking or checkout functionality is activated by the demo.
