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
    docs: { page: DocPage, container: ThemedDocsContainer },
    options: { storySort: { order: ['Start here', ['Getting started', 'Pipeline proof', 'Lifecycle', 'Audit status', 'Changelog', 'Every change', 'Governance'], 'Foundations', ['Typography', 'Spacing, Grid & Layout', 'Radius & Elevation', 'Iconography', 'Tone of Voice', 'Logo', 'Colour', 'Photography'], 'Components', ['Catalogue'], 'Patterns'] } },
  },
};

export default preview;
