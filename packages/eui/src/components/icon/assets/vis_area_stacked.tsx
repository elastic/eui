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
const EuiIconVisAreaStacked = ({
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
    <path d="M.5 1a.5.5 0 0 1 .5.5V15h13.5a.5.5 0 1 1 0 1H.5a.5.5 0 0 1-.5-.5v-14A.5.5 0 0 1 .5 1Zm4.342 2.194L8.295 7.65l1.837-1.64a.5.5 0 0 1 .703.037l3.035 3.336a.5.5 0 0 1 .13.337v3.78a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V6.02a.5.5 0 0 1 .104-.305l1.947-2.52a.5.5 0 0 1 .791-.001Zm-.394 1.123L3 6.191v4.101l1.146-1.146a.5.5 0 0 1 .493-.126l.085.033L8.5 10.94l1.776-.888a.5.5 0 0 1 .36-.034l.088.034L13 11.19V9.913l-2.571-2.826L8.56 8.753a.5.5 0 0 1-.728-.067L4.448 4.317Z" />
  </svg>
);
export const icon = EuiIconVisAreaStacked;
