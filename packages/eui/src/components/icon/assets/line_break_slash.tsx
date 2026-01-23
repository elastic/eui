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
const EuiIconLineBreakSlash = ({
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
    <path d="m15.354 1.354-14 14-.708-.707 14-14 .707.707ZM12 9a2 2 0 1 1 0 4H8.707l1.147 1.146-.708.707L6.793 12.5l2.353-2.354.708.707L8.707 12H12a1 1 0 1 0 0-2h-2V9h2Zm-8.121 1H2V9h2.879l-1 1Zm3-3H2V6h5.879l-1 1ZM14 7h-2.879l1-1H14v1ZM9.879 4H2V3h8.879l-1 1Z" />
  </svg>
);
export const icon = EuiIconLineBreakSlash;
