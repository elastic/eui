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
const EuiIconClockUp = ({
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
    <path d="m15.354 12.647-.707.707L13 11.707V16h-1v-4.293l-1.646 1.646-.708-.707L12.5 9.794z" />
    <path d="M8 1a7 7 0 0 1 7 7c0 .858-.16 1.677-.442 2.437l-.79-.79a6 6 0 1 0-4.352 4.184l.807.806A7 7 0 1 1 8 1" />
    <path d="M8.5 7.5H12v1H7.5V4h1z" />
  </svg>
);
export const icon = EuiIconClockUp;
