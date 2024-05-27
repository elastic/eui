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
    <path d="M14.883 7.644a.5.5 0 0 1 .006.707l-1.984 2.016a.5.5 0 0 1-.856-.347l-.009-1.004-3.024.024V12h1a.5.5 0 0 1 .354.854l-2 2a.5.5 0 0 1-.707 0l-2-2A.5.5 0 0 1 6.016 12h1V9.057l-3.008.024.008.995a.5.5 0 0 1-.85.36L1.148 8.454a.5.5 0 0 1-.005-.707L3.127 5.73a.5.5 0 0 1 .857.347l.008 1.004 3.024-.025V4h-1a.5.5 0 0 1-.353-.854l2-2a.5.5 0 0 1 .707 0l2 2a.5.5 0 0 1-.354.854h-1v3.04l3.008-.024-.008-.996a.5.5 0 0 1 .85-.36l2.017 1.984Z" />
  </svg>
);
export const icon = EuiIconMove;
