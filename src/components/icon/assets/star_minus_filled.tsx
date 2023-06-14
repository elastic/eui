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
const EuiIconStarMinusFilled = ({
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
      d="M6 2a.86.86 0 0 1 .792.511l1.33 2.924 3.128.446c.71.102 1.001.976.496 1.487L9.433 9.704l.563 3.268A.877.877 0 0 1 9.136 14a.862.862 0 0 1-.429-.116L6 12.342l-2.707 1.542a.862.862 0 0 1-.43.116.877.877 0 0 1-.859-1.027l.563-3.269L.254 7.368C-.25 6.857.04 5.983.75 5.88l3.128-.446 1.33-2.923A.86.86 0 0 1 6 2Zm10 8v1h-5v-1h5Z"
    />
  </svg>
);
export const icon = EuiIconStarMinusFilled;
