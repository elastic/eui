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
const EuiIconMagnifyWithPlus = ({
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
    <path d="M7.5 6.5H10v1H7.5V10h-1V7.5H4v-1h2.5V4h1v2.5Z" />
    <path d="M7 1a6 6 0 0 1 5.168 9.047l2.393 2.393a1.5 1.5 0 1 1-2.121 2.12l-2.393-2.392A6 6 0 1 1 7 1Zm4.58 9.873a6.038 6.038 0 0 1-.707.707l2.274 2.274a.5.5 0 0 0 .707-.707l-2.274-2.274ZM7 2a5 5 0 1 0 0 10A5 5 0 0 0 7 2Z" />
  </svg>
);
export const icon = EuiIconMagnifyWithPlus;
