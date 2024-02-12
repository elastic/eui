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
const EuiIconDotInCircle = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 .5c4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5S.5 12.136.5 8 3.864.5 8 .5Zm0 .882a6.618 6.618 0 1 0 0 13.236A6.618 6.618 0 0 0 8 1.382Z"
      clipRule="evenodd"
    />
    <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </svg>
);
export const icon = EuiIconDotInCircle;
