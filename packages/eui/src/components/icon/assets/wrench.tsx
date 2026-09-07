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
const EuiIconWrench = ({
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
    <path d="M13.121 7.121a3 3 0 0 0 .874-2.287L11.707 7.12 8.878 4.293l2.288-2.288A3 3 0 0 0 8.173 6.01l.106.298-5.986 5.986a1 1 0 0 0 1.414 1.414l5.986-5.986.298.105a3 3 0 0 0 3.13-.705m.707.708a4 4 0 0 1-3.863 1.034l-5.55 5.551a2 2 0 1 1-2.83-2.828l5.552-5.551a3.997 3.997 0 0 1 4.328-5.008l.143.028a.88.88 0 0 1 .62.628.97.97 0 0 1-.258.933l-1.677 1.677 1.414 1.414 1.677-1.677a.97.97 0 0 1 .933-.26c.29.079.54.3.628.622l.027.143.02.22a4 4 0 0 1-1.164 3.074" />
  </svg>
);
export const icon = EuiIconWrench;
