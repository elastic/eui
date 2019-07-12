import React from 'react';

const EuiIconLogoMaps = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#22A7F3"
        fillRule="nonzero"
        d="M19.5 9.507c0 6.649-9.5 11.425-9.5 11.425S.5 16.156.5 9.507a9.5 9.5 0 0 1 9.5-9.5 9.5 9.5 0 0 1 9.5 9.5"
        mask="url(#logo_maps-b)"
        transform="translate(6 -.006)"
      />
      <path
        className="euiIcon__fillNegative"
        d="M16 20.925s4.326-2.183 7.141-5.645l-2.505-1.878a7.725 7.725 0 0 0-9.272 0L8.859 15.28C11.674 18.742 16 20.925 16 20.925"
      />
      <path
        fill="#FA744E"
        fillRule="nonzero"
        d="M25.53.079a21.124 21.124 0 0 1-2.834 2.917c-2.62 2.234-5.239 3.561-5.349 3.616L16 7.289l-1.348-.677c-.109-.055-2.728-1.382-5.349-3.616A21.182 21.182 0 0 1 6.47.079L0 4.932l11.364 8.523a7.724 7.724 0 0 0 9.271 0L32 4.932 25.53.079z"
        mask="url(#logo_maps-d)"
        transform="translate(0 16.994)"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoMaps;
