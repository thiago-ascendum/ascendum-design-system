import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { label: 'Save changes', variant: 'solid', surface: 'primary', disabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'Built from the tokens of the Figma component, binding for binding. **Use:** Solid for the one main action of a view, Outline for the second choice, Ghost for quiet actions such as Back and Cancel. **Avoid:** two Solid buttons side by side, decorative arrows, labels like "Button" or "Click here". **Open questions for the owner:** 24 variants in Figma (three styles, two surfaces, four states): which stay? Solid on hover is one grey step, a proposal. Should internal tools get rounded corners?',
      },
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
