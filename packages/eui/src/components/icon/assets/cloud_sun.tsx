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
const EuiIconCloudSun = ({
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
    <path d="M9 5a4 4 0 0 1 3.878 3.02A3.5 3.5 0 0 1 12.5 15H5a3 3 0 1 1 0-6q.001-.557.145-1.07A4.01 4.01 0 0 1 9 5m0 1a3 3 0 0 0-2.962 3.48l.117.727-.718-.16A2 2 0 1 0 5 14h7.5a2.5 2.5 0 0 0 0-4.999h-.03l-.251.016a2.5 2.5 0 0 0-1.487.716l-.707-.707a3.5 3.5 0 0 1 1.825-.963A3 3 0 0 0 9 6M2.38 8.325l-.707.707-.707-.707.707-.707zM4.5 3a2.5 2.5 0 0 1 2.296 1.512 5 5 0 0 0-.864.54A1.5 1.5 0 0 0 3 5.5c0 .801.628 1.453 1.419 1.495q-.204.464-.31.97A2.497 2.497 0 0 1 4.5 3M1.005 5.995h-1v-1h1zm1.383-3.326-.708.707-.707-.707.707-.708zm5.649-.001-.707.707-.707-.707.707-.707zM5 2H4V1h1z" />
  </svg>
);
export const icon = EuiIconCloudSun;
