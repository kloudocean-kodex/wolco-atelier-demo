# Atelier source audit and refinement

Historical baseline report. Its film descriptions, asset counts and earlier validation apply to the pre-exclusive-media release. Current asset classifications and hashes are in `CURRENT_MEDIA.md` and `exclusive-media-manifest.json`; new local checks are recorded separately.

Source reviewed: the supplied `wolco_homes_rebirth_live_preview (2).html`, retained unchanged in the private source archive. This implementation is independently deployable.

| Source finding | Refinement |
| --- | --- |
| Runtime Tailwind CDN, GSAP/ScrollTrigger and unpinned Lucide | Dependency-free HTML, CSS and JavaScript; native scrolling and modal dialogs |
| Four remote font families with competing typographic roles | Two locally hosted families: Instrument Serif and Hanken Grotesk; regular/italic editorial serif and a consistent UI scale |
| Synthetic atmospheric sound and numerous utility/marketing overlays | No sound, floating prompt tools, fake online indicators or ornamental status cards |
| Third-party real-estate film and remote stock images presented as WOLCO | New, visibly labelled generated concept collection; a separate supplied-photo project story |
| Replacement text/logo treatment | Unchanged original red WOLCO logo with its yellow brand mark and original proportions |
| Unverified named home catalogue, floor areas, lot fit and prices | Four expressly conceptual studies, meaningful descriptive ideas and no invented property specifications |
| Unsupported fixed-price estimator and guaranteed completion times | A personal design brief with saved inspiration, priorities and no simulated quotation |
| Interactive pseudo-CAD with implied architectural detail | An illustrative four-space concept diagram with explicit no-scale status and useful brief questions |
| Dense design filters and unclear repeated calls to action | One category filter; a consistent explore → collect → consider → brief flow |
| Product-specific materials and specification claims | Three clearly hypothetical colour/texture palettes; no product, inclusion or availability promises |
| Journey containing assumed fees, contracts and project promises | Five practical conversations with no asserted commercial process, charges or deadlines |
| Showreel prompt-copy controls | A 38.42-second four-chapter generated architectural film with controls, deferred download and no autoplay |
| Clickable divs and generic overlay close controls | Native buttons, links, details, tabs and modal dialogs with keyboard names and focus behaviour |
| Apparent successful form submission without delivery | Validated editable review, text download and a deliberate email-app draft action; no fake sent state |
| Generic privacy/terms copy | Accurate explanation of this particular static demonstration and its data handling |
| Desktop structures squeezed into mobile widths | Dedicated single-column composition, touch controls, mobile navigation, reflowed forms and galleries |

## Design decisions

The sequence moves from arrival to the feeling of home, architectural ideas, tactile material exploration, personal living priorities, real project photography and a useful next action. Ivory, paper and warm stone form the base; espresso anchors the material chapter. The source WOLCO identity remains red/yellow. Restrained motion leaves the imagery and typography in charge.

Image dimensions are explicit, generated sources have 640/960/1600px WebP variants, the hero is present directly in HTML with high fetch priority, and the 5.77MB film is not requested until the visitor opens it. The Cookes gallery defers its additional photographs until opened.

## Code review corrections

- Corrected malformed custom-home option markup found during source review.
- Restricted material-tab queries to the tablist; a dynamic data attribute on the panel must not become an extra tab.
- Replaced every original initial-image URL with the new generated asset before browser loading, preventing an old/new double request.
- Changed the saved-study counter to say studies, because palette and room priorities have separate states.
- Removed unused inherited asset files and made the static build deterministic.
- Preserved each image's HTML responsive-source sizes during startup, including the full-width film-banner image.
- Integrated the genuine four-chapter Arrival → Touch → Gather → Dwell film and removed superseded public video derivatives.

## Verification recorded at implementation handoff

- `node --check src/main.js`: pass.
- `npm run verify`: pass, 26 local references, 23 internal anchor links, 73 unique IDs and five dialogs.
- `npm run build`: pass, static `dist/` output.
- Media specialist and release owner: all four generated images and clip sequences inspected; full final-film decode passed, 1280×720, 24fps, 38.42 seconds, four genuine generated clips, no audio.
- Browser rendering, full click matrix, responsive overflow/contrast checks and hosted checks are owned by the parent release agent and must be reported using their actual results.

## Scope boundary

This is a polished design demonstration, deliberately noindex. The email action requires a configured visitor email app and manual sending; the download is the fallback. Final WOLCO business statements, contractual information, project image rights, a live enquiry destination and any production analytics or legal policies are not established by a static demonstration.
