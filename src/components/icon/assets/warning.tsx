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
    <path d="m8.55 9.502.35-3.507a.905.905 0 1 0-1.8 0l.35 3.507a.552.552 0 0 0 1.1 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path d="M8.864 1.496a1 1 0 0 0-1.728 0l-7 12A1 1 0 0 0 1 15h14a1 1 0 0 0 .864-1.504l-7-12ZM1 14 8 2l7 12H1Z" />
  </svg>
);
export const icon = EuiIconWarning;
