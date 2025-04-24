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
const EuiIconTimeRefresh = ({
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
    <path d="M11 9h1v2h2v1h-3V9Z" />
    <path
      fillRule="evenodd"
      d="M7.754 13.995a4.5 4.5 0 1 1 7.491-4.99 4.5 4.5 0 0 1-7.49 4.99ZM15 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd"
    />
    <path d="M7.222 14.957a5.501 5.501 0 0 1-.713-1.144A6.003 6.003 0 0 1 3.757 3.757l.007-.007.003-.002.013-.014A4.337 4.337 0 0 1 4 3.525V6h1V2H1v1h2.1l-.03.03-.018.019-.004.004a7.001 7.001 0 0 0 4.175 11.904Zm7.735-7.735A7.001 7.001 0 0 0 8 1v1a6.003 6.003 0 0 1 5.813 4.509c.412.19.796.431 1.144.713Z" />
  </svg>
);
export const icon = EuiIconTimeRefresh;
