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
const EuiIconProductFleet = ({
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
    <path d="M7.66 1.06a1 1 0 0 1 .787.045l3 1.5A1 1 0 0 1 12 3.5v3.388l2.955 1.51a1 1 0 0 1 .545.891v2.922c0 .352-.186.679-.488.86l-3 1.788a1 1 0 0 1-.906.06L8 13.587l-3.106 1.332a1 1 0 0 1-.906-.06l-3-1.789a1 1 0 0 1-.488-.86V9.29a1 1 0 0 1 .545-.892L4 6.888V3.5a1 1 0 0 1 .553-.895l3-1.5zM1.5 9.29v2.92l3 1.79 3-1.286V9.309L4.446 7.782zm7 .019v3.405l3 1.286 3-1.79V9.29l-2.947-1.508zM5 3.5v3.44l3 1.5 3-1.5V3.5L8 2z" />
  </svg>
);
export const icon = EuiIconProductFleet;
