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
const EuiIconFrameNext = ({
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
      d="M3 2a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1zm5.146.22 7.2 4.581a1.425 1.425 0 0 1 0 2.398l-7.2 4.581C7.21 14.375 6 13.692 6 12.581V3.42c0-1.112 1.21-1.795 2.146-1.2z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconFrameNext;
