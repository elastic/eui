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
const EuiIconProductDashboard = ({
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
      d="M6 11a1 1 0 0 1 1 1v1l-.005.102A1 1 0 0 1 6 14H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4Zm-4 2h4v-1H2v1ZM14 7a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5Zm-5 6h5V8H9v5ZM6 7a1 1 0 0 1 1 1v1l-.005.103A1 1 0 0 1 6 10H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4ZM2 9h4V8H2v1ZM14 2a1 1 0 0 1 .995.897L15 3v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12ZM2 5h12V3H2v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconProductDashboard;
