/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconLogoCode = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillNegative"
      d="M9.75 12L16 32h10l-3.4-10.88A13 13 0 0010.19 12h-.44z"
    />
    <path
      fill="#22A7F3"
      d="M25.725 11.93A17 17 0 009.5 0H6l3.75 12h.44a13 13 0 0112.41 9.12L26 32h6l-6.275-20.07z"
    />
    <path fill="#0377CA" d="M7.91 16.175L0 32h12.855z" />
  </svg>
);

export const icon = EuiIconLogoCode;
