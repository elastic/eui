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
const EuiIconMagnifyWithMinus = ({
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
    <path d="M9.5 6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1h6Zm.74 4.74c0-.117.04-.225.107-.31A5.478 5.478 0 0 0 12 6.5 5.5 5.5 0 1 0 6.5 12a.5.5 0 1 1 0 1 6.5 6.5 0 1 1 4.936-2.27l4.419 4.418a.5.5 0 0 1-.707.707l-4.768-4.768a.499.499 0 0 1-.14-.347Z" />
  </svg>
);
export const icon = EuiIconMagnifyWithMinus;
