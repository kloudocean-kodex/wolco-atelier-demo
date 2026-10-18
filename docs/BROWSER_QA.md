# Local browser checks

These checks were carried out by the parent release agent in the existing Edge session. They are local-preview evidence, separate from hosted verification or a physical-device certification. The source owner reviewed the browser findings and applied the fixes below.

## Reported results

- Responsive widths: 320, 390, 768, 1024 and 1440px. No horizontal overflow or broken images at those five widths.
- All four collection filters return their expected studies.
- All four study galleries support previous/next navigation. The Cookes Road supplied-photo gallery works separately.
- Save/remove studies, material selection and saved room priorities work.
- All three palettes change correctly and support keyboard navigation.
- All four space controls update their question/content and can be saved.
- All five journey details and all five FAQ details open and close.
- Mobile navigation opens, dismisses with Escape, closes on a chosen anchor and returns focus.
- Brief validation, review and text-file download work. Email is a deliberately manual draft action, with a download fallback; no real email was sent by the agent.
- Explicit reverse/forward focus wrapping passes in the brief dialog and mobile navigation. Dialog close controls remain visible while content scrolls.
- The initial genuine exterior clip reached readyState 4, reported 10 seconds, advanced to the end and paused when the close event settled. It has since been replaced by a genuine 19.42-second exterior-to-kitchen story; the final story requires the release owner's hosted playback recheck.
- The final local automated accessibility snapshot records zero violations and 28 passes. It retains incomplete results for 32 image/background contrast nodes and one ARIA value; those require the release owner's manual review and must not be described as a universal accessibility certification.

## Fixes from browser review

- Darkened muted text and bronze accent colours, including privacy/disclosure text.
- Raised functional copy and controls to at least 12px, with editorial labels generally 11px; compact diagram labels and brand edition marks use smaller sizes.
- Gave close icons explicit ink colour, including the dark film header.
- Made dismissal controls persistent in long dialogs.
- Added explicit Tab/Shift+Tab wrapping, initial close-button focus, outside-focus protection and recorded opener restoration.
- Corrected the mobile film element to its full 16:9 frame, avoiding artificial black bars and preserving the complete image.
- Added recovery when reopening a film after a previous media error and reset its status text.

The final two film corrections and the subsequent 19.42-second two-scene story replacement are source-reviewed changes awaiting the release owner's targeted browser recheck. The screenshot/evidence snapshots predate these changes.

## Evidence

The JSON snapshots in this directory are copies of the parent release agent's local evidence:

- `edge-responsive-local.json`
- `edge-interactions-local.json`
- `edge-axe-final-local.json`

Their original captures and five responsive screenshots are retained outside the project in `../wolco-demo-audit/`. No screenshots containing entered personal details are shipped to the public site.
