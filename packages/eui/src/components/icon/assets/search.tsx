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
const EuiIconSearch = ({
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
      d="M10.775 12.896a7 7 0 1 1 2.121-2.121l2.665 2.664a1.5 1.5 0 0 1-2.121 2.122l-2.665-2.665ZM13 7A6 6 0 1 1 1 7a6 6 0 0 1 12 0Zm-1.416 5.29 2.563 2.564a.5.5 0 1 0 .707-.708l-2.563-2.562a7.045 7.045 0 0 1-.707.707Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconSearch;
