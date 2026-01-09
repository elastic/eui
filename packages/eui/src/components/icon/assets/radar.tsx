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
const EuiIconRadar = ({
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
      d="M8 1c1.753 0 3.354.645 4.582 1.71l1.064-1.064.707.708-1.064 1.063A7 7 0 1 1 8 1Zm0 1a6 6 0 1 0 4.58 2.126L8.965 7.741a1 1 0 1 1-.707-.707l.756-.756a1.998 1.998 0 0 0-2.428 3.136l-.707.707a3 3 0 0 1 3.858-4.566l.714-.714A3.999 3.999 0 1 0 8 12v.999a5 5 0 1 1 3.164-8.871l.709-.709A5.974 5.974 0 0 0 8 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconRadar;
