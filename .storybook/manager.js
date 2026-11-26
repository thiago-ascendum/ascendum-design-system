import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The frame around the pages uses the light values of the system, like the Figma file:
// milkyway page, white panels, midnight text, Barlow. Values from build/tokens.css (Light).
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Ascendum Design System',
    brandUrl: 'https://github.com/thiago-ascendum/ascendum-design-system',
    fontBase: 'Barlow, system-ui, sans-serif',
    colorPrimary: '#212121',
    colorSecondary: '#212121',
    appBg: '#f5f5f5',
    appContentBg: '#f5f5f5',
    appPreviewBg: '#f5f5f5',
    appBorderColor: '#ececec',
    appBorderRadius: 16,
    textColor: '#212121',
    textInverseColor: '#f5f5f5',
    textMutedColor: '#6f6f6f',
    barBg: '#ffffff',
    barTextColor: '#6f6f6f',
    barSelectedColor: '#212121',
    barHoverColor: '#212121',
    inputBg: '#ffffff',
    inputBorder: '#888888',
    inputTextColor: '#212121',
    inputBorderRadius: 4,
  }),
});
