import { useState } from 'react';
import { Modal, ModalTitle, ModalText, ModalActions, ModalOverlay } from '../../src/components/Modal.jsx';
import { Button } from '../../src/components/Button.jsx';

const content = (
  <>
    <ModalTitle>Publish this library?</ModalTitle>
    <ModalText>Every file subscribing to this library will receive the update. Write a changelog entry before you publish.</ModalText>
    <ModalActions>
      <Button label="Cancel" style="ghost" />
      <Button label="Publish" style="solid" />
    </ModalActions>
  </>
);

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { children: content },
  parameters: {
    ds: {
      lead: 'A short dialogue that stops the page until the person confirms or cancels.',
      group: 'Organisms',
      figma: '88:22',
      code: 'src/components/Modal.jsx',
      sample: { children: content },
      use: ['Put the main action last, on the right.', 'Say what will happen in the title.'],
      avoid: ['Putting a long form inside a modal.', 'Opening one from another modal.'],
      tokens: [
        ['surface-container', '--surface-container', 'Fill'],
        ['on-surface', '--on-surface', 'Title'],
        ['on-surface-variant', '--on-surface-variant', 'Text'],
        ['outline-variant', '--outline-variant', 'Line above the actions'],
        ['radius/card', '--radius-card', 'Corners'],
        ['component/modal/max-width', '--modal-max-width', 'Width'],
        ['component/modal/padding-h', '--modal-padding-h', 'Left and right padding'],
        ['component/modal/head-padding', '--modal-head-padding', 'Space above the title'],
        ['component/modal/body-padding', '--modal-body-padding', 'Space around the text and actions'],
        ['component/modal/actions-gap', '--modal-actions-gap', 'Space between buttons'],
      ],
      a11y: ['role="dialog" and aria-modal, named by its title.', 'ModalOverlay moves focus in, keeps Tab inside, closes on Escape and returns focus.', 'Text 16.1:1 on its background in light mode.'],
      open: ['The small label above the title was removed. Bring it back only if it carries information.'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: confirming a publish',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button label="Publish library" onClick={() => setOpen(true)} />
        <ModalOverlay open={open} onClose={() => setOpen(false)}>
          <Modal>
            <ModalTitle>Publish this library?</ModalTitle>
            <ModalText>Every file subscribing to this library will receive the update. Write a changelog entry before you publish.</ModalText>
            <ModalActions>
              <Button label="Cancel" style="ghost" onClick={() => setOpen(false)} />
              <Button label="Publish" style="solid" onClick={() => setOpen(false)} />
            </ModalActions>
          </Modal>
        </ModalOverlay>
      </div>
    );
  },
};
