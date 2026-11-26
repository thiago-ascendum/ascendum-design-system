import { useEffect } from 'react';
import '../build/tokens.css';
import './preview.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'Light or dark: the Semantic collection of the Figma file',
      toolbar: { title: 'Theme', icon: 'circlehollow', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    options: { storySort: { order: ['Start here', ['Getting started', 'Changelog', 'Governance'], 'Foundations', 'Components'] } },
  },
};

export default preview;
