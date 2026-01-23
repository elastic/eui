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
const EuiIconQueryField = ({
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
    <path d="M8 6.5H7V6H5v2h2v1H5v1h.5v1h-2v-1H4V6h-.5V5H8v1.5Z" />
    <path
      fillRule="evenodd"
      d="M6 2a6 6 0 1 1 0 12A6 6 0 0 1 6 2Zm0 1a5 5 0 1 0 0 10A5 5 0 0 0 6 3Z"
      clipRule="evenodd"
    />
    <path d="M11 3a5 5 0 0 1 0 10l-.1-.003a7.04 7.04 0 0 0 .9-1.078 4 4 0 0 0 0-7.839 7.034 7.034 0 0 0-.9-1.078L11 3Z" />
  </svg>
);
export const icon = EuiIconQueryField;
