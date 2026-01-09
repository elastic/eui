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
const EuiIconScissors = ({
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
    <path d="M3.5 12a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm0-9a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z" />
    <path
      fillRule="evenodd"
      d="M13.999 1a1 1 0 0 1 .708 1.707L9.414 8l5.293 5.293A1 1 0 0 1 14 15h-2c-.23 0-.453-.08-.63-.223l-.072-.065-4.326-4.27-1.147 1.146c.111.283.175.59.175.912a2.5 2.5 0 1 1-4.257-1.778L4.5 8 1.735 5.271l-.012-.014A2.5 2.5 0 1 1 6 3.5c0 .322-.064.628-.175.911l1.147 1.147 4.325-4.27.073-.065A.998.998 0 0 1 11.999 1h2ZM3.5 11a1.5 1.5 0 1 0 1.22.629l-.013-.018A1.507 1.507 0 0 0 3.5 11Zm4.179-1.266L12 14h2L8.707 8.707 7.679 9.734Zm0-3.47v.002l-3.813 3.763a2.49 2.49 0 0 1 1.402.703L14 2h-2.001l-4.32 4.265Zm-2.411-.996a2.49 2.49 0 0 1-1.402.702l1.345 1.328L6.26 6.26l-.993-.993ZM3.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconScissors;
