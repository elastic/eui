import React from 'react';
// TODO: Change to one line to simplify
const EuiIconESTokenFlattened = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M2 4c0-.13807.11193-.25.25-.25h11.5c.1381 0 .25.11193.25.25v1c0 .13807-.1119.25-.25.25H2.25C2.11193 5.25 2 5.13807 2 5V4zM2 7c0-.13807.11193-.25.25-.25h4.88831l-1.82143 1.5H2.25C2.11193 8.25 2 8.13807 2 8V7zM6 10.9034L4.59962 9.75H2.25c-.13807 0-.25.11193-.25.25v1c0 .1381.11193.25.25.25h3.5c.13807 0 .25-.1119.25-.25v-.0966zM6.06421 9.52295c-.08561-.07283-.08561-.22348 0-.29593L9.2284 6.54373c.05547-.04715.13253-.05711.19767-.0253.06552.03182.10684.09928.10684.17327v1.34164h4.28099c.1027 0 .1861.08587.1861.19167V10.525c0 .1058-.0834.1916-.1861.1916H9.53291v1.3417c0 .074-.04132.1414-.10684.1732-.06514.0319-.1422.0219-.19767-.0249L6.06421 9.52295z"
    />
  </svg>
);

export const icon = EuiIconESTokenFlattened;
