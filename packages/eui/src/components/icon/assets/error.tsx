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
const EuiIconError = ({
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
    <path d="M11.354 5.354 8.707 8l2.646 2.646-.707.707L8 8.707l-2.646 2.646-.708-.707L7.293 8 4.646 5.354l.708-.708L8 7.293l2.646-2.647.707.708Z" />
    <path d="M10.293 1a1 1 0 0 1 .707.293L14.707 5a1 1 0 0 1 .293.707v4.586a1 1 0 0 1-.293.707L11 14.707a1 1 0 0 1-.707.293H5.707A1 1 0 0 1 5 14.707L1.293 11A1 1 0 0 1 1 10.293V5.707A1 1 0 0 1 1.293 5L5 1.293A1 1 0 0 1 5.707 1h4.586ZM2 5.707v4.586L5.707 14h4.586L14 10.293V5.707L10.293 2H5.707L2 5.707Z" />
  </svg>
);
export const icon = EuiIconError;
