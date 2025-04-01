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
const EuiIconClockCounter = ({
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
    <path d="M3.023 3.077A6.978 6.978 0 0 0 1 8c0 1.79.683 3.58 2.048 4.947l.004.004.019.02.03.029H1v1h4v-4H4v2.475a6.535 6.535 0 0 1-.22-.21l-.013-.013-.003-.002-.007-.007a6.012 6.012 0 0 1-1.362-6.39A6.005 6.005 0 0 1 8 2a6 6 0 0 1 0 12v1A7 7 0 1 0 3.023 3.077Z" />
    <path d="M8.5 4v3.5H12v1H7.5V4h1Z" />
  </svg>
);
export const icon = EuiIconClockCounter;
