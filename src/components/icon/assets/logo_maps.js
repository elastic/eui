import React from 'react';

const EuiIconLogoMaps = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fill="#22A7F3"
      d="M25.5 9.5c0 6.65-9.5 11.425-9.5 11.425S6.5 16.15 6.5 9.5A9.5 9.5 0 0 1 16 0a9.5 9.5 0 0 1 9.5 9.5"
    />
    <path
      className="euiIcon__fillNegative"
      d="M16 20.925s4.326-2.183 7.141-5.645l-2.505-1.878a7.725 7.725 0 0 0-9.272 0L8.859 15.28C11.674 18.742 16 20.925 16 20.925"
    />
    <path
      fill="#FA744E"
      d="M25.53 17.073a21.124 21.124 0 0 1-2.834 2.916c-2.62 2.235-5.239 3.561-5.349 3.616L16 24.282l-1.348-.677c-.109-.055-2.728-1.381-5.349-3.616a21.182 21.182 0 0 1-2.834-2.916L0 21.925l11.364 8.523a7.724 7.724 0 0 0 9.271 0L32 21.925l-6.47-4.852z"
    />
  </svg>
);

export const icon = EuiIconLogoMaps;
