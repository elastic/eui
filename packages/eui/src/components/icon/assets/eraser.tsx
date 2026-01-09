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
const EuiIconEraser = ({
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
      d="M9.37 2.225a1 1 0 0 1 1.337.068l4 4a1 1 0 0 1 0 1.414L9.414 13H12v1H3.586l-2.293-2.293a1 1 0 0 1 0-1.414l8-8 .076-.068ZM2 11l2 2h4l1.647-1.646-4-4L2 11Zm7.707-1H11l1-1H8.707l1 1Zm-2-2H13l1-1H6.707l1 1ZM7 6h6l-1-1H8L7 6Zm2-2h2l-1-1-1 1Z"
      clipRule="evenodd"
    />
    <path d="M15 14h-2v-1h2v1Z" />
  </svg>
);
export const icon = EuiIconEraser;
