/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconLogoSecurity = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      fill="#FA744E"
      d="M9 7.008V0h20v16.744c0 3.913-6.378 6.477-9.015 7.256V7.008H9Z"
    />
    <path
      fill="#1DBAB0"
      d="M3 20.073V10h14v22C7.667 27.98 3 24.004 3 20.073Z"
    />
    <path
      d="M9 10h8v14c-2.983-1.14-8-3.756-8-7.043V10Z"
      className="euiIcon__fillNegative"
    />
  </svg>
);
export const icon = EuiIconLogoSecurity;
