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
const EuiIconWarning = ({
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
    <path d="M9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M7.5 10V5h1v5h-1Z" clipRule="evenodd" />
    <path
      fillRule="evenodd"
      d="M8 1a1 1 0 0 1 .864.496l7 12A1 1 0 0 1 15 15H1a1 1 0 0 1-.864-1.504l7-12A1 1 0 0 1 8 1ZM1 14h14L8 2 1 14Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconWarning;
