import { FileUploader } from '../../src/components/FileUploader.jsx';

export default {
  title: 'Components/File Uploader',
  component: FileUploader,
  tags: ['autodocs'],
  args: { state: 'idle' },
  decorators: [(Story) => <div style={{ width: 440 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A drop zone for adding files. It says what is accepted, and when an upload fails it says why and offers a way to try again.',
      group: 'Molecules',
      figma: '84:147',
      code: 'src/components/FileUploader.jsx',
      sample: {},
    },
  },
};

export const Idle = {};
export const Active = { args: { state: 'active' } };
export const Error = { args: { state: 'error' } };

export const InUse = {
  name: 'In use: a project brief form',
  render: () => (
    <div className="sb-col">
      <span className="sb-label">Project brief</span>
      <FileUploader />
      <span className="sb-label">Signed contract</span>
      <FileUploader state="error" />
    </div>
  ),
};
