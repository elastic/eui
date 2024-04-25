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
const EuiIconLogoSketch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none">
      <path
        fill="#FFAE00"
        d="M16 32 0 11.454l6.931-10.38L16 0l9.069 1.074L32 11.454z"
      />
      <path fill="#EC6C00" d="M16 32 0 11.454h32z" />
      <path fill="#FFAE00" d="M16 32 6.477 11.454h19.045z" />
      <path fill="#FFEFB4" d="M16 0 6.477 11.454h19.045z" />
      <path
        fill="#FFAE00"
        d="M6.932 1.074 3.369 6.3.001 11.454h6.542zM25.069 1.074 28.632 6.3 32 11.454h-6.542z"
      />
      <path
        fill="#FED305"
        d="m6.931 1.074-.453 10.38L16 0zM25.069 1.074l.453 10.38L16 0z"
      />
    </g>
  </svg>
);
export const icon = EuiIconLogoSketch;
