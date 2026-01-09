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
const EuiIconShare = ({
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
      d="M9.617 2.076a1 1 0 0 1 1.09.217l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 9 11V9.013c-4.215.22-6.445 3.195-7.036 4.673A.5.5 0 0 1 1 13.5a8.5 8.5 0 0 1 8-8.486V3a1 1 0 0 1 .617-.924ZM10 6h-.5a7.503 7.503 0 0 0-7.148 5.221C3.66 9.698 5.838 8.16 9 8.011V8h1v3l4-4-4-4v3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconShare;
