import { BreadcrumbItem } from '../../src/components/BreadcrumbItem.jsx';

export default {
  title: 'Components/Breadcrumb Item',
  component: BreadcrumbItem,
  tags: ['autodocs'],
  args: { label: 'Projects', separator: true, state: 'link' },
  parameters: {
    ds: {
      lead: 'One step in the trail back up a page hierarchy. Earlier steps are muted links, the current page is semi-bold and has no chevron after it.',
      group: 'Molecules',
      figma: '81:122',
      code: 'src/components/BreadcrumbItem.jsx',
      sample: {},
      when: [
        ['Pages two or more levels deep', 'So people can step back up the hierarchy.'],
        ['Top-level pages', 'Do not use it there.'],
      ],
      use: ['Start at the top level and end at the current page.', 'Make every step except the last one a link.'],
      avoid: ['Truncating the trail to fewer than three steps.', 'Using it as the main navigation of the product.'],
      tokens: [
        ['on-surface-variant', '--on-surface-variant', 'Link and chevron'],
        ['on-surface', '--on-surface', 'Hover and current'],
        ['component/breadcrumb/gap', '--breadcrumb-gap', 'Space between label and chevron'],
        ['size/icon-sm', '--size-icon-sm', 'Chevron size'],
      ],
      a11y: [
        'Wrap the trail in <nav aria-label="Breadcrumb"> with an ordered list. The current item has aria-current="page".',
        'Text 5.0:1 on its background in light mode. Passes AA.',
        'It is 20 px high, below the 44 px touch target: fine with a pointer, add spacing on mobile.',
      ],
      open: [],
    },
  },
};

export const Link = {};
export const Current = { args: { state: 'current', separator: false } };

export const InUse = {
  name: 'In use: three levels deep',
  render: () => (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: 8 }}>
      <BreadcrumbItem label="Home" />
      <BreadcrumbItem label="Projects" />
      <BreadcrumbItem label="Atlas migration" state="current" separator={false} />
    </nav>
  ),
};
