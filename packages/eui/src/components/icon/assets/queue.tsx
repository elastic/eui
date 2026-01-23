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
const EuiIconQueue = ({
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
      d="M11 3a1 1 0 0 1 .8.4l3 4a1 1 0 0 1 0 1.2l-3 4a1 1 0 0 1-.8.4H2a1 1 0 0 1-.8-1.6L3.75 8 1.2 4.6A1 1 0 0 1 2 3h9ZM5 8l-3 4h2.086l3.11-4-3.11-4H2l3 4Zm6.555-.307.239.307-.24.307L8.683 12H11l3-4-3-4H8.682l2.873 3.693Zm-3.33 0L8.464 8l-.24.307L5.353 12h2.064l3.11-4-3.11-4H5.352l2.873 3.693Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconQueue;
