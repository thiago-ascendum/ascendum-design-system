# Changelog

The same log lives in the Figma file on page `02 · Changelog`. Every version carries three names: who proposed it, who checked it, who approved it. An entry with an empty slot is a proposal, not a release.

## 1.1.0 · proposed, 26 November 2026

Clean-up after the design review of 5 November.

- Proposed by: Hacksgiving team 2
- Checked by: the automated checks, all five blocking checks pass. No second reviewer yet.
- Approved by: nobody yet. Do not publish until a named owner signs here.

### Does this break my file?

| If your file uses | What changed | What you do |
|---|---|---|
| Avatar | The Fill property is now Tone, and Size has three values instead of four. | Pick the tone and the size again on instances set to Fill=Midnight or Size=Small. |
| Stat Card | The five Accent variants are gone. | Nothing. Those instances fall back to the plain card. |
| Badge | The tones Muted and Solid are gone. | Pick a new tone on those instances. |
| A component set to Inverted | Inverted is no longer a variant on Logo, the three cards, Footer, Navigation Bar and the six sections. | Set the Surface mode to Inverted on the instance or on its section. |
| Button | The Variant property is gone. Inverted is now the Surface mode, set on the section. | Pick the style again on instances that were Inverted, and set the Surface mode to Inverted on their section. |
| Breadcrumb Item | Three variants instead of six. Separator is now a switch, not a variant. | Turn the Separator switch off on instances that were set to Separator=False. |
| A removed token or text style | The layer loses the binding and keeps its last value. | Bind it again: text/access-muted to text/muted, UI/Tag and UI/Eyebrow to UI/Label. |

### Measured before and after

| Check | Before | After |
|---|---|---|
| Deprecated items still shipped | 28 | 0 |
| Colour pairs failing contrast | 16 | 0 |
| Colours set by hand | 75 | 0 |
| Labels typed in capitals | 46 | 0 |
| Variants | 258 | 210 |

### Removed

- Department colours as a concept. `dept/*` tokens are now `accent/red`, `purple`, `blue` and `stone`, each with one soft tint.
- `neutral/0`, `neutral/300` and `neutral/950`. No role and no component used them.
- `text/access-muted`, a second muted text colour that also failed contrast.
- Text styles `UI/Tag` and `UI/Eyebrow`. Nothing is set in capitals any more.
- Badge tones Muted and Solid.
- Stat Card accent strip and its five department variants.
- Two Progress Bar sizes.
- Unused tokens: `status/*-border`, `text/on-gradient-light`, `component/tag/*`, `component/stat-card/accent-bar`.

### Changed

- Avatar: soft tint with dark initials, three sizes and four tones. It was 20 variants.
- Contrast: muted text, placeholder and muted icons in light mode, and the four feedback colours in dark mode, now pass WCAG AA.
- Input: vertical padding 8 to 18.
- Focus is a visible ring on Button, Input, Checkbox, Radio, Toggle and Slider.
- Button: 15 variants instead of 24. Pressed is new. Inverted is no longer a variant: the section sets the Surface mode and every button inside follows, in light and in dark. Breaking. Solid has a visible hover.
- Modal and Section / Showcase: the small label above the title is gone.
- File Uploader: the failed state shows a warning icon, the reason and a Try again action.
- Team and stakeholder cards use the Avatar component.
- Getting Started, Changelog and Contribution & Governance are guided pages built from the components of the library.
- Documentation cards: every card and every dark panel was looked at. Fixed: the logo in the inverted Key Stakeholders Card, the Side Nav Item rows, the Select samples and two raw labels.
- Every page canvas in the Figma file is now dark (#1E1E1E), so the page frames read against it.
- Variables and styles: every variable has a description (73 had none). 22 component variables are scoped to spacing instead of showing in every picker. The two text styles and five gradient styles without a description have one.
- Breadcrumb Item: three variants instead of six. The separator is a switch on the same three states. Breaking.
- Inverted: Logo, the three cards, Footer, Navigation Bar and the six sections no longer have an Inverted variant. The section sets the Surface mode and everything inside follows. 44 variants became 22. Breaking.
- Select: a visible focus ring like Input, and the disabled border uses the same token as Input.
- Card labels: Checkbox and Radio say "Not checked", Toggle says "Off". Skeleton names its four shapes and lines its samples up.

### Added

- Tokens: `neutral/750`, `status/*-on-dark`, `accent/*-soft`, `bg/accent-*`, `text/on-accent`, `border/focus`, `border-width/focus`, `text/inverted-muted`, `button/fill-solid-hover`.
- Colour page: Status and Semantic roles sections, in light and dark.
- A documentation card on 45 components. 31 also show dark mode.
- A card on each pattern that lists the components it is built from.
- Section pages 04 to 10: an opening statement and an index of the pages in the section, counted from the file. Page 10 says plainly that it is empty.
- Pages 90 and 99: an opening card saying tools and designers must ignore the page.
- Typography: a specimen of all 16 text styles in desktop and mobile, and a guide to which style does which job.
- Spacing, Grid & Layout: the spacing scale with what each step is for, the column grid drawn from the tokens, and one layout on desktop and on mobile.
- Radius & Elevation: every radius on a real component that binds it, and the elevation styles on real overlays.
- Iconography: a "Missing: UI icon set" card, and a counted list of which components already use which icon.
- Logo: the four variants on light and dark surfaces. Clear space and minimum size are marked as proposals.
- Photography: the brief for the six missing reference photographs. No photographs were added.
- Tone of Voice: each principle has a before and after shown in a real component.
- Colour: a contrast table of every text role on its surfaces, light and dark, computed from the variable values.
- Code: 14 components built from the tokens, with a documentation site published on every change.
- Interactions: 110 prototype interactions on 18 components. Hover is mouse enter and mouse leave. A click presses a Button and changes the value of a Checkbox, Radio or Toggle.
- Component contracts: one contract per component for AI tools, generated from the file: when to use it, properties and values, states and the tokens it binds.
- Breaking change detection: the pipeline compares two snapshots and lists every token, component, property and text style a consumer would lose. 57 since the file as received.
- Lifecycle: a page that follows Button from Figma to code, documentation and checks, with what ran on its own, what needed a person and what infrastructure is missing.
- States: Hover and Pressed on Checkbox, Radio, Toggle and Slider. Hover on Input, Form Field, Select, Combobox and Search Bar. 25 new variants.
- Surface collection: one collection with two modes, Default and Inverted, and 14 tokens that follow it: seven for Button, five for sections and cards, two for the logo.
- Control tokens: control/fill-hover, control/fill-pressed, control/fill-selected-hover and control/fill-selected-pressed.
- Pressed tokens: `button/fill-pressed` and `button/fill-pressed-inverted`.
- Skeleton: loading behaviour shown in three steps, and a two-frame prototype.
- Slider: a three-frame prototype of the budget filter.
- Select: the open state, drawn with Menu Item rows, and a consistency table measured against Input.
- Radio: a States block that says why all six states stay.
- Iconography: four rules for naming, size, colour and labels.
- Release gate: the site build runs the checks first. A closed gate stops the publish.

### Proposed, to confirm

Fourteen decisions taken with a reason and marked as proposals in the file. Each one is a single change to undo.

- Unused tokens: removed three that nothing bound: `component/combobox/max-width`, `component/dropzone/icon` and `size/container-half`. The layout sizes (`size/col-*`, `size/container`, `size/full-width`) stay as reference for page layouts.
- Link colour: `text/link` keeps the colour of the text on purpose. A link is told apart by its underline, never by colour alone.
- Column widths: `size/col-4` is 269.5 (was 268) and `size/col-5` is 209.2 (was 206), so both add up to the 1174 container. On mobile every `size/col` token is one container wide, so layouts stack on their own.
- Gradient angles: all five gradients run at the same 44 degrees. Develop Beyond was turned and its stops mirrored, so it looks the same.
- Small text: the 12px text in Jira Annotation uses UI/Caption (13px). No style existed at 12px.
- Grid styles: two grid styles bound to the tokens: the 12-column page grid and the one-column mobile grid.
- Select height: vertical padding 12 to 13.5, so Select is 47 px high, the same as Input.
- Corner radius: brand-facing pages keep 0 px buttons. Internal tools may use `radius/field`, 4 px. Shown side by side on the Radius & Elevation page.
- Behaviour: Skeleton and Slider each have a Behaviour block with timings, motion and keyboard steps.
- Illustration guidelines: five rules for where brand illustrations may be used. For the brand owner to confirm.
- Button surface: a Surface mode replaces the twelve Inverted variants. A section is inverted once, not button by button.
- Pressed colour: one grey step past hover on Solid. Outline and Ghost take the Solid hover colour while pressed.
- Muted text on inverted: secondary text on inverted cards and on the footer uses the inverted muted colour, the same as the sections.
- Control states: an empty control takes one grey step on hover and two when pressed. A checked one takes the same steps as the Solid button.

## 1.0.0 · never published

Initial migration from the Claude Design code package. No name is on record for who proposed, checked or approved it. The full entry is on page `02 · Changelog` of the Figma file.
