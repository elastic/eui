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
const EuiIconTimeline = ({
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
      d="M7 4.5a.5.5 0 0 0 1 0V4h1a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1v.5zM9 1H6v2h3V1zM2 7.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0zM2.5 9a1.5 1.5 0 0 1-1.415-1H.5a.5.5 0 0 1 0-1h.585a1.5 1.5 0 0 1 2.83 0h2.17a1.5 1.5 0 0 1 2.83 0h2.17a1.5 1.5 0 0 1 2.83 0h.585a.5.5 0 0 1 0 1h-.585a1.5 1.5 0 0 1-2.83 0h-2.17a1.5 1.5 0 0 1-2.83 0h-2.17A1.5 1.5 0 0 1 2.5 9zM13 7.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zm-5 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM2.5 10a.5.5 0 0 0-.5.5v.5H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3v-.5a.5.5 0 0 0-.5-.5zM4 14v-2H1v2h3zm8-3.5a.5.5 0 0 1 1 0v.5h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-.5zm2 2.5v1h-3v-2h3v1z"
    />
  </svg>
);
export const icon = EuiIconTimeline;
