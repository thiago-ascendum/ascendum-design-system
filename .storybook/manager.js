import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The frame around the stories carries the name and the two brand colours of the system.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Ascendum Design System',
    brandUrl: 'https://github.com/thiago-ascendum/ascendum-design-system',
    fontBase: 'Barlow, system-ui, sans-serif',
    colorPrimary: '#212121',
    colorSecondary: '#212121',
    appBg: '#f5f5f5',
    appContentBg: '#ffffff',
    appBorderRadius: 8,
    textColor: '#212121',
    barSelectedColor: '#212121',
    barHoverColor: '#212121',
  }),
});
