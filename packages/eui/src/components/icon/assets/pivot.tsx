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
const EuiIconPivot = ({
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
      d="M2.89 13.847 11.239 5.5a.522.522 0 0 0-.737-.737L2.154 13.11a.522.522 0 0 0 .738.738ZM14 6.696a.522.522 0 1 1-1.043 0v-3.13a.522.522 0 0 0-.522-.523h-3.13a.522.522 0 1 1 0-1.043h3.13C13.299 2 14 2.7 14 3.565v3.13Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconPivot;
