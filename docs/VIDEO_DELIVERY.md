# Architectural film delivery

The film URLs use a narrowly scoped Cloudflare Pages Function because the initial hosted static responses ignored Range requests. All page, image, stylesheet, font and application-script routes remain static. `_routes.json` contains only the exact MP4 paths.

The handler reads from the project's own ASSETS binding, preserves the static security headers and strong ETag, and streams the requested byte interval through a FixedLengthStream. It never buffers the entire video. It supports prefix, middle, suffix and open-ended ranges, returns 416 for unsatisfiable intervals, and returns the complete representation when If-Range does not match. Build-time metadata supplies exact file sizes because the internal ASSETS response can omit Content-Length. `npm run build` regenerates that metadata and the route list from the actual public MP4s.

Validation: `npm run test:video` passes 18 protocol scenarios. The handler type-checks against the current Cloudflare Workers types. Eight probes against real local workerd compare returned bytes with the original film, including Safari's two-byte initial probe and seeks to the middle and end. Public CDN verification is recorded in the release audit.

Pages Functions use Workers request quotas. Cloudflare's Free plan currently includes 100,000 combined Workers/Functions requests per day; other static requests are free and unlimited. No paid subscription, bucket or video service was purchased. The two demos use GitHub integration and retain Pages deployment history for rollback.

References checked 18 October 2026:

- https://developers.cloudflare.com/pages/functions/api-reference/
- https://developers.cloudflare.com/pages/functions/routing/
- https://developers.cloudflare.com/pages/functions/pricing/
- https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/
