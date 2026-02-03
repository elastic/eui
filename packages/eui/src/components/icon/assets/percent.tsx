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
const EuiIconPercent = ({
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
    <path d="m13.384 2.32-10 12-.768-.64 10-12 .768.64Z" />
    <path
      fillRule="evenodd"
      d="M11.5 8a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-5 0v-1A2.5 2.5 0 0 1 11.5 8Zm0 1a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 3 0v-1A1.5 1.5 0 0 0 11.5 9Zm-7-7A2.5 2.5 0 0 1 7 4.5v1a2.5 2.5 0 0 1-5 0v-1A2.5 2.5 0 0 1 4.5 2Zm0 1A1.5 1.5 0 0 0 3 4.5v1a1.5 1.5 0 1 0 3 0v-1A1.5 1.5 0 0 0 4.5 3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconPercent;
