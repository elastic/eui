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
const EuiIconVisBarHorizontal = ({
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
    <path d="M8.5 10h-6a.5.5 0 0 1 0-1H8V6H2.5a.5.5 0 0 1 0-1H13V2H2.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H9v3h2.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-9a.5.5 0 1 1 0-1H11v-3H8.5ZM0 .5a.5.5 0 1 1 1 0v14a.5.5 0 1 1-1 0V.5Z" />
  </svg>
);
export const icon = EuiIconVisBarHorizontal;
