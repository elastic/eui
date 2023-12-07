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
const EuiIconPipeNoBreaks = ({
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
    <path d="M8 2H7v3h1V4h3V3H8V2Zm-5 8H2v3h1v-1h3v-1H3v-1Zm4 0h1v1h3v1H8v1H7v-3Zm6 0h-1v3h1v-1h1v-1h-1v-1ZM5 6h1v1h3v1H6v1H5V6Zm6 0h-1v3h1V8h3V7h-3V6Zm1-4h1v1h1v1h-1v1h-1V2ZM6 3H2v1h4V3ZM2 7h2v1H2V7Z" />
  </svg>
);
export const icon = EuiIconPipeNoBreaks;
