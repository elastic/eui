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
const EuiIconWrench = ({
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
    <path d="m6.918 9.746 4.537 4.537a2 2 0 1 0 2.828-2.829l-3.157-3.156a.5.5 0 0 1 .708-.708l3.156 3.157a3 3 0 1 1-4.243 4.243l-4.949-4.95a5.001 5.001 0 0 1-5.22-7.106.5.5 0 0 1 .805-.138L3.676 5.09a1 1 0 1 0 1.415-1.414L2.797 1.382a.5.5 0 0 1 .138-.805 5.001 5.001 0 1 1 3.983 9.169ZM1.226 4.054a4.002 4.002 0 0 0 6.693 3.865 4 4 0 0 0-3.865-6.693l1.744 1.743a2 2 0 1 1-2.829 2.828L1.226 4.054Zm10.229 8.814a1 1 0 1 1 1.414-1.414 1 1 0 0 1-1.414 1.414Z" />
  </svg>
);
export const icon = EuiIconWrench;
