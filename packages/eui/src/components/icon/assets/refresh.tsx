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
const EuiIconRefresh = ({
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
      d="M2 8a5.98 5.98 0 0 0 1.757 4.243A5.98 5.98 0 0 0 8 14v1a6.98 6.98 0 0 1-4.95-2.05A6.98 6.98 0 0 1 1 8c0-1.79.683-3.58 2.048-4.947l.004-.004.019-.02L3.1 3H1V2h4v4H4V3.525a6.51 6.51 0 0 0-.22.21l-.013.013-.003.002-.007.007A5.98 5.98 0 0 0 2 8Zm10.243-4.243A5.98 5.98 0 0 0 8 2V1a6.98 6.98 0 0 1 4.95 2.05A6.98 6.98 0 0 1 15 8a6.98 6.98 0 0 1-2.047 4.947l-.005.004-.018.02-.03.029H15v1h-4v-4h1v2.475a6.744 6.744 0 0 0 .22-.21l.013-.013.003-.002.007-.007A5.98 5.98 0 0 0 14 8a5.98 5.98 0 0 0-1.757-4.243Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconRefresh;
