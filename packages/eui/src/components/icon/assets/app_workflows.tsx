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
const EuiIconAppWorkflows = ({
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
      d="M6 1a2 2 0 0 1 1.93 1.5H12a3 3 0 0 1 0 6H9.93a2 2 0 0 1-3.86 0H4a2 2 0 0 0 0 4h4.07A2 2 0 0 1 10 11h3a2 2 0 1 1 0 4h-3a2 2 0 0 1-1.93-1.5H4a3 3 0 1 1 0-6h2.07a2 2 0 0 1 3.86 0H12a2 2 0 0 0 0-4H7.93A2 2 0 0 1 6 5H3a2 2 0 1 1 0-4h3Zm4 11a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3ZM8 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3 2a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2H3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconAppWorkflows;
