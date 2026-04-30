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
const EuiIconProductDashboard = ({
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
    <path d="m8.528 10.265.972-.972 1.5 1.5 1.646-1.647.707.708L11 12.207l-1.5-1.5-1.028 1.028-3-3.5-2.118 2.119-.708-.708 2.882-2.881 3 3.5Z" />
    <path d="M9 8H8V6h1v2Zm2 0h-1V5h1v3Zm2 0h-1V4h1v4ZM7 5H3V4h4v1Z" />
    <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12ZM2 13h12V3H2v10Z" />
  </svg>
);
export const icon = EuiIconProductDashboard;
