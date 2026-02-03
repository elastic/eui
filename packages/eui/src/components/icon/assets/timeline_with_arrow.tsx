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
const EuiIconTimelineWithArrow = ({
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
    <path d="M6 1v2h4V1H6Zm5 2a1 1 0 0 1-1 1H8.5v1h-1V4H6a1 1 0 0 1-.995-.897L5 3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM5 15v-2H1v2h4Zm-5-2a1 1 0 0 1 1-1h1.5v-1h1v1H5a1 1 0 0 1 .995.898L6 13v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2Z" />
    <path
      fillRule="evenodd"
      d="M3 6.5a1.5 1.5 0 0 1 1.413 1h3.315a5.524 5.524 0 0 0-.836 1H4.413a1.5 1.5 0 0 1-2.826 0H0v-1h1.587A1.5 1.5 0 0 1 3 6.5Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
    <path d="M15 11.5a3.5 3.5 0 1 0-3.5 3.5v1a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9v-1a3.5 3.5 0 0 0 3.5-3.5Z" />
    <path d="m14.207 11.5-2.354 2.354-.707-.707L12.293 12H9v-1h3.293l-1.146-1.146.707-.708 2.353 2.354Z" />
  </svg>
);
export const icon = EuiIconTimelineWithArrow;
