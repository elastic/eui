import * as React from 'react';

const EuiIconTokenNested = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fillRule="evenodd">
      <path d="M11 3c1.044 0 1.913.757 1.994 1.736l.006.149v6.23c0 1-.82 1.805-1.845 1.88L11 13H9.501a.5.5 0 01-.09-.992l.09-.008H11c.52 0 .937-.35.993-.783l.007-.102v-6.23c0-.445-.379-.827-.882-.879L11 4H9.5a.5.5 0 01-.09-.992L9.5 3H11zM6.5 3a.5.5 0 01.09.992L6.5 4H5c-.52 0-.937.35-.993.783L4 4.885v6.23c0 .445.379.827.882.879L5 12h1.5a.5.5 0 01.09.992L6.5 13H5c-1.044 0-1.913-.757-1.994-1.736L3 11.115v-6.23c0-1 .82-1.805 1.845-1.88L5 3h1.5z" />
      <path d="M5.864 7.25a.714.714 0 110 1.429.714.714 0 010-1.429zm2.143 0a.714.714 0 110 1.429.714.714 0 010-1.429zm2.143 0a.714.714 0 110 1.429.714.714 0 010-1.429z" />
    </g>
  </svg>
);

export const icon = EuiIconTokenNested;
