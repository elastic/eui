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
const EuiIconAccessibility = ({
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
    <path
      fillRule="evenodd"
      d="M8 3a2 2 0 0 1 1.73 3h.77a1.5 1.5 0 0 1 0 3h-.278l.66 1.764A1.655 1.655 0 0 1 8 12.325a1.655 1.655 0 0 1-2.883-1.561L5.778 9H5.5a1.5 1.5 0 1 1 0-3h.77A2 2 0 0 1 8 3ZM5.5 7a.5.5 0 0 0 0 1h1.722l-1.168 3.114a.655.655 0 1 0 1.235.438L8 9.419l.71 2.133a.656.656 0 1 0 1.236-.438L8.778 8H10.5a.5.5 0 0 0 0-1h-5ZM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconAccessibility;
