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
const EuiIconChartAreaStack = ({
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
    <path d="M2 14.354h13v1H2a1 1 0 0 1-1-1v-13h1v13Z" />
    <path
      fillRule="evenodd"
      d="M14 13.354H3V7.646l4.5-4.5 2 2 4.5-4.5v12.707ZM9.5 10.56l-2-2-3.5 3.5v.293h9V7.06l-3.5 3.5Zm0-4-2-2L4 8.06v2.585l3.5-3.5 2 2 3.5-3.5V3.061l-3.5 3.5Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconChartAreaStack;
