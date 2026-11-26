import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { label: 'Save changes', variant: 'solid', surface: 'primary', disabled: false },
  parameters: {
    ds: {
      lead: 'Starts an action. One main action per view, and the button says what happens with a verb.',
      group: 'Atoms',
      figma: '23:50',
      code: 'src/components/Button.jsx',
      when: [
        ['Solid: the main action', 'One per view. It is the thing the person came to do: Save, Publish, Send.'],
        ['Outline: the second choice', 'A real alternative next to the main action: Save draft, Preview.'],
        ['Ghost: quiet actions', 'No border. For Back, Cancel and Skip, so they never compete with the main action.'],
      ],
      use: ['Start the label with a verb and say what happens: "Save changes".', 'Keep one Solid button per view.', 'Use the inverted surface on dark sections.'],
      avoid: ['Two Solid buttons side by side.', 'Labels such as "Button", "OK" or "Click here".', 'Decorative arrows or icons that add no meaning.', 'Rounded corners: 0px is the brand signature.'],
      tokens: [
        ['button/fill-hover', '--button-fill-hover', 'Fill and border of Solid; fill of Outline and Ghost on hover'],
        ['button/fill-solid-hover', '--button-fill-solid-hover', 'Solid on hover (a proposal)'],
        ['button/stroke', '--button-stroke', 'Border of Outline'],
        ['button/label', '--button-label', 'Label of Outline and Ghost'],
        ['button/label-hover', '--button-label-hover', 'Label of Solid, and of the others on hover'],
        ['component/button/padding-h', '--button-padding-h', 'Left and right padding: 28 desktop, 22 mobile'],
        ['component/button/padding-v', '--button-padding-v', 'Top and bottom padding: 16 desktop, 12 mobile'],
        ['radius/none', '--button-radius', 'Corners: 0'],
        ['border/focus', '--border-focus', 'Focus ring, 2px, set 4px off the edge'],
      ],
      a11y: [
        'Focus is a 2px ring set 4px away from the button, so it shows on any surface.',
        'The button is 48px high on desktop and 40px on mobile. Mobile is under the 44px touch target: an open point.',
        'Disabled is 40% opacity and cannot be focused. Prefer explaining why an action is unavailable.',
        'The label is the accessible name. An icon alone is not a button in this system.',
      ],
      open: [
        'Figma has 15 variants: three styles and five states. Focus could become a switch, which would leave 12.',
        'Solid on hover is one grey step (button/fill-solid-hover). It is a proposal. Confirm it or change it.',
        'Should internal tools get rounded corners? The design review raises it at 9:30.',
      ],
      changes: ['1.1.0: Solid has a visible hover. The Figma set shows the inverted variants on a dark half. Focus is a visible ring.'],
    },
  },
};

export const Solid = {};
export const Outline = { args: { variant: 'outline', label: 'Preview' } };
export const Ghost = { args: { variant: 'ghost', label: 'Back' } };
export const Disabled = { args: { disabled: true } };

export const Hierarchy = {
  name: 'In use: one main action',
  render: () => (
    <div className="sb-row">
      <Button variant="ghost" label="Back" />
      <Button variant="outline" label="Save draft" />
      <Button variant="solid" label="Publish" />
    </div>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => (
    <div className="sb-surface-inverted sb-row">
      <Button surface="inverted" variant="solid" label="Get in touch" />
      <Button surface="inverted" variant="outline" label="See the work" />
      <Button surface="inverted" variant="ghost" label="Skip" />
    </div>
  ),
};
