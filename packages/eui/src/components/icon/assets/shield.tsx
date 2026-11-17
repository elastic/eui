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
const EuiIconShield = ({
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
    <path d="M8 3.205q.247.151.5.288V7H12v1H8.5v4.75q-.24.107-.5.198a7 7 0 0 1-.5-.198V8H4V7h3.5V3.493q.253-.137.5-.288" />
    <path d="M7.54 1.112A1 1 0 0 1 8.6 1.2c.867.651 1.993 1.11 2.948 1.408a15 15 0 0 0 1.509.386l.086.016.02.003h.002A1 1 0 0 1 14 4v4c0 .786-.311 2.168-1.151 3.517-.86 1.38-2.297 2.761-4.562 3.441a1 1 0 0 1-.574 0c-2.265-.68-3.702-2.062-4.562-3.441C2.311 10.167 2 8.786 2 8V4a1 1 0 0 1 .836-.986l.002-.001.02-.003.085-.016a15 15 0 0 0 1.509-.386C5.407 2.31 6.532 1.851 7.4 1.2zM8 2a7 7 0 0 1-.386.27l-.114.069C5.537 3.574 3 4 3 4v4l.013.246q.011.125.034.27l.028.15.035.175q.015.066.034.134a6 6 0 0 0 .327.98 7 7 0 0 0 .467.93C4.681 12.122 5.943 13.383 8 14c2.543-.763 3.872-2.51 4.504-3.982q.036-.086.068-.171.052-.127.097-.25l.043-.13q.043-.125.079-.245l.044-.165q.029-.107.053-.208l.037-.183C12.975 8.4 13 8.173 13 8V4s-2.23-.375-4.126-1.44L8.5 2.34A7 7 0 0 1 8 2" />
  </svg>
);
export const icon = EuiIconShield;
