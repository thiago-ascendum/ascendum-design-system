import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button.jsx';
import './FileUploader.css';

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 5v22M5 16h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
);
const WarningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 4L29 27H3L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" /><path d="M16 12v8M16 23v2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/**
 * A drop zone for adding files. It says what is accepted, and when an upload fails it says why and offers Try again.
 * The file list and the progress live in code, outside this component. Pass the failure reason as children.
 * Props mirror the Figma component: State. Active is also set while a file is dragged over the zone.
 */
export function FileUploader({ state = 'idle', children, onChange, onClick, ...rest }) {
  const [dragging, setDragging] = useState(false);
  const input = useRef(null);
  const shown = dragging && state === 'idle' ? 'active' : state;
  const error = shown === 'error';
  return (
    <div
      className={`ds-file-uploader ds-file-uploader--${shown}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); if (onChange) onChange({ target: { files: e.dataTransfer.files } }); }}
    >
      <span className="ds-file-uploader__icon">{error ? <WarningIcon /> : <PlusIcon />}</span>
      <p className="ds-file-uploader__title">{error ? 'Upload failed' : 'Drop files here'}</p>
      <p className="ds-file-uploader__text">
        {error ? (children || 'That file type is not supported.') : (
          <>or <button type="button" className="ds-file-uploader__browse" onClick={() => input.current && input.current.click()}>browse to choose a file</button></>
        )}
      </p>
      <p className="ds-file-uploader__hint">PNG, JPG or PDF · max 10 MB</p>
      {error ? <Button label="Try again" style="outline" onClick={onClick} /> : null}
      <input ref={input} className="ds-file-uploader__file" type="file" tabIndex={-1} aria-label="Choose files" onChange={onChange} {...rest} />
    </div>
  );
}

FileUploader.propTypes = {
  /** Figma: State. Idle waits, Active is a file over the zone, Error says why the upload failed and offers Try again. */
  state: PropTypes.oneOf(['idle', 'active', 'error']),
  /** The reason the upload failed, shown in the Error state. */
  children: PropTypes.node,
  onChange: PropTypes.func,
  /** Called by the Try again button. */
  onClick: PropTypes.func,
};
