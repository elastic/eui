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
const EuiIconGradient = ({
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
    <path d="M5 12H4v-1h1v1Zm2 0H6v-1h1v1Zm-1-1H5v-1h1v1Zm2 0H7v-1h1v1Zm-3-1H4V9h1v1Zm2 0H6V9h1v1ZM6 9H5V8h1v1Zm2 0H7V8h1v1ZM5 8H4V7h1v1Zm2 0H6V7h1v1ZM6 7H5V6h1v1Zm2 0H7V6h1v1ZM5 6H4V5h1v1Zm2 0H6V5h1v1ZM6 5H5V4h1v1Zm2 0H7V4h1v1Z" />
    <path
      fillRule="evenodd"
      d="M13 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-.995-.898L2 13V3a1 1 0 0 1 1-1h10ZM3 4h1v1H3v1h1v1H3v1h1v1H3v1h1v1H3v1h1v1h1v-1h1v1h1v-1h1v1h5V3H7v1H6V3H5v1H4V3H3v1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconGradient;
