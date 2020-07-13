import React from 'react';

const EuiIconAnalyzeEventDisabled = ({ title, titleId, ...props }) => (
  <svg
    width={14}
    height={16}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.924 4.013a.605.605 0 00-.228-.236L7.304.082a.607.607 0 00-.608 0L.304 3.777A.62.62 0 000 4.304v7.392c0 .217.116.418.304.527l6.392 3.695c.188.11.42.11.608 0l6.392-3.695a.609.609 0 00.304-.527V4.304a.607.607 0 00-.076-.291zM7 14.939l6-3.469-3 1.735-3 1.734z"
        fill="#D3DAE6"
      />
      <g clipPath="url(#clip1)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.924 4.013a.605.605 0 00-.228-.236L7.304.082a.607.607 0 00-.608 0L.304 3.777A.62.62 0 000 4.304v7.392c0 .217.116.418.304.527l6.392 3.695c.188.11.42.11.608 0l6.392-3.695a.609.609 0 00.304-.527V4.304a.607.607 0 00-.076-.291zM1 5.079v6.391l6 3.47 6-3.47V5.08L7.252 8.432 7 8.579l-.252-.147L1 5.079zm11.476-.852L7 1.06 1.524 4.227 7 7.42l5.476-3.194z"
          fill="#98A2B3"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h14v16H0z" />
      </clipPath>
      <clipPath id="clip1">
        <path fill="#fff" d="M0 0h14v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const icon = EuiIconAnalyzeEventDisabled;
