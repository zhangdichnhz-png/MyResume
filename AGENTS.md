# AGENTS.md

## Repository nature
- Personal resume published as a static site via GitHub Pages at `https://zhangdichnhz-png.github.io/` (repo `zhangdichnhz-png.github.io`, served from `main` branch root).
- Zero build, zero dependencies: plain `index.html` + files under `assets/`. No package manifest, framework, build script, test suite, linter, or CI — do not invent or run build/test/lint commands.
- `README.md` is the content draft/source of truth for facts; the site renders from data. **Content edits must be kept in sync between `README.md` and `assets/resume-data.js`.**
- All content is in Simplified Chinese. Make edits in Chinese and match the existing section structure: 联系方式 / 个人简介（概述·教育·资质）/ 主要成果（代表论文、代表专利、参与项目、获奖信息）/ 声明.

## File layout
- `index.html` — thin shell: head (meta, inline SVG favicon, CSS link) + `<div id="app">` + two `<script>` tags. Do not edit unless changing page shell.
- `assets/resume-data.js` — **the only file to edit for any content change**: one `window.RESUME_DATA` object (profile / sidebar[] / sections[] / declaration).
- `assets/render.js` — vanilla JS generic renderer. Reads blocks from data and dispatches by `type`; blocks with empty/missing `items` are skipped entirely. Edit only to add a brand-new layout type.
- `assets/avatar.jpg` — profile photo (referenced by `profile.avatar`; replace the file to change it).
- `assets/style.css` — all styles via CSS variables (`--accent`, `--text`, etc.). Two-column sidebar, card grids, chips, mobile stacking (`max-width: 760px`), A4 print styles.

## Data model (`resume-data.js`)
- `profile`: `{ name, title, fields, emailBase64, avatar }` — name, job title line, research-fields line, obfuscated email, avatar path (`""` hides it).
- `sidebar`: array of blocks rendered in the left column.
- `sections`: array of blocks rendered in the right column (array order = page order).
- Block shapes:
  - `{ title, type: "paragraphs", items: ["段落", ...] }`
  - `{ title, type: "chips", items: ["标签", ...] }`
  - `{ title, type: "edu", items: [{ school, major, degree }, ...] }`
  - `{ title, type: "cards" | "cardgrid", fields: { <字段名>: <角色> }, items: [{...}, ...] }`
  - `{ title, type: "group", blocks: [ <上面任意 block>, ... ] }` — renders h2 + h3 sub-blocks (used by 主要成果).
- Field roles used in `fields` maps: `title` bold main line; `em` italic; `strong` bold; `mono` monospace muted; `muted` small muted line; `accent` accent-colored line; `badge` top-right pill (at most one per card). Unknown roles fall back to `title`.
- A block with `items: []` (or missing) is not rendered at all — use empty arrays as placeholders (e.g. 荣誉与获奖).

## How-to: common operations

### Add a new entry to an existing section (paper / patent / project / award / edu / qualification)
1. Open `assets/resume-data.js`, find the target block's `items` array, copy an existing object and edit it. Entry shapes:
   - paper: `{ title: "...", journal: "...", year: "2024" }`
   - patent: `{ name: "...", no: "CN123456789B", date: "授权 2024-01-01" }`
   - project: `{ program: "...计划", name: "...项目", code: "编号" }`
   - award: `{ name: "奖项名称", org: "颁发机构", year: "2024" }`
   - edu: `{ school: "...", major: "...", degree: "..." }`
   - qualification: just a string in the `chips` block's `items`.
2. Add the same fact as a bullet under the matching heading in `README.md`.
3. Save and refresh the browser — no build step.

### Add a whole new section (e.g. 著作 / 社会兼职 / 培训经历) — no code needed
1. In `resume-data.js`, copy an existing block inside `sections` (right column) or `sidebar` (left column), then change `title`, `type`, `fields`, and `items`. Templates:
   - Single-column cards: `{ title: "著作", type: "cards", fields: { name: "title", publisher: "muted", year: "badge" }, items: [] }`
   - Two-column compact grid: same with `type: "cardgrid"`.
   - Tag chips: `{ title: "社会兼职", type: "chips", items: ["..."] }`
   - Paragraphs: `{ title: "...", type: "paragraphs", items: ["..."] }`
   - Sub-grouped section: copy the 主要成果 block (`type: "group"`) and edit its `blocks`.
2. Move blocks up/down in the array to reorder; delete a block object to remove a section.
3. Add the matching heading + bullets to `README.md`.
4. Only if no existing `type` fits the layout, add a renderer in `render.js` (add a `renderX(block)` function, wire it into `renderBlockBody`'s switch, add styles in `style.css`) — then it is reusable for all future blocks of that type.

### Change / remove the avatar
- The photo lives at `assets/avatar.jpg`. To replace it, overwrite that file with the new photo (keep the same filename) — no code change needed; hard-refresh the browser to bypass cache.
- Face framing is controlled by `.avatar`'s `object-position` in `style.css` (e.g. `center 20%` shifts the crop upward); adjust it if a new photo is framed differently.
- To hide the photo temporarily, set `profile.avatar` to `""` in `resume-data.js` (the `<img>` is only rendered when the path is non-empty). Do not rename the file with spaces or non-ASCII characters.

### Change the email address
- Generate base64 (PowerShell): `[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("new@example.com"))` (or `btoa("new@example.com")` in a browser console).
- Replace `profile.emailBase64`. Never put plaintext email in HTML/JS source; `render.js` decodes it at load time.

### Change colors / style
- Edit the CSS variables at the top of `assets/style.css`. Do not add web fonts or CDN resources.

## Hard rules
- Factual identifiers must be preserved verbatim and never "corrected" or fabricated: patent numbers (e.g. `CN111915020B`), grant dates, paper citations, and project codes. Ask the user before adding new achievements, publications, or credentials.
- Zero build: no frameworks, npm packages, static-site generators, web fonts, or external CDN resources. Data MUST be a JS file setting `window.RESUME_DATA` (not `fetch()` of JSON) so the page works when opened directly via `file://`.
- The favicon is an inline SVG `data:` URI ("张" on a green circle) in `index.html` — no separate icon file.

## Verification (after every edit)
1. `node --check assets/resume-data.js` and `node --check assets/render.js`.
2. Open `index.html` directly in a browser: two-column layout, narrow-width (mobile) stacking, Ctrl+P print preview, and that the email link reveals the address and opens a mail client. Empty placeholder sections (e.g. 荣誉与获奖) must NOT appear.
3. Re-read `resume-data.js` against `README.md` to confirm no factual entry (patent numbers, dates, codes) was altered.
