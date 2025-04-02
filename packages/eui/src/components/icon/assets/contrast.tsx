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
const EuiIconContrast = ({
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
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.5-1.5h1.902a6.004 6.004 0 0 0 1.567-1H8.5v1Zm0-2h4.374c.225-.312.42-.647.582-1H8.5v1Zm0-2h5.311a6 6 0 0 0 .168-1H8.5v1Zm0-2h5.48a5.988 5.988 0 0 0-.169-1H8.5v1Zm0-2h4.956a5.996 5.996 0 0 0-.582-1H8.5v1Zm0-2h3.469a6.004 6.004 0 0 0-1.567-1H8.5v1ZM2 8a6 6 0 0 1 5.5-5.98v11.96A6 6 0 0 1 2 8Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconContrast;
