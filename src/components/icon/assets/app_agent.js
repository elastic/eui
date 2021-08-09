import * as React from 'react';

const EuiIconAppAgent = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M21 2.82L16 .038 11 2.82v2.289l5-2.782 5 2.782v-2.29z"
    />
    <path
      className="euiIcon__fillSecondary"
      d="M21 7.282L16 4.5l-5 2.782V9.57l5-2.781 5 2.781V7.282z"
    />
    <path d="M7 5.045L2 7.827v15.577l14 7.788 14-7.788V7.827l-5-2.782v2.289l3 1.669v13.225l-12 6.676-12-6.676V9.003l3-1.669V5.045z" />
    <path
      className="euiIcon__fillSecondary"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12.5L16 9l-6 3.5v7l6 3.5 6-3.5v-7zm-9.974 1.205L16 11.387l3.974 2.318v4.59L16 20.613l-3.974-2.318v-4.59z"
    />
  </svg>
);

export const icon = EuiIconAppAgent;
