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
const EuiIconArrowUp = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M1.957 11.018c.286.3.761.31 1.06.024l4.81-4.59a.25.25 0 0 1 .346 0l4.81 4.59a.75.75 0 0 0 1.035-1.085l-4.81-4.59a1.75 1.75 0 0 0-2.416 0l-4.81 4.59a.75.75 0 0 0-.025 1.06Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconArrowUp;
