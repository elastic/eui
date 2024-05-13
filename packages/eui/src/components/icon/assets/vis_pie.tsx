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
const EuiIconVisPie = ({
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
    <path d="M6.5 9a.5.5 0 0 1-.5-.5V3.023A5.5 5.5 0 1 0 11.978 9H6.5ZM7 8h5.5a.5.5 0 0 1 .5.5A6.5 6.5 0 1 1 6.5 2a.5.5 0 0 1 .5.5V8Zm2-6.972V6h4.972C13.696 3.552 11.448 1.304 9 1.028ZM14.5 7h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5C11.853 0 15 3.147 15 6.5a.5.5 0 0 1-.5.5ZM6.146 8.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1-.708.708l-4-4Z" />
  </svg>
);
export const icon = EuiIconVisPie;
