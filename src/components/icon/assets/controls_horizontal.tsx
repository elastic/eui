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
const EuiIconControlsHorizontal = ({
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
      d="M8.05 10a2.5 2.5 0 0 1 4.9 0h1.55a.5.5 0 1 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H1.5a.5.5 0 1 1 0-1h6.55Zm-.1-4a2.5 2.5 0 0 1-4.9 0H1.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h6.55a.5.5 0 1 1 0 1H7.95ZM4 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm8 5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
    />
  </svg>
);
export const icon = EuiIconControlsHorizontal;
