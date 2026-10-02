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
const EuiIconClipboardWarning = ({
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
    <path d="M10.5 13a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m.5-1h-1V9h1z" />
    <path d="M10.5 6a1 1 0 0 1 .697.285l.025.025a1 1 0 0 1 .15.2l4.5 8A1 1 0 0 1 15 16H6a1 1 0 0 1-.871-1.49L8.79 8 9 7.627l.629-1.117.073-.113A1 1 0 0 1 10.5 6M6 15h9l-4.5-8z" />
    <path d="M6 0c.74 0 1.385.403 1.73 1H9a1 1 0 0 1 1 1h1a1 1 0 0 1 1 1v2.68a2 2 0 0 0-1-.614V3h-1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3H1v11h3.268l-.011.02A2 2 0 0 0 4 15H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1-1h1.27C4.615.403 5.26 0 6 0m0 1a1 1 0 0 0-1 1H3v2h6V2H7a1 1 0 0 0-1-1" />
    <path d="M5.393 12H3v-1h2.955zm1.125-2H3V9h4.08zm1.125-2H3V7h5.205z" />
  </svg>
);
export const icon = EuiIconClipboardWarning;
