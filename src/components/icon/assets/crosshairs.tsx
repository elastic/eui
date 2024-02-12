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
const EuiIconCrosshairs = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.822 1.874a.5.5 0 1 1 .335.942 5.517 5.517 0 0 0-3.34 3.341.5.5 0 1 1-.943-.335 6.517 6.517 0 0 1 3.948-3.948ZM1.864 10.15a.5.5 0 1 1 .944-.33 5.517 5.517 0 0 0 3.365 3.37.5.5 0 0 1-.333.943 6.517 6.517 0 0 1-3.976-3.983Zm8.302 3.981a.5.5 0 1 1-.333-.943 5.517 5.517 0 0 0 3.347-3.332.5.5 0 1 1 .941.337 6.517 6.517 0 0 1-3.955 3.938Zm3.968-8.285a.5.5 0 1 1-.943.331A5.517 5.517 0 0 0 9.85 2.82a.5.5 0 0 1 .337-.942 6.517 6.517 0 0 1 3.946 3.968ZM8.5 3.5a.5.5 0 0 1-1 0V.997a.5.5 0 0 1 1 0V3.5Zm-4.997 4a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1h2.503ZM7.5 12.497a.5.5 0 0 1 1 0V15a.5.5 0 1 1-1 0v-2.503ZM12.497 8.5a.5.5 0 0 1 0-1H15a.5.5 0 1 1 0 1h-2.503ZM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);
export const icon = EuiIconCrosshairs;
