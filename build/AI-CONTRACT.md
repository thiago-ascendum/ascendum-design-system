# Ascendum Design System · contract for AI tools

Generated from snapshot `live` on 2026-11-26. Do not edit by hand: change the design system, then regenerate.

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
| `--type-size-13` | type-size/13 | 13 | 26 | Font size 13 px |
| `--type-size-14` | type-size/14 | 14 | 28 | Font size 14 px |
| `--type-size-15` | type-size/15 | 15 | 30 | Font size 15 px |
| `--type-size-16` | type-size/16 | 16 | 32 | Font size 16 px |
| `--type-size-17` | type-size/17 | 17 | 34 | Font size 17 px |
| `--type-size-18` | type-size/18 | 18 | 36 | Font size 18 px |
| `--type-size-20` | type-size/20 | 20 | 40 | Font size 20 px |
| `--type-size-22` | type-size/22 | 22 | 44 | Font size 22 px |
| `--type-size-24` | type-size/24 | 24 | 48 | Font size 24 px |
| `--type-size-28` | type-size/28 | 28 | 56 | Font size 28 px |
| `--type-size-32` | type-size/32 | 32 | 64 | Font size 32 px |
| `--type-size-36` | type-size/36 | 36 | 72 | Font size 36 px |
| `--type-size-40` | type-size/40 | 40 | 80 | Font size 40 px |
| `--type-size-42` | type-size/42 | 42 | 84 | Font size 42 px |
| `--type-size-44` | type-size/44 | 44 | 88 | Font size 44 px |
| `--type-size-48` | type-size/48 | 48 | 96 | Font size 48 px |
| `--type-size-56` | type-size/56 | 56 | 112 | Font size 56 px |
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
| `--ctx-focus` | ctx/focus | #212121 | #F5F5F5 | Follows the Context mode: focus, or inverse-outline. |
| `--ctx-logo` | ctx/logo | #212121 | #F5F5F5 | Logo colour |
| `--ctx-logo-glyph` | ctx/logo-glyph | #F5F5F5 | #212121 | The glyph inside the compact logo mark |
| `--ctx-on-primary` | ctx/on-primary | #F5F5F5 | #212121 | Follows the Context mode: on-primary, or inverse-on-primary. |
| `--ctx-on-surface` | ctx/on-surface | #212121 | #F5F5F5 | Follows the Context mode: on-surface, or inverse-on-surface. |
| `--ctx-on-surface-variant` | ctx/on-surface-variant | #6F6F6F | #C0C0C0 | Follows the Context mode: on-surface-variant, or inverse-on-surface-variant. |
| `--ctx-outline` | ctx/outline | #212121 | #F5F5F5 | Follows the Context mode: outline, or inverse-outline. |
| `--ctx-outline-variant` | ctx/outline-variant | #ECECEC | #777777 | Follows the Context mode: outline-variant, or inverse-outline-variant. |
| `--ctx-primary` | ctx/primary | #212121 | #F5F5F5 | Follows the Context mode: primary, or inverse-primary. |
| `--ctx-primary-hover` | ctx/primary-hover | #444444 | #ECECEC | Follows the Context mode: primary-hover, or inverse-primary-hover. |
| `--ctx-primary-pressed` | ctx/primary-pressed | #555555 | #D6D6D6 | Follows the Context mode: primary-pressed, or inverse-primary-pressed. |
| `--ctx-surface` | ctx/surface | #F5F5F5 | #212121 | Follows the Context mode: surface, or inverse-surface on an inverted band. |
| `--ctx-surface-container` | ctx/surface-container | #FFFFFF | #212121 | Follows the Context mode: surface-container, or inverse-surface. |
| `--border-width-button` | border-width/button | 2 |  | Button outline weight. |
| `--border-width-field` | border-width/field | 1.5 |  | Form field border |
| `--border-width-focus` | border-width/focus | 2 |  | Weight of the keyboard focus ring. |
| `--border-width-hairline` | border-width/hairline | 1 |  | Dividers and card borders. |
| `--text-body-size` | font-size/body | 16 |  | Font size of Body/Default, Body/Default Semi-Bold. |
| `--text-body-lg-size` | font-size/body-lg | 18 |  | Font size of Body/Large. |
| `--font-size-body-sm` | font-size/body-sm | 15 |  | Dense-UI text, tables, meta rows, chips |
| `--text-button-size` | font-size/button | 17 | 16 | 17px desktop / 16px mobile |
| `--font-size-caption` | font-size/caption | 13 |  | Smallest supported size |
| `--text-display-size` | font-size/display | 56 | 42 | Font size of Heading/Display. |
| `--text-footnote-size` | font-size/footnote | 14 |  | Font size of UI/Footnote. |
| `--text-h1-size` | font-size/h1 | 48 | 36 | H1 size: the one title of a page. |
| `--text-h2-size` | font-size/h2 | 40 | 32 | Font size of Heading/H2. |
| `--text-h3-size` | font-size/h3 | 32 | 28 | H3 size: a section title inside a page. |
| `--text-h4-size` | font-size/h4 | 24 | 22 | Fills the gap between H3 (20) and H2 (40) |
| `--text-h5-size` | font-size/h5 | 20 |  | H5 size: small section headings inside cards, alerts and panels. |
| `--text-h6-size` | font-size/h6 | 18 |  | H6 size: the title of a card, a list group or a form section. |
| `--text-h7-size` | font-size/h7 | 16 |  | H7 size: the smallest heading, above a short block of text. |
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
| `--accent-blue-container` | accent-blue-container | #CAE6F3 |  | Blue brand accent background. |
| `--accent-purple-container` | accent-purple-container | #E4C9F9 |  | Purple brand accent background. |
| `--accent-red-container` | accent-red-container | #F0D3D5 |  | Red brand accent background: tags and avatars. |
| `--accent-stone-container` | accent-stone-container | #DEDBDA |  | Stone brand accent background. |
| `--error` | error | #B02A32 |  | Solid error fill: the same strong colour in Light and Dark, with on-error (white) on top |
| `--error-container` | error-container | #FDF1F2 | #3E2324 | Background of an error message. |
| `--focus` | focus | #212121 | #F5F5F5 | Focus ring on every interactive element. |
| `--info` | info | #427BB1 | #2369AA | Solid information fill: the same strong colour in Light and Dark, with on-info (white) on  |
| `--info-container` | info-container | #F3F8FD | #212F3C | Background of an information message. |
| `--inverse-on-primary` | inverse-on-primary | #212121 | #F5F5F5 | Text and icons on inverse-primary. |
| `--inverse-on-surface` | inverse-on-surface | #F5F5F5 | #212121 | Text and icons on inverse-surface. |
| `--inverse-on-surface-variant` | inverse-on-surface-variant | #C0C0C0 | #6F6F6F | Secondary text on inverse-surface. |
| `--inverse-outline` | inverse-outline | #F5F5F5 | #212121 | Strong borders and focus on inverse-surface. |
| `--inverse-outline-variant` | inverse-outline-variant | #777777 | #999999 | Dividers and quiet borders on inverse-surface. |
| `--inverse-primary` | inverse-primary | #F5F5F5 | #212121 | Primary on inverse-surface. |
| `--inverse-primary-hover` | inverse-primary-hover | #ECECEC | #444444 | Inverse-primary under the pointer. |
| `--inverse-primary-pressed` | inverse-primary-pressed | #D6D6D6 | #555555 | Inverse-primary while pressed. |
| `--inverse-surface` | inverse-surface | #212121 | #F5F5F5 | A surface that is the opposite of the page: dark bands, toasts, tooltips. |
| `--on-accent-container` | on-accent-container | #212121 |  | Text and icons on any accent container. |
| `--on-error` | on-error | #FFFFFF |  | Text and icons on the solid error fill |
| `--on-error-container` | on-error-container | #7A2D31 | #F4DDDF | Text and icons on an error container. |
| `--on-info` | on-info | #FFFFFF |  | Text and icons on the solid information fill |
| `--on-info-container` | on-info-container | #1E496E | #D9E4EE | Text and icons on an information container. |
| `--on-primary` | on-primary | #F5F5F5 | #212121 | Text and icons on primary. |
| `--on-success` | on-success | #FFFFFF |  | Text and icons on the solid success fill |
| `--on-success-container` | on-success-container | #1B5035 | #D6E6DC | Text and icons on a success container. |
| `--on-surface` | on-surface | #212121 | #F5F5F5 | Main text and icons on any surface. |
| `--on-surface-error` | on-surface-error | #B02A32 | #E9BBBE | Error text, icons and borders on any surface |
| `--on-surface-info` | on-surface-info | #2369AA | #B3C9DF | Info text, icons and borders on any surface |
| `--on-surface-placeholder` | on-surface-placeholder | #6F6F6F | #999999 | Placeholder text inside empty fields. |
| `--on-surface-success` | on-surface-success | #1C7A4A | #AECEBB | Success text, icons and borders on any surface |
| `--on-surface-variant` | on-surface-variant | #6F6F6F | #C0C0C0 | Secondary text, labels and quiet icons. |
| `--on-surface-warning` | on-surface-warning | #8A5A00 | #DAC49B | Warning text, icons and borders on any surface |
| `--on-warning` | on-warning | #FFFFFF |  | Text and icons on the solid warning fill |
| `--on-warning-container` | on-warning-container | #5C4212 | #F1E1C2 | Text and icons on a warning container. |
| `--outline` | outline | #212121 | #F5F5F5 | Strong borders: fields, outline buttons, selected controls. |
| `--outline-medium` | outline-medium | #888888 | #999999 | Medium borders: a search field at rest, drop zones, media placeholders and the empty-state |
| `--outline-variant` | outline-variant | #ECECEC | #555555 | Dividers and card borders. |
| `--primary` | primary | #212121 | #F5F5F5 | The main action: Solid button fill, links, selected controls. |
| `--primary-hover` | primary-hover | #444444 | #ECECEC | Primary under the pointer. |
| `--primary-pressed` | primary-pressed | #555555 | #D6D6D6 | Primary while pressed. |
| `--success` | success | #1C7A4A |  | Solid success fill: the same strong colour in Light and Dark, with on-success (white) on t |
| `--success-container` | success-container | #EEF7F1 | #203329 | Background of a success message. |
| `--surface` | surface | #F5F5F5 | #212121 | Page background |
| `--surface-container` | surface-container | #FFFFFF | #2A2A2A | Cards, dialogs, panels and fields |
| `--surface-container-high` | surface-container-high | #F5F5F5 | #444444 | Menus, popovers and the hover of a row or card. |
| `--surface-container-highest` | surface-container-highest | #ECECEC | #555555 | Highest container: skeleton blocks and tracks. |
| `--surface-container-low` | surface-container-low | #FAFAFA | #262626 | Quiet areas inside a page: rails, table headers, grouped rows. |
| `--surface-hover` | surface-hover | #ECECEC | #444444 | An unselected control or neutral element under the pointer. |
| `--surface-pressed` | surface-pressed | #D6D6D6 | #555555 | An unselected control or neutral element while pressed. |
| `--transparent` | transparent | #00000000 |  | No fill |
| `--warning` | warning | #8A5A00 |  | Solid warning fill: the same strong colour in Light and Dark, with on-warning (white) on t |
| `--warning-container` | warning-container | #FFF2D8 | #362C1A | Background of a warning message. |

## 5. Components in this slice

### Button

Starts an action. Solid is the main action and there is one per view. Outline is the second choice. Ghost has no border and is for quiet actions such as Back and Cancel. On an inverted surface, set the Context mode to Inverted on the section: every button inside follows. Corners stay at 0. No icon unless it adds meaning.

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
