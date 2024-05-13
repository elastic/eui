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
const EuiIconLogoBusinessAnalytics = ({
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
    <g fill="none" fillRule="evenodd">
      <path
        fill="#00BFB3"
        d="M0 22c0 5.522 4.478 10 10 10V12C4.478 12 0 16.478 0 22"
      />
      <path
        d="M10 12v10h10c0-5.522-4.478-10-10-10"
        className="euiIcon__fillNegative"
      />
      <path
        fill="#F04E98"
        d="M10 0v9c7.168 0 13 5.832 13 13h9C32 9.85 22.15 0 10 0"
      />
    </g>
  </svg>
);
export const icon = EuiIconLogoBusinessAnalytics;
