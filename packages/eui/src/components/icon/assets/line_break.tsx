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
const EuiIconLineBreak = ({
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
    <path d="M9.854 10.854 8.707 12H12a1 1 0 1 0 0-2h-2V9h2a2 2 0 1 1 0 4H8.707l1.147 1.146-.708.707L6.793 12.5l2.353-2.354.708.707ZM5 12v1H2v-1h3Zm3-3v1H2V9h6Zm6-3v1H2V6h12Zm0-3v1H2V3h12Z" />
  </svg>
);
export const icon = EuiIconLineBreak;
