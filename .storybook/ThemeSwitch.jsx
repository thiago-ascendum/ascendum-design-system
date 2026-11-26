import { useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';

// Light / Dark, always visible at the top of every page. It sets the same "theme" global as the toolbar,
// so the page, the components and the frame around them (sidebar, toolbar) change together.
const read = () => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function ThemeSwitch() {
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  const choose = (value) => {
    document.documentElement.dataset.theme = value;
    setTheme(value);
    addons.getChannel().emit('updateGlobals', { globals: { theme: value } });
  };
  return (
    <div className="ads-theme-switch" role="radiogroup" aria-label="Theme">
      {[['light', 'Light'], ['dark', 'Dark']].map(([value, label]) => (
        <button key={value} type="button" role="radio" aria-checked={theme === value}
          className={theme === value ? 'is-on' : undefined} onClick={() => choose(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export function ThemeBar() {
  return <div className="ads-themebar"><ThemeSwitch /></div>;
}

export function ThemeFloat() {
  return <div className="ads-themefloat"><ThemeSwitch /></div>;
}
