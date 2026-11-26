import { CodeBlock } from '../../src/components/CodeBlock.jsx';

const SNIPPET = `import { Button } from '@ascendum/ds';\n\n<Button label="Save changes" />`;

export default {
  title: 'Components/Code Block',
  component: CodeBlock,
  tags: ['autodocs'],
  args: { children: SNIPPET, language: 'JSX' },
  parameters: {
    ds: {
      lead: 'A short, read-only snippet with its language and a Copy action. It sits on the inverted surface so it reads as code at a glance.',
      group: 'Molecules',
      figma: '85:110',
      code: 'src/components/CodeBlock.jsx',
      sample: { children: SNIPPET, language: 'JSX' },
      when: [
        ['Short examples', 'Five lines or fewer, in documentation or a hand-off.'],
        ['Whole files', 'Link to the source instead.'],
      ],
      use: ['Show real, working code of five lines or fewer.', 'Name the language in the header.'],
      avoid: ['Pasting whole files: link to the source instead.', 'Using it for text that is not code.'],
      tokens: [
        ['inverse-surface', '--inverse-surface', 'Fill'],
        ['inverse-on-surface', '--inverse-on-surface', 'Code and Copy'],
        ['inverse-on-surface-variant', '--inverse-on-surface-variant', 'Language'],
        ['outline-medium', '--outline-medium', 'Line under the header'],
        ['border-width/hairline', '--border-width-hairline', 'Line width'],
        ['component/code/head-padding-h', '--code-head-padding-h', 'Header left and right padding'],
        ['component/code/head-padding-v', '--code-head-padding-v', 'Header top and bottom padding'],
        ['component/code/body-padding', '--code-body-padding', 'Body padding'],
        ['space/3xs', '--space-3xs', 'Space between lines'],
        ['radius/card', '--radius-card', 'Corners'],
      ],
      a11y: [
        'Copy is a real button; its label changes to Copied for two seconds and is announced politely.',
        'The code area takes keyboard focus so long lines can be scrolled.',
        'Text 8.9:1 on its background in light mode. Passes AA.',
      ],
      open: ['Barlow is not monospaced, so code does not line up in columns. Accept that, or allow one mono face here only?'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: a hand-off note',
  render: () => (
    <div className="sb-card" style={{ width: 560 }}>
      <span className="sb-label">Using the button</span>
      <span className="sb-help">Import the component, then pass a label.</span>
      <CodeBlock language="JSX">{SNIPPET}</CodeBlock>
    </div>
  ),
};
