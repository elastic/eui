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
const EuiIconEndpoint = ({
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
    <path d="M9.406 13.454a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path
      fillRule="evenodd"
      d="M6.86 6.09a2.545 2.545 0 1 1 2.497-3.045h.368a2.727 2.727 0 1 1 0 5.455H6.543a1.727 1.727 0 1 0 0 3.454h.367a2.546 2.546 0 1 1 0 1h-.367a2.727 2.727 0 1 1 0-5.454h3.182a1.727 1.727 0 1 0 0-3.455h-.368a2.546 2.546 0 0 1-2.496 2.046L6.86 6.09Zm0-1a1.545 1.545 0 1 1 0-3.09 1.545 1.545 0 0 1 0 3.09ZM9.407 14a1.545 1.545 0 1 1 0-3.09 1.545 1.545 0 0 1 0 3.09Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconEndpoint;
