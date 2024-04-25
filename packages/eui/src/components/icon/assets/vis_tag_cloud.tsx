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
const EuiIconVisTagCloud = ({
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
    <path d="M1.5 9.047a.5.5 0 1 0 0 1h13a.5.5 0 0 0 0-1h-13Zm0-1h13a1.5 1.5 0 0 1 0 3h-13a1.5 1.5 0 0 1 0-3ZM10 13a.5.5 0 1 1 0 1H4a.5.5 0 1 1 0-1h6ZM8.001 2.015a.5.5 0 1 1-.002 1l-5-.015a.5.5 0 1 1 .003-1l5 .015ZM14 5a.5.5 0 1 1 0 1H6a.5.5 0 0 1 0-1h8Z" />
  </svg>
);
export const icon = EuiIconVisTagCloud;
