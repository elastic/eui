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
const EuiIconDiscuss = ({
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
    <path d="M4.967 10.864c.332.787 1.085 1.337 1.962 1.337h3.673l2.755 2.8v-2.8c1.184 0 2.143-1.003 2.143-2.24V6.604c0-1.237-.96-2.24-2.143-2.24h-1.071v4.334c0 1.197-.896 2.167-2 2.167h-5.32Z" />
    <path d="M4.905 8.718h4.166c.592 0 1.072-.502 1.072-1.12V4.24c0-.618-.48-1.12-1.072-1.12H2.643c-.592 0-1.072.502-1.072 1.12V7.6c0 .617.48 1.119 1.072 1.119h1.071v1.452l1.191-1.452Zm.493 1.12-2.755 2.798V9.837C1.459 9.837.5 8.835.5 7.598V4.24C.5 3.003 1.46 2 2.643 2H9.07c1.184 0 2.143 1.003 2.143 2.24v3.358c0 1.237-.96 2.24-2.143 2.24H5.398Z" />
  </svg>
);
export const icon = EuiIconDiscuss;
