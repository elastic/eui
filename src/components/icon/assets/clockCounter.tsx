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
const EuiIconClockCounter = ({
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
    <path d="M11.39 3.61a5.5 5.5 0 0 0-7.78 7.78l.562.56v-1.622a.5.5 0 0 1 1 0v2.829a.5.5 0 0 1-.5.5H1.843a.5.5 0 0 1 0-1h1.621l-.56-.56A6.5 6.5 0 1 1 7.5 14a.5.5 0 0 1 0-1 5.5 5.5 0 0 0 3.89-9.39Z" />
    <path d="M7.5 3a.5.5 0 0 1 .5.5V7h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Z" />
  </svg>
);
export const icon = EuiIconClockCounter;
