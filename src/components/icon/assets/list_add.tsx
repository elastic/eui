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
const EuiIconListAdd = ({
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
    <path d="M11 11H9v1h2v2h1v-2h2v-1h-2V9h-1v2ZM7.758 9a4.5 4.5 0 1 1-.502 4H6v-1h1.027a4.548 4.548 0 0 1 .23-2H6V9h1.758ZM2 4V3h2v1H2Zm4 0V3h8v1H6Zm0 3V6h8v1H6ZM2 7V6h2v1H2Zm0 3V9h2v1H2Zm0 3v-1h2v1H2Z" />
  </svg>
);
export const icon = EuiIconListAdd;
