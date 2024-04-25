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
const EuiIconSortable = ({
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
    <path d="M7 12.786V3.2L3.604 6.596a.5.5 0 0 1-.708-.707l3.536-3.535a1.5 1.5 0 0 1 2.121 0l3.536 3.535a.5.5 0 0 1-.707.707L8 3.214v9.557l3.382-3.382a.5.5 0 0 1 .707.707l-3.536 3.536a1.5 1.5 0 0 1-2.121 0l-3.536-3.536a.5.5 0 0 1 .708-.707L7 12.786Z" />
  </svg>
);
export const icon = EuiIconSortable;
