# Greg O'Brien — Design System (as built)

Reference for anyone (human or Claude) working on this codebase. Extracted from the Claude Design source (`Greg Site - Pages.dc.html`) and locked as of the Expand round (2026-09-07). Treat these as hard constraints, not starting points — new pages/components should be built from these exact values, not fresh interpretations of "the same style."

Tokens live as CSS custom properties in `src/layouts/Layout.astro` (`:root` for light, `[data-theme="dark"]` for dark).

## Colour

**Light (default)**
- Accent — links, tag borders, hover borders, primary tile: `#25408f`
- Background: `#fbfaf8`
- Ink — headings, card titles, wordmark: `#16181c`
- Body text: `#3a3f47`
- Muted — labels, meta, dates, placeholder copy: `#6b7280`
- Border, hard — card and pill outlines, top/bottom rules: `#16181c`
- Rule, section divider: `rgba(22,24,28,.18)`
- Rule, soft — list row separators: `rgba(22,24,28,.12)`
- Dashed border — placeholder slots: `rgba(22,24,28,.45)`
- Secondary tile — ink on `#2b3350`: `#c2cbe4`
- Placeholder stripe, 135°, 8px bands: `#f2f0ec` / `#e8e5df`
- Pill: `rgba(251,250,248,.82)` + `blur(10px)`; pill shadow `0 2px 14px rgba(22,24,28,.07)`; capsule `#16181c`; nav ink `#16181c` → `#fbfaf8` on capsule; hover wash `rgba(22,24,28,.06)`

**Dark (chosen, not inverted)**
- Accent — lifted for contrast on dark ground: `#93aaea`
- Background: `#14161a`
- Surface — contact panel: `#191c21`
- Ink: `#eae7e0`
- Body text: `#b6bac1`
- Muted: `#8f959e`
- Border, hard — no pure-white outlines on dark: `#3d424a`
- Rule, section divider: `rgba(234,231,224,.16)`
- Rule, soft: `rgba(234,231,224,.11)`
- Dashed border — placeholder slots: `rgba(234,231,224,.3)`
- Primary tile — deepened, not the light navy: `#2c3f7c`
- Secondary tile — ink on `#f2f4f9`: `#5d6a8c`
- Placeholder stripe: `#1b1e24` / `#22262d`
- Pill: `rgba(25,28,33,.86)` + `blur(10px)`; pill shadow `0 2px 14px rgba(0,0,0,.4)`; capsule `#eae7e0`; nav ink `#eae7e0` → `#14161a` on capsule; hover wash `rgba(234,231,224,.08)`

## Type

Two families, one monospace. Newsreader (400) for anything editorial — hero, feature titles, note titles. IBM Plex Sans (400/600) for UI and body. IBM Plex Mono (400) for labels, meta and tags only — never for reading copy.

| Role | Sample | Spec |
|---|---|---|
| Hero headline | "A *maker*." | Newsreader 400 · 54/59 · -0.02em, one word italic, same size |
| Hero subhead | "Over a decade in AI and digital innovation…" | Plex Sans 400 · 16/26 · max 46ch, body colour |
| Feature title (Watch) | "What actually makes something an agent?" | Newsreader 400 · 25/31 |
| Note title (Think) | "Why 'agent' is doing too much work as a word" | Newsreader 400 · 23/30, panel heading 24, wordmark 17 |
| Card title | Stackchan | Plex Sans 600 · 17/23 |
| Body — card/bio/stream | e.g. card description copy | Plex Sans 400 · card 14/22 (max 78ch) · bio 15.5/26 · stream 14.5/23 |
| Nav link / see-more | Build · All work → | nav 13 · +0.02em · ink; see-more 12.5 · muted → ink on hover |
| Section label / meta | BUILD · Personal · Hardware | label: Mono 400 · 11 · +0.14em · caps; meta/tag 10.5 · date 10.5 · muted |

## Spacing & grid

- Base unit **4px**; working steps are 6·9·11·14·18·20·22·24·26·34·40·44·56·84·96. Odd half-steps (9, 11, 22) exist only inside components; section-level spacing stays on the coarse steps.
- Page frame: max width 1240px. Horizontal gutter 56px everywhere. Section block padding 40px 56px; hero 96px top / 84px bottom. Sections separated by a 1px rule, page top and bottom by the hard border.
- Grids: two equal columns for hero, Watch/Think and Meet. Work grid is 1fr 1fr with the lead card spanning both. Grid gap 24px; Meet column gap 56px. Column divider is a vertical rule, not a gap.
- Rhythm inside a section: label → content 16–18px. Card meta block padding 18px 20px, image inset 20px. Think rows 22px vertical, Stream rows 11px. Measure caps: 46ch subhead, 52ch note line, 70ch card copy, 78ch stream.

## Components

- **Selected Work card**: 1px hard border, no radius, no shadow. Solid colour block on top (never a gradient), inset mono caption bottom-left. Meta band below the internal rule: title + body left, client·product right. Lead item spans both columns at 260px block height; followers 190px. Whole card is one link; hover changes border colour to accent only. Placeholder variant: dashed border, striped block, all text muted.
- **Watch thumbnail block**: same shell as a work card, one item only, 212px thumbnail. Title is Newsreader, not the sans card title — this is editorial, not a product tile. Status/placeholder tag is a mono 10.5px box in accent, 4px 8px padding, square corners.
- **Think list item**: title left, mono date right, baseline-aligned, soft rule between. First item only carries one line of description. Text only — no thumbnails in Think, ever. Three items stretch (`flex:1`) so the block matches the Watch column's mass. Hover tints the whole row to accent.
- **Stream entry**: fixed 84px mono date column, 18px gutter, one line of text. Max three entries on the homepage; the archive holds the rest. Full-width section, 78ch measure, last row loses its rule.
- **Pill nav — default, hover, active**: detached from the page edge — 26px above the first item, centred, never flush. Pill: 1px hard border, 999px radius, translucent background + `blur(10px)`, single soft shadow. Wordmark in Newsreader 17px, then five nav words at 13px with 6px width between and 22px from the wordmark; mode button 28px, 1px ring, 11px dot inside (ring in light, filled crescent in dark, accent-coloured). Default: no highlight — words in ink. Hover: one shared capsule (ink in light, warm-white in dark) fades and glides to the hovered word — `transform` + `width` over 340ms `cubic-bezier(.22,.8,.24,1)`, opacity 200ms; the word never highlights per item. Leave: capsule fades out where it stands, no travel back. Active/current page: capsule rests on that item.
- **Links, buttons & motion budget**: inline link — accent, no underline at rest, underline on hover. See-more link — 12.5px muted with a trailing →, muted → ink on hover; always inline right of its section label, baseline-aligned (Build, Watch, Think, Stream all identical). Buttons — square, mono 11.5px, 8px 14px, primary is ink fill on background text, secondary is a 1px border. Motion: the nav capsule is the only animated element on the page. Everything else changes colour or border only, 200ms ease — cards to accent border, list rows to accent text, buttons to 0.82 opacity. No transforms, scales, reveals, parallax or entrance animations anywhere.

## Implementation notes (Astro-specific)

- All tokens, hover classes, media queries, nav markup, theme-toggle script and footer live in `src/layouts/Layout.astro`. Every page wraps its content in `<Layout current={N}>` where `N` is 0 (Build) through 4 (Meet), or `-1` for Home/pages with no nav tab.
- Hover states in the original design used inline `style-hover="…"` (a mockup-tool-only attribute); these became real CSS classes: `.h-ink`, `.h-card`, `.h-ul`, `.h-dim`, `.h-wash`.
- Page-switcher `onClick` handlers became real `<a href>`s matching Astro's file-based routes (`/build`, `/watch`, `/think`, `/stream`, `/meet`, plus detail routes like `/build/[slug]`).

## Voice (working draft)

Status: first pass, written 23 Sep 2026 from the three published Think notes. Greg is still refining this, so treat it as guidance rather than a locked spec, and flag anything that seems off rather than quietly working around it.

### Who's talking

One person, first person, writing to peers. A product leader who builds things on the side and is comfortable saying what he thinks. Warm and direct, never salesy. The reader is assumed to be smart and busy.

### Shape of a Think note

- Roughly 350–550 words. If it's longer, it's probably two notes.
- Title in sentence case, with one word in italic in the H1. Subtitle is one or two sentences that state the argument, not tease it.
- Open in the middle of the idea. No scene-setting, no "In today's fast-moving world".
- Two or three short sections with plain headings ("Where I'm less sure", not "Key Considerations").
- One pull quote, and it must be Greg's own line, not a source quote.
- Close with "The nugget" or "The plain version": one practical takeaway the reader can use this week.

### Sentences

- Contractions, plain verbs, everyday metaphors ("a workflow wearing an agent's coat").
- Vary sentence length naturally. Short sentences are for emphasis, not a rhythm to repeat.
- Say where you stand. Opinions are marked as opinions ("I think", "I'd bet") and facts are attributed.
- Hedge once, where it's real. Don't pad every claim with caveats.

### Sources

Name the outlet or person in the sentence ("VentureBeat puts it at…", "one analyst told CIO.com…"). No reference lists. Prefer primary or well-established outlets, and say when a number is a vendor's own. Quote sparingly and keep quotes short.

### Spelling and conventions

British/Irish English throughout: -ise and -isation (prioritise, organisation), colour, behaviour, favourite, centre, programme (but "program" for software), judgement, licence (noun), defence, travelled, modelling. Dates in full everywhere a post date appears (post page, Think archive, "next note"): "23 Sep 2026", since there can be more than one note a month. Single spaced em dashes are fine, but use them sparingly.

### Things that make it read as machine-written

Avoid these, even when they sound punchy:

- "It's not X, it's Y" and "That's the point." constructions used as a rhythm.
- Stacks of three: three fragments, three adjectives, three rhetorical questions.
- One-line paragraphs for drama ("Enough said.").
- Bold labels at the start of paragraphs, and bulleted pros and cons inside a note.
- Stock words and phrases: delve, landscape, game-changer (unless it's the question being tested), unlock, leverage, robust, seamless, "here's the thing", "let's dive in", "at the end of the day".
- Sign-offs that ask for engagement ("Happy to be argued with", "Let me know your thoughts").
- Summarising what the note has just said.

### Quick check before publishing

Read it aloud. If a sentence is one Greg wouldn't say across a table, rewrite it. Check every number has a named source, every opinion is clearly his, and the spelling is British/Irish.
