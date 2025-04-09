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
const EuiIconControls = ({
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
      d="M10.5 8a2.5 2.5 0 0 0 2.45-2H15V5h-2.05a2.5 2.5 0 0 0-4.9 0H1v1h7.05a2.5 2.5 0 0 0 2.45 2Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-2.55 4H15v-1H7.95a2.5 2.5 0 0 0-4.9 0H1v1h2.05a2.5 2.5 0 0 0 4.9 0ZM7 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconControls;
