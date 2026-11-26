import { useState } from 'react';
import PropTypes from 'prop-types';
import './CodeBlock.css';

/**
 * A short, read-only snippet with its language and a Copy action. It sits on the inverted surface so it reads
 * as code at a glance. Five lines or fewer: for longer files, link to the source. The code is the children,
 * one line per line break. The language shown in the header is passed as `language`.
 * Props mirror the Figma component: it has no properties.
 */
export function CodeBlock({ children, language = '' }) {
  const [copied, setCopied] = useState(false);
  const code = String(children == null ? '' : children);
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(() => setCopied(true), () => {});
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <figure className="ds-code-block">
      <figcaption className="ds-code-block__header">
        <span className="ds-code-block__language">{language}</span>
        <button type="button" className="ds-code-block__action" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
      </figcaption>
      <pre className="ds-code-block__body" tabIndex={0}>
        <code>{code.split('\n').map((line, i) => <span className="ds-code-block__line" key={i}>{line}</span>)}</code>
      </pre>
    </figure>
  );
}

CodeBlock.propTypes = {
  /** The code, one line per line break. */
  children: PropTypes.string,
  /** The language named in the header, such as CSS. Figma draws it as a layer, not a property: content, like children. */
  language: PropTypes.string,
};
