import * as React from 'react';

const EuiIconFunction = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13 2.226v2.218c-.359-.143-.845-.218-1.315-.218-1.059 0-1.631.519-1.802 1.565l-.168.937h2.798v2.159H9.41l-.313 1.674C8.696 12.987 7.261 14 4.785 14c-.718 0-1.35-.092-1.785-.251v-2.243c.418.176.905.268 1.383.268 1.008 0 1.546-.435 1.725-1.523l.24-1.364H3.787V6.728h2.812l.288-1.264C7.286 3.071 8.662 2 11.352 2c.598 0 1.306.1 1.648.226z" />
  </svg>
);

export const icon = EuiIconFunction;
