import { useEffect } from 'react';
import '../build/tokens.css';
import './preview.css';
import './docs.css';
import { DocPage, ThemedDocsContainer } from './DocPage.jsx';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'Dark or light: the Semantic collection of the Figma file',
      toolbar: { title: 'Theme', icon: 'circlehollow', items: [{ value: 'dark', title: 'Dark' }, { value: 'light', title: 'Light' }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: { page: DocPage, container: ThemedDocsContainer },
    options: { storySort: { order: ['Start here', ['Getting started', 'Lifecycle', 'Audit status', 'Changelog', 'Governance'], 'Foundations', 'Components', ['Catalogue']] } },
  },
};

export default preview;
