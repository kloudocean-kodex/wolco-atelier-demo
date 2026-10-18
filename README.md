# WOLCO Atelier

A warm editorial design demonstration for WOLCO Homes. This is an independent static project, separate from the existing `wolco-rebirth` deployment and the original downloaded HTML.

## Run locally

Node.js 20 or newer is the only requirement. There are no npm dependencies and no third-party runtime requests.

```sh
npm run dev
# http://localhost:4174

npm run verify
npm run build
npm run preview
```

The build writes `dist/`. The preview command serves that folder on port 4174; stop the development server first if using the same port. Override `PORT` to run elsewhere.

## Cloudflare Pages

- Repository: `kloudocean-kodex/wolco-atelier-demo`
- Framework preset: None
- Build command: `npm run build` (run `npm run verify` before committing)
- Build output directory: `dist`
- Node.js: 20 or newer
- Environment variables, secrets, database and payment accounts: none
- Keep this demonstration separate from the existing WOLCO Pages project and production domain.

The shipped `robots.txt`, HTML meta tags and Cloudflare response headers deliberately exclude the demonstration from indexing. Headers also restrict scripts, media, fonts and images to local assets. The production-domain launch is a separate decision from publishing these demos.

## Visitor interactions

- Anchor navigation, keyboard skip link and a native modal mobile navigation.
- Four concept studies with category filters, detail galleries, arrow-key/touch navigation and independent saved selections.
- Three material palettes with accessible keyboard tabs and one saved palette.
- Four interactive spaces and independent saved priorities.
- A three-photo Cookes Road project gallery.
- Five native expandable journey sections and five frequently asked questions.
- An explicitly triggered, silent 38.42-second architectural film edited from four genuine generated clips, with native playback controls, deferred source loading and pause on modal close.
- A validated personal brief, editable review, plain-text download and a manually sent email draft. Nothing is represented as automatically submitted.
- Privacy and demonstration-information dialogs, Escape dismissal, native focus containment and focus return.

Personal details and selections stay in page memory and clear on reload. This demonstration has no browser-storage persistence, analytics, automatic enquiry delivery or external scripts. Source-derived contact details are 1300 163 666 and wolcohomes@gmail.com. They were present in the supplied HTML and prior original-site inventory; current original-domain access was unavailable during this build.

## Media and rights

The original red/yellow WOLCO logo is unchanged. Four new generated visualisations and the architectural film are labelled as concepts. Cookes Road uses three supplied WOLCO project photos. Font OFL licences ship in `public/fonts`.

See `docs/AUDIT.md`, `docs/PROVENANCE.md` and the machine-readable source manifests. Do not describe generated studies as approved designs, completed WOLCO homes, studio interiors, confirmed products, buildable plans, quotations or guaranteed outcomes.

## Verification scope

`npm run verify` checks local asset existence, responsive variants, internal anchors, IDs, image alternate text/dimensions, demonstration indexing rules and absence of unexpected external runtime links, inline event handlers, autoplay, storage or network submission APIs. It does not replace browser or visual QA. Browser results and actual deployment evidence are recorded separately by the release owner.
