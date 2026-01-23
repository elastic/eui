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
      d="M13 6.5a1.5 1.5 0 0 1 1.413 1H16v1h-1.587a1.5 1.5 0 0 1-2.826 0H9.413a1.5 1.5 0 0 1-2.826 0H4.413a1.5 1.5 0 0 1-2.826 0H0v-1h1.587a1.5 1.5 0 0 1 2.826 0h2.174a1.5 1.5 0 0 1 2.826 0h2.174A1.5 1.5 0 0 1 13 6.5Zm-10 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
    <path d="M1 13v2h4v-2H1Zm10 0v2h4v-2h-4ZM6 1v2h4V1H6Zm0 14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1.5v-1h1v1H5a1 1 0 0 1 1 1v2Zm10 0a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1.5v-1h1v1H15a1 1 0 0 1 1 1v2ZM11 3a1 1 0 0 1-1 1H8.5v1h-1V4H6a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2Z" />
  </svg>
);
export const icon = EuiIconTimeline;
