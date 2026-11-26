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
- Button: Solid has a visible hover.
- Modal and Section / Showcase: the small label above the title is gone.
- File Uploader: the failed state shows a warning icon, the reason and a Try again action.
- Team and stakeholder cards use the Avatar component.
- Getting Started, Changelog and Contribution & Governance are guided pages built from the components of the library.
- Documentation cards: every card and every dark panel was looked at. Fixed: the logo in the inverted Key Stakeholders Card, the Side Nav Item rows, the Select samples and two raw labels.
- Every page canvas in the Figma file is now dark (#1E1E1E), so the page frames read against it.

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

## 1.0.0 · never published

Initial migration from the Claude Design code package. No name is on record for who proposed, checked or approved it. The full entry is on page `02 · Changelog` of the Figma file.
