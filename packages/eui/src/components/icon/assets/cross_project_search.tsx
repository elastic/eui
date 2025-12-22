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
const EuiIconCrossProjectSearch = ({
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
      d="M8.5 9h4a1 1 0 0 1 1 1v2.065A1.999 1.999 0 1 1 11 14a2 2 0 0 1 1.5-1.935V10h-4v2.065A1.999 1.999 0 1 1 6 14a2 2 0 0 1 1.5-1.935V10h-4v2.065A1.999 1.999 0 1 1 1 14a2 2 0 0 1 1.5-1.935V10a1 1 0 0 1 1-1h4V7h1v2ZM3 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM7 0a3 3 0 0 1 3 3c0 .648-.208 1.246-.557 1.736l1.91 1.91-.707.708-1.91-1.91A3 3 0 1 1 7 0Zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconCrossProjectSearch;
