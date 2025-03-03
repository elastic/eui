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
const EuiIconSymlink = ({
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
      d="M4 2a1 1 0 0 1 1-1h4.707L14 5.293V14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3h1v3h8V6h-3a1 1 0 0 1-1-1V2H5v6H4V2Zm6 .707L12.293 5H10V2.707Z"
      clipRule="evenodd"
    />
    <path d="M10.207 9.5 7.354 6.646l-.708.708L8.293 9H3a1 1 0 0 0-1 1v4h1v-4h5.293l-1.647 1.646.708.708L10.207 9.5Z" />
  </svg>
);
export const icon = EuiIconSymlink;
