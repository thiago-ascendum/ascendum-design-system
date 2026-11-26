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

### Added

- Tokens: `neutral/750`, `status/*-on-dark`, `accent/*-soft`, `bg/accent-*`, `text/on-accent`, `border/focus`, `border-width/focus`, `text/inverted-muted`, `button/fill-solid-hover`.
- Colour page: Status and Semantic roles sections, in light and dark.
- A documentation card on 45 components. 31 also show dark mode.
- A card on each pattern that lists the components it is built from.

## 1.0.0 · never published

Initial migration from the Claude Design code package. No name is on record for who proposed, checked or approved it. The full entry is on page `02 · Changelog` of the Figma file.
