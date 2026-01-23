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
const EuiIconEndpoint = ({
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
      d="M4.5 2a2.5 2.5 0 0 1 2.45 2h3.125a1.925 1.925 0 0 1 .529 3.776L5.67 9.186A.925.925 0 0 0 5.925 11h3.127a2.5 2.5 0 1 1 0 1H5.925a1.925 1.925 0 0 1-.529-3.776l4.933-1.41A.925.925 0 0 0 10.075 5H6.95A2.501 2.501 0 1 1 4.5 2Zm6.354 10.852a1.499 1.499 0 0 0 1.998-1.998l-1.998 1.998Zm1.292-2.704a1.499 1.499 0 0 0-1.998 1.998l1.998-1.998ZM4.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconEndpoint;
