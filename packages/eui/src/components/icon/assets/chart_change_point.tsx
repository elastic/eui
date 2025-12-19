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
const EuiIconChartChangePoint = ({
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
    <path d="M2 14h12.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0V14Z" />
    <path d="M15 6.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V12H3.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5V7h5.5a.5.5 0 0 0 .5-.5ZM7.023 3.206A.301.301 0 0 1 7.3 3h2.4c.121 0 .23.081.277.206a.36.36 0 0 1-.065.363l-1.2 1.333a.28.28 0 0 1-.424 0l-1.2-1.333a.36.36 0 0 1-.065-.363Z" />
  </svg>
);
export const icon = EuiIconChartChangePoint;
