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
      d="M2 5.915v4.17a1.5 1.5 0 0 0 0 2.83V15h1v-2.085a1.5 1.5 0 0 0 0-2.83v-4.17a1.5 1.5 0 0 0 0-2.83V1H2v2.085a1.5 1.5 0 0 0 0 2.83ZM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 7a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM8 2a1 1 0 0 0-.707.293L5.086 4.5l2.207 2.207A1 1 0 0 0 8 7h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8Zm6 1H8L6.5 4.5 8 6h6V3ZM7.293 9.293A1 1 0 0 1 8 9h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-.707-.293L5.086 11.5l2.207-2.207ZM8 10h6v3H8l-1.5-1.5L8 10Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTimeline;
