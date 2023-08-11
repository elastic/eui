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
import { htmlIdGenerator } from '../../../services';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconLogoGoogleCloud = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('logo_google_cloud');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={23}
      fill="none"
      viewBox="0 0 28 23"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g clipPath={`url(#${generateId('a')})`}>
        <path
          fill="#EA4335"
          d="m18.621 6.275 2.434-2.458.162-1.034C16.782-1.29 9.732-.827 5.734 3.746 4.623 5.016 3.799 6.6 3.36 8.236l.871-.124 4.868-.81.376-.389C11.64 4.512 15.3 4.189 17.8 6.232l.82.043Z"
        />
        <path
          fill="#4285F4"
          d="M24.522 8.163a11.088 11.088 0 0 0-3.305-5.38l-3.416 3.449a6.155 6.155 0 0 1 2.23 4.863v.612c1.678 0 3.04 1.375 3.04 3.07a3.026 3.026 0 0 1-3.04 3.035h-6.09l-.598.656v3.682l.598.577h6.09c4.367.035 7.935-3.478 7.969-7.888a8.007 8.007 0 0 0-3.478-6.676Z"
        />
        <path
          fill="#34A853"
          d="M7.86 22.727h6.081v-4.915h-6.08a2.96 2.96 0 0 1-1.247-.276l-.863.268-2.45 2.457-.214.837c1.374 1.048 3.051 1.637 4.774 1.63Z"
        />
        <path
          fill="#FBBC05"
          d="M7.86 6.784C3.494 6.81-.025 10.406 0 14.816a8.012 8.012 0 0 0 3.087 6.282l3.527-3.562c-1.53-.698-2.21-2.516-1.519-4.061a3.028 3.028 0 0 1 5.541 0l3.528-3.561a7.873 7.873 0 0 0-6.303-3.13Z"
        />
      </g>
      <defs>
        <clipPath id={generateId('a')}>
          <path fill="#fff" d="M0 0h28v22.75H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const icon = EuiIconLogoGoogleCloud;
