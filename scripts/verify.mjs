import { readFile, access, stat } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const html = await readFile(path.join(root, "index.html"), "utf8");
const css = await readFile(path.join(root, "src/style.css"), "utf8");
const js = await readFile(path.join(root, "src/main.js"), "utf8");
const issues = [];
let assets = 0;
let anchors = 0;
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
if (ids.length !== new Set(ids).size) issues.push("Duplicate HTML IDs");
for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
  anchors++;
  if (!ids.includes(match[1])) issues.push(`Missing anchor #${match[1]}`);
}
const files = new Set();
for (const match of html.matchAll(/\b(?:src|href|poster)="(\/[^"#]+)"/g))
  files.add(match[1]);
for (const match of html.matchAll(/\bsrcset="([^"]+)"/g))
  for (const candidate of match[1].split(","))
    files.add(candidate.trim().split(" ")[0]);
for (const match of css.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g))
  files.add(match[1]);
for (const match of js.matchAll(/['"](\/media\/[^'"\s]+)['"]/g))
  files.add(match[1]);
for (const file of files) {
  const target = path.join(
    root,
    file.startsWith("/src/") ? file.slice(1) : `public${file}`,
  );
  try {
    await access(target);
    assets++;
  } catch {
    issues.push(`Missing asset ${file}`);
  }
}
for (const src of [
  ...js.matchAll(/src:\s*['"](\/media\/wolco-[^'"]+\.webp)['"]/g),
].map((match) => match[1]))
  for (const size of ["640", "960"]) {
    try {
      await access(
        path.join(root, `public${src.replace(".webp", `-${size}.webp`)}`),
      );
    } catch {
      issues.push(`Missing responsive variant ${src} ${size}`);
    }
  }
if (!html.includes("noindex,nofollow")) issues.push("Missing demo noindex");
if (/https?:\/\//.test(html + css))
  issues.push("External runtime URL in HTML/CSS");
if (/\bon\w+\s*=/i.test(html)) issues.push("Inline script handler found");
if (/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(js))
  issues.push("Unexpected storage/network API");
if (/autoplay/.test(html)) issues.push("Unexpected video autoplay");
if ((html.match(/<h1\b/g) || []).length !== 1) issues.push("Expected one H1");
for (const match of html.matchAll(/<img\b([^>]+)>/g))
  if (
    !/\balt=/.test(match[1]) ||
    !/\bwidth=/.test(match[1]) ||
    !/\bheight=/.test(match[1])
  )
    issues.push("Image without alt/dimensions");
const film = await stat(
  path.join(root, "public/media/wolco-project-journey-v2.mp4"),
);
const result = {
  passed: issues.length === 0,
  localAssetsChecked: assets,
  anchorLinksChecked: anchors,
  uniqueIds: ids.length,
  dialogs: (html.match(/<dialog\b/g) || []).length,
  filmBytes: film.size,
  issues,
};
console.log(JSON.stringify(result, null, 2));
if (issues.length) process.exitCode = 1;
