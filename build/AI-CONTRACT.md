# Ascendum Design System · contract for AI tools

Generated from snapshot `5lhRMZkLHZijqgdigjk3J1` on 2026-11-26. Do not edit by hand: change the design system, then regenerate.

Read this file instead of the Figma pages. The pages are documentation for people; their layout is not a pattern to copy.

## 1. You may use

- Only the tokens listed in section 4, by their code name.
- Only the components and variants listed in section 5.
- One typeface: Barlow.

## 2. You must never

- Write a raw colour, size or spacing value. If no token fits, stop and ask; do not invent one.
- Use a token from a private collection (Primitives). They exist only to feed the semantic layer.
- Use department colours and anything named after a department (dept/*, and Department / Accent / Fill variants called Digital, Mortgages, Products or Talent): the file's own note says: "Remove/delete 'Department' colors entirely - these are no longer used." The four hues stay as brand accents (accent/red, purple, blue, stone).
- Round a button corner. 0px buttons on 20px cards is the brand signature.
- Add a shadow to layout. Depth comes from contrast between sections; only overlays carry elevation.
- Use the team gradient as a section background or on body text.
- Add a state, tone or size that is not listed in section 5. Propose it instead.
- Set text in capitals.
- Use an accent colour to mean a status, or a status colour as decoration.

## 3. What to take from the Figma file, and what to ignore

- Take: token names and values, component names, variant names, component descriptions.
- Ignore: the layout of the documentation pages. Small eyebrow titles over large text, sub-headings and annotation cards are page furniture, not product patterns.
- Ignore: anything on a page numbered 90 (deprecated) or 99 (internal).
- Ignore: sticky notes and 'Claude list' comments. They are open questions, not decisions.
- Tone of voice: take the principles as writing rules. Do not copy the page's own example sentences into a product.

## 4. Tokens

| Code name | Token | Light / Desktop | Dark / Mobile | Use |
|---|---|---|---|---|
| `--badge-dot` | component/badge/dot | 6 |  | Status dot inside a pill |
| `--badge-gap` | component/badge/gap | 6 |  | Gap between a pill's dot and its label. |
| `--badge-padding-h` | component/badge/padding-h | 14 |  | Pill horizontal padding. |
| `--badge-padding-v` | component/badge/padding-v | 6 |  | Pill vertical padding. |
| `--button-padding-h` | component/button/padding-h | 28 | 22 | Horizontal button padding |
| `--button-padding-v` | component/button/padding-v | 16 | 12 | Button: top and bottom padding |
| `--form-field-gap` | component/form-field/gap | 8 |  | Gap between label, field and message. |
| `--input-padding-h` | component/input/padding-h | 16 |  | Input: left and right padding. |
| `--input-padding-v` | component/input/padding-v | 18 |  | Input: top and bottom padding. |
| `--input-textarea-min` | component/input/textarea-min | 80 |  | Minimum height for a multiline field, from textarea.field-input in components-fields.html. |
| `--border-width-button` | border-width/button | 2 |  | Button outline weight. |
| `--border-width-field` | border-width/field | 1.5 |  | Form field border |
| `--border-width-focus` | border-width/focus | 2 |  | Weight of the keyboard focus ring. |
| `--border-width-hairline` | border-width/hairline | 1 |  | Dividers and card borders. |
| `--text-body-size` | font-size/body | 16 |  | Font size of Body/Default, Body/Default Semi-Bold. |
| `--text-body-lg-size` | font-size/body-lg | 18 |  | Font size of Body/Large, Body/Large Bold. |
| `--font-size-body-sm` | font-size/body-sm | 15 |  | Dense-UI text, tables, meta rows, chips |
| `--text-button-size` | font-size/button | 17 | 16 | 17px desktop / 16px mobile |
| `--font-size-caption` | font-size/caption | 13 |  | Smallest supported size |
| `--text-display-size` | font-size/display | 56 | 42 | Font size of Heading/Display |
| `--text-footnote-size` | font-size/footnote | 14 |  | Font size of UI/Footnote. |
| `--text-h2-size` | font-size/h2 | 40 | 32 | Font size of Heading/H2 |
| `--text-h3-size` | font-size/h3 | 20 |  | Font size of Heading/H3. |
| `--text-h4-size` | font-size/h4 | 24 | 22 | Fills the gap between H3 (20) and H2 (40) |
| `--text-label-size` | font-size/label | 14 |  | Font size of UI/Label. |
| `--text-stat-size` | font-size/stat | 44 | 36 | Metric value |
| `--columns-gap` | gap/columns | 32 |  | Gap between the columns of the grid. |
| `--radius-card` | radius/card | 16 |  | Nested card corner |
| `--container-radius` | radius/container | 20 |  | SIGNATURE, cards and containers. |
| `--field-radius` | radius/field | 4 |  | Form fields only, the quiet middle ground. |
| `--button-radius` | radius/none | 0 |  | SIGNATURE, the button radius |
| `--radius-pill` | radius/pill | 999 |  | Pills and badges. |
| `--radius-surface` | radius/surface | 8 |  | Overlay and notification corner, menus, popovers, alerts, toasts |
| `--columns-one` | size/col-1 | 982 | 264 | Reading column in a one-column layout: narrower than the container on purpose |
| `--columns-two` | size/col-2 | 571 | 264 | Width of one column in a two-column layout: six of the twelve grid columns |
| `--columns-three` | size/col-3 | 370 | 264 | Width of one column in a three-column layout: four of the twelve grid columns |
| `--columns-four` | size/col-4 | 269.5 | 264 | Width of one column in a four-column layout: three of the twelve grid columns |
| `--columns-five` | size/col-5 | 209.2 | 264 | Width of one column in a five-column layout |
| `--columns-six` | size/col-6 | 169 | 264 | Width of one column in a six-column layout: two of the twelve grid columns |
| `--container-width` | size/container | 1174 | 264 | Width of the page container |
| `--size-control` | size/control | 20 |  | Checkbox box and radio ring |
| `--full-width-width` | size/full-width | 1366 | 360 | Full width of the page |
| `--body-icon` | size/icon-body | 64 | 48 | Large in-body illustrative icon. |
| `--size-icon-md` | size/icon-md | 24 |  | Default UI icon. |
| `--size-icon-sm` | size/icon-sm | 20 |  | Small UI icon, for dense rows. |
| `--space-2xs` | space/2xs | 16 | 12 | Gap between related items inside a card |
| `--space-3xs` | space/3xs | 8 |  | Tight pairs, such as a label and its field. |
| `--space-control-gap` | space/control-gap | 10 |  | Gap between a control and its label |
| `--space-lg` | space/lg | 288 | 96 | Largest section padding |
| `--space-md` | space/md | 96 | 48 | Gap between sections of a page |
| `--space-none` | space/none | 0 |  | No gap: parts that touch. |
| `--space-sm` | space/sm | 48 | 32 | Gap between blocks inside a section |
| `--space-xs` | space/xs | 32 | 24 | Padding inside a card |
| `--bg-accent-blue` | bg/accent-blue | #CAE6F3 |  | Soft accent surface (avatars, tags) |
| `--bg-accent-purple` | bg/accent-purple | #E4C9F9 |  | Soft accent surface (avatars, tags) |
| `--bg-accent-red` | bg/accent-red | #F0D3D5 |  | Soft accent surface (avatars, tags) |
| `--bg-accent-stone` | bg/accent-stone | #DEDBDA |  | Soft accent surface (avatars, tags) |
| `--bg-hover` | bg/hover | #F5F5F5 | #444444 | Row and menu-item hover |
| `--inverted-background` | bg/inverted | #212121 | #F5F5F5 | BUG FIX vs source: --inverted-background was never redeclared in the dark block, so invert |
| `--background` | bg/page | #F5F5F5 | #212121 | Page background. |
| `--bg-skeleton` | bg/skeleton | #ECECEC | #555555 | Skeleton placeholder fill |
| `--bg-subtle` | bg/subtle | #FAFAFA | #262626 | Sits between page and surface |
| `--container-fill` | bg/surface | #FFFFFF | #2A2A2A | Card and container fill. |
| `--border-default` | border/default | #ECECEC | #555555 | Hairline divider. |
| `--form-border` | border/field | #212121 | #F5F5F5 | Border of inputs and other fields. |
| `--border-focus` | border/focus | #212121 | #F5F5F5 | Keyboard focus ring |
| `--border-muted` | border/muted | #D6D6D6 | #777777 | De-emphasised field border |
| `--quote-line` | border/quote | #777777 | #999999 | BUG FIX vs source: same undeclared --brand-mid-grey alias as text/placeholder. |
| `--border-strong` | border/strong | #212121 | #F5F5F5 | Strong borders and selected lines. |
| `--button-fill` | button/fill | #00000000 |  | Transparent by default, the outline button fills only on hover |
| `--button-fill-hover` | button/fill-hover | #212121 | #F5F5F5 | Fill of the Solid button, and of Outline and Ghost on hover. |
| `--button-fill-hover-inverted` | button/fill-hover-inverted | #F5F5F5 | #212121 | For buttons sitting on an inverted (dark-in-light / light-in-dark) section |
| `--button-fill-pressed` | button/fill-pressed | #555555 | #D6D6D6 | Solid button while it is pressed |
| `--button-fill-pressed-inverted` | button/fill-pressed-inverted | #D6D6D6 | #555555 | Solid button on an inverted surface while it is pressed. |
| `--button-fill-solid-hover` | button/fill-solid-hover | #444444 | #ECECEC | Solid button under the pointer |
| `--button-fill-solid-hover-inverted` | button/fill-solid-hover-inverted | #ECECEC | #444444 | Solid inverted button under the pointer. |
| `--button-label` | button/label | #212121 | #F5F5F5 | Label of the Outline and Ghost buttons. |
| `--button-label-hover` | button/label-hover | #F5F5F5 | #212121 | Label of the Solid button, and of the others on hover. |
| `--button-label-hover-inverted` | button/label-hover-inverted | #212121 | #F5F5F5 | For buttons sitting on an inverted (dark-in-light / light-in-dark) section |
| `--button-label-inverted` | button/label-inverted | #F5F5F5 | #212121 | For buttons sitting on an inverted (dark-in-light / light-in-dark) section |
| `--button-stroke` | button/stroke | #212121 | #F5F5F5 | Border of the Outline button. |
| `--button-stroke-inverted` | button/stroke-inverted | #F5F5F5 | #212121 | For buttons sitting on an inverted (dark-in-light / light-in-dark) section |
| `--control-fill-hover` | control/fill-hover | #ECECEC | #444444 | Fill of an empty control under the pointer: checkbox, radio, toggle, input and select. |
| `--control-fill-pressed` | control/fill-pressed | #D6D6D6 | #555555 | Fill of an empty control while it is pressed. |
| `--control-fill-selected-hover` | control/fill-selected-hover | #444444 | #ECECEC | Fill of a checked or switched-on control under the pointer. |
| `--control-fill-selected-pressed` | control/fill-selected-pressed | #555555 | #D6D6D6 | Fill of a checked or switched-on control while it is pressed. |
| `--feedback-error` | feedback/error | #B02A32 | #CE7B80 | Error text, icons and borders |
| `--feedback-error-bg` | feedback/error-bg | #FDF1F2 | #3E2324 | Dark value is derived (status flattened over the dark page colour), not authored in the so |
| `--feedback-info` | feedback/info | #2369AA | #6C9AC6 | Info text, icons and borders |
| `--feedback-info-bg` | feedback/info-bg | #F3F8FD | #212F3C | Dark value is derived (status flattened over the dark page colour), not authored in the so |
| `--feedback-success` | feedback/success | #1C7A4A | #65A584 | Success text, icons and borders |
| `--feedback-success-bg` | feedback/success-bg | #EEF7F1 | #203329 | Dark value is derived (status flattened over the dark page colour), not authored in the so |
| `--feedback-warning` | feedback/warning | #8A5A00 | #B29257 | Warning text, icons and borders |
| `--feedback-warning-bg` | feedback/warning-bg | #FFF2D8 | #362C1A | Dark value is derived (status flattened over the dark page colour), not authored in the so |
| `--icon` | icon/default | #212121 | #F5F5F5 | Bind all 203 icon components to this |
| `--icon-inverted` | icon/inverted | #F5F5F5 | #212121 | Icons on inverted surfaces. |
| `--icon-muted` | icon/muted | #888888 | #C0C0C0 | Secondary icons |
| `--text` | text/default | #212121 | #F5F5F5 | Default text. |
| `--inverted-text` | text/inverted | #F5F5F5 | #212121 | Text on inverted surfaces. |
| `--text-inverted-muted` | text/inverted-muted | #C0C0C0 | #6F6F6F | Secondary text on bg/inverted |
| `--link` | text/link | #212121 | #F5F5F5 | Links |
| `--text-muted` | text/muted | #6F6F6F | #C0C0C0 | Secondary text |
| `--text-on-accent` | text/on-accent | #212121 |  | Dark text on a soft accent surface or a light gradient |
| `--form-placeholder` | text/placeholder | #6F6F6F | #999999 | BUG FIX vs source: --form-placeholder aliased --brand-mid-grey, which is never declared an |
| `--button-surface-fill-hover` | button-surface/fill-hover | #212121 | #F5F5F5 | Fill of the Solid button, and of Outline and Ghost on hover |
| `--button-surface-fill-pressed` | button-surface/fill-pressed | #555555 | #D6D6D6 | Solid button while it is pressed |
| `--button-surface-fill-solid-hover` | button-surface/fill-solid-hover | #444444 | #ECECEC | Solid button under the pointer, and Outline and Ghost while pressed |
| `--button-surface-focus` | button-surface/focus | #212121 | #F5F5F5 | Focus ring of the button |
| `--button-surface-label` | button-surface/label | #212121 | #F5F5F5 | Label of the Outline and Ghost buttons |
| `--button-surface-label-hover` | button-surface/label-hover | #F5F5F5 | #212121 | Label of the Solid button, and of the others on hover |
| `--button-surface-stroke` | button-surface/stroke | #212121 | #F5F5F5 | Border of the Outline button |
| `--surface-bg` | surface/bg | #F5F5F5 | #212121 | Background of a section |
| `--surface-bg-raised` | surface/bg-raised | #FFFFFF | #212121 | Background of a card that sits on a section |
| `--surface-border` | surface/border | #ECECEC | #777777 | Hairlines and card borders on a section |
| `--surface-logo` | surface/logo | #212121 | #F5F5F5 | Logo colour |
| `--surface-logo-glyph` | surface/logo-glyph | #F5F5F5 | #FFFFFF | The glyph inside the compact logo mark |
| `--surface-text` | surface/text | #212121 | #F5F5F5 | Text and logo colour on a section |
| `--surface-text-muted` | surface/text-muted | #6F6F6F | #C0C0C0 | Secondary text on a section |

## 5. Components in this slice

### Button

Starts an action. Solid is the main action and there is one per view. Outline is the second choice. Ghost has no border and is for quiet actions such as Back and Cancel. On an inverted surface, set the Surface mode to Inverted on the section: every button inside follows. Corners stay at 0. No icon unless it adds meaning.

- **Style**: Ghost, Outline, Solid
- **State**: Default, Disabled, Focus, Hover, Pressed
- PROPOSAL, pending the owner: one Solid button per view is the primary action; Outline is secondary; Ghost only inside dense toolbars.
- Hover and Focus are behaviours of one button in code, not separate designs. Do not draw them as separate components.

### Input

Text field for short answers, and a textarea for longer ones.

- **Type**: Text, Textarea
- **State**: Default, Disabled, Error, Focus, Hover  ·  not allowed: Filled
- PROPOSAL, pending the owner: 'Filled' is not a state, it is a Default input with a value.
- The message slot under the field is always present, so validation never shifts the layout.

### Badge

Small status pill. Use it to show the state of an item in a table or list. Do not use it for actions or for decoration.

- **Tone**: Error, Info, Neutral, Success, Warning
- **Dot**: False, True
- PROPOSAL, pending the owner: a tone carries a meaning (Success, Info, Warning, Error). Neutral, Muted and Solid carry none; use Neutral unless told otherwise.
- Never choose a tone for decoration.

## 6. Before you hand anything back

- Run the checks. If a BLOCK check fails, your change is not ready.
- Say which tokens and components you used. If you needed something that does not exist, list it as a proposal; a person decides.
