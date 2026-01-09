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
const EuiIconFaceSad = ({
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
    <path d="M8 9a3 3 0 0 1 2.75 1.8l-.916.4a2 2 0 0 0-3.668 0l-.916-.4A3 3 0 0 1 8 9ZM5 6.5a.5.5 0 0 0 1 0V6h1v.5a1.5 1.5 0 1 1-3 0V6h1v.5Zm5 0a.5.5 0 0 0 1 0V6h1v.5a1.5 1.5 0 0 1-3 0V6h1v.5Z" />
    <path
      fillRule="evenodd"
      d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconFaceSad;
