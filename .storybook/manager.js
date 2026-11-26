import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The frame around the pages (sidebar, toolbar) follows the same theme as the pages, like the Figma file.
// Values from build/tokens.css: Light and Dark of the Semantic collection. Barlow everywhere.
const common = {
  brandTitle: 'Ascendum Design System',
  brandUrl: 'https://github.com/thiago-ascendum/ascendum-design-system',
  fontBase: 'Barlow, system-ui, sans-serif',
  appBorderRadius: 16,
  inputBorderRadius: 4,
};

const light = create({
  ...common,
  base: 'light',
  colorPrimary: '#212121',
  colorSecondary: '#212121',
  appBg: '#f5f5f5',
  appContentBg: '#f5f5f5',
  appPreviewBg: '#f5f5f5',
  appBorderColor: '#ececec',
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
});

const dark = create({
  ...common,
  base: 'dark',
  colorPrimary: '#f5f5f5',     // primary
  colorSecondary: '#555555',   // selected item: white text on neutral-800, 7.4:1
  appBg: '#262626',            // surface-container-low
  appContentBg: '#212121',     // surface
  appPreviewBg: '#212121',
  appBorderColor: '#444444',   // surface-container-high
  textColor: '#f5f5f5',        // on-surface
  textInverseColor: '#212121',
  textMutedColor: '#c0c0c0',   // on-surface-variant
  barBg: '#2a2a2a',            // surface-container
  barTextColor: '#c0c0c0',
  barSelectedColor: '#f5f5f5',
  barHoverColor: '#f5f5f5',
  inputBg: '#2a2a2a',
  inputBorder: '#777777',
  inputTextColor: '#f5f5f5',
});

addons.setConfig({ theme: light });

// When the theme global changes (toolbar or the Dark / Light switch on the page), the frame changes with it.
addons.register('ascendum/theme-sync', (api) => {
  let current = null;
  const apply = (globals) => {
    const next = globals && globals.theme === 'dark' ? 'dark' : 'light';
    if (next === current) return;
    current = next;
    api.setOptions({ theme: next === 'dark' ? dark : light });
  };
  const channel = api.getChannel();
  channel.on('setGlobals', (e) => apply(e && e.globals));
  channel.on('globalsUpdated', (e) => apply(e && e.globals));
  try { apply(api.getGlobals()); } catch (e) { /* not ready yet: the events above cover it */ }
});
