import { SectionColumns } from '../../src/components/SectionColumns.jsx';

export default {
  title: 'Components/Section · Columns',
  component: SectionColumns,
  tags: ['autodocs'],
  args: { columns: '3' },
  parameters: {
    ds: {
      lead: 'Feature block with two to four columns. Use it to set out parallel points of equal weight.',
      group: 'Organisms',
      figma: '91:131',
      code: 'src/components/SectionColumns.jsx',
      sample: {},
    },
  },
};

export const Two = { args: { columns: '2' } };
export const Three = {};
export const Four = { args: { columns: '4' } };

export const OurProcess = {
  name: 'In use: how we work',
  render: () => (
    <SectionColumns columns="3">
      <div className="ds-section-columns__column"><h3 className="ds-section-columns__title">Discover</h3><p className="ds-section-columns__body">We learn what you need and what is already built.</p></div>
      <div className="ds-section-columns__column"><h3 className="ds-section-columns__title">Build</h3><p className="ds-section-columns__body">Short cycles, working software every week.</p></div>
      <div className="ds-section-columns__column"><h3 className="ds-section-columns__title">Launch</h3><p className="ds-section-columns__body">Go live with your team ready to run it.</p></div>
    </SectionColumns>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => <div data-context="inverted"><SectionColumns columns="4" /></div>,
};
