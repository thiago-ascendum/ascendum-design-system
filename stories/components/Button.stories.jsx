import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { label: 'Save changes', style: 'solid', state: 'default' },
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
      use: ['Start the label with a verb and say what happens: "Save changes".', 'Keep one Solid button per view.', 'On a dark band, set data-context="inverted" on the section: every button inside follows.'],
      avoid: ['Two Solid buttons side by side.', 'Labels such as "Button", "OK" or "Click here".', 'Decorative arrows or icons that add no meaning.', 'Rounded corners: 0px is the brand signature.'],
      tokens: [
        ['ctx/primary', '--ctx-primary', 'Fill and border of Solid; fill of Outline and Ghost on hover'],
        ['ctx/primary-hover', '--ctx-primary-hover', 'Solid on hover; Outline and Ghost when pressed'],
        ['ctx/outline', '--ctx-outline', 'Border of Outline'],
        ['ctx/on-surface', '--ctx-on-surface', 'Label of Outline and Ghost'],
        ['ctx/on-primary', '--ctx-on-primary', 'Label of Solid, and of the others on hover'],
        ['component/button/padding-h', '--button-padding-h', 'Left and right padding (smaller on mobile)'],
        ['component/button/padding-v', '--button-padding-v', 'Top and bottom padding (smaller on mobile)'],
        ['radius/none', '--button-radius', 'Corners: 0'],
        ['ctx/focus', '--ctx-focus', 'Focus ring, 2px, set 4px off the edge'],
      ],
      a11y: [
        'Focus is a 2px ring set 4px away from the button, so it shows on any surface.',
        'The button is 48px high on desktop and 40px on mobile. Mobile is under the 44px touch target: an open point.',
        'Disabled is 40% opacity and cannot be focused. Prefer explaining why an action is unavailable.',
        'The label is the accessible name. An icon alone is not a button in this system.',
      ],
      open: [
        'Figma has 15 variants: three styles and five states. Focus could become a switch, which would leave 12.',
        'Solid on hover is one grey step (primary-hover). It is a proposal. Confirm it or change it.',
        'Should internal tools get rounded corners? The design review raises it at 9:30.',
      ],
      changes: ['1.1.0: Solid has a visible hover. The Figma set shows the inverted variants on a dark half. Focus is a visible ring.'],
    },
  },
};

export const Solid = {};
export const Outline = { args: { style: 'outline', label: 'Preview' } };
export const Ghost = { args: { style: 'ghost', label: 'Back' } };
export const Disabled = { args: { state: 'disabled' } };

export const Hierarchy = {
  name: 'In use: one main action',
  render: () => (
    <div className="sb-row">
      <Button style="ghost" label="Back" />
      <Button style="outline" label="Save draft" />
      <Button style="solid" label="Publish" />
    </div>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => (
    <div className="sb-surface-inverted sb-row" data-context="inverted">
      <Button style="solid" label="Get in touch" />
      <Button style="outline" label="See the work" />
      <Button style="ghost" label="Skip" />
    </div>
  ),
};
