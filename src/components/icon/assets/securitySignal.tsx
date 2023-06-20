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
const EuiIconSecuritySignal = ({
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
    <path
      fillRule="evenodd"
      d="M11.875 3.418a6 6 0 1 0 .707.707l-2.46 2.46-1.156 1.156a1 1 0 1 1-.707-.707l.757-.757a2 2 0 0 0-2.43 3.137.5.5 0 1 1-.707.707 3 3 0 0 1 3.86-4.567l.714-.714A4 4 0 1 0 8 12a.5.5 0 1 1 0 1 5 5 0 1 1 3.164-8.871l.71-.71zm.709-.709a7 7 0 1 0 .707.707l.366-.366a.5.5 0 1 0-.707-.707l-.366.366z"
    />
  </svg>
);
export const icon = EuiIconSecuritySignal;
