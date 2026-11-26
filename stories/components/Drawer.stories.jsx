import { useState } from 'react';
import { Drawer, DrawerOverlay } from '../../src/components/Drawer.jsx';
import { Button } from '../../src/components/Button.jsx';

const BODY = 'Drawer content: place molecules here.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: { title: 'Filters', side: 'right', children: BODY },
  parameters: {
    ds: {
      lead: 'Side panel for detail or editing while the page stays visible behind it. Use it for a secondary task on one item; use Modal for a short confirmation.',
      group: 'Organisms',
      figma: '88:53',
      code: 'src/components/Drawer.jsx',
      sample: { children: BODY },
      use: ['Use it for filters and details that keep the page behind in view.', 'Give it a title and a close button.'],
      avoid: ['Stacking one drawer on another.', 'Using it to confirm an action: use Modal.'],
      tokens: [
        ['surface-container', '--surface-container', 'Fill'],
        ['outline-variant', '--outline-variant', 'Line under the header'],
        ['on-surface', '--on-surface', 'Title and close icon'],
        ['on-surface-variant', '--on-surface-variant', 'Body text'],
        ['component/drawer/width', '--drawer-width', 'Width'],
        ['component/drawer/padding', '--drawer-padding', 'Padding'],
        ['radius/card', '--radius-card', 'Corners'],
      ],
      a11y: ['role="dialog" and aria-modal, named by its title; the Close button has an accessible name.', 'DrawerOverlay moves focus in, keeps Tab inside, closes on Escape and returns focus.'],
      open: ['Width and padding were inferred. The source had no drawer spec. Confirm them.'],
    },
  },
};

export const Right = {};
export const Left = { args: { side: 'left' } };

export const InUse = {
  name: 'In use: filters over a list',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button label="Filters" style="outline" onClick={() => setOpen(true)} />
        <DrawerOverlay open={open} onClose={() => setOpen(false)}>
          <Drawer title="Filters" onClick={() => setOpen(false)}>{BODY}</Drawer>
        </DrawerOverlay>
      </div>
    );
  },
};
