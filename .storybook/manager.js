import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The frame around the stories uses the dark values of the system: midnight, milkyway and Barlow.
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Ascendum Design System',
    brandUrl: 'https://github.com/thiago-ascendum/ascendum-design-system',
    fontBase: 'Barlow, system-ui, sans-serif',
    colorPrimary: '#f5f5f5',
    colorSecondary: '#555555',
    appBg: '#1e1e1e',
    appContentBg: '#212121',
    appPreviewBg: '#212121',
    appBorderColor: '#444444',
    appBorderRadius: 8,
    textColor: '#f5f5f5',
    textInverseColor: '#212121',
    textMutedColor: '#c0c0c0',
    barBg: '#262626',
    barTextColor: '#c0c0c0',
    barSelectedColor: '#f5f5f5',
    barHoverColor: '#f5f5f5',
    inputBg: '#2a2a2a',
    inputBorder: '#555555',
    inputTextColor: '#f5f5f5',
    inputBorderRadius: 4,
  }),
});
