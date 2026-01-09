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
const EuiIconMove = ({
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
    <path d="m10.854 3.646-.707.708L8.5 2.707V7.5h4.793l-1.646-1.646.707-.708L15.207 8l-2.854 2.854-.707-.707L13.293 8.5H8.5v4.793l1.646-1.646.707.707L8 15.207l-2.854-2.854.708-.707L7.5 13.293V8.5H2.707l1.647 1.646-.708.707L.793 8l2.853-2.854.708.708L2.707 7.5H7.5V2.707L5.854 4.354l-.708-.708L8 .793l2.854 2.853Z" />
  </svg>
);
export const icon = EuiIconMove;
