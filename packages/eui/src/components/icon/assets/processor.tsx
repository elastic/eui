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
const EuiIconProcessor = ({
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
      d="M11 11H5V5h6v6Zm-5-1h4V6H6v4Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6 3h1.5V1h1v2H10V1h1v2h1a1 1 0 0 1 1 1v1h2v1h-2v1.5h2v1h-2V10h2v1h-2v1a1 1 0 0 1-1 1h-1v2h-1v-2H8.5v2h-1v-2H6v2H5v-2H4a1 1 0 0 1-1-1v-1H1v-1h2V8.5H1v-1h2V6H1V5h2V4a1 1 0 0 1 1-1h1V1h1v2Zm-2 9h8V4H4v8Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconProcessor;
