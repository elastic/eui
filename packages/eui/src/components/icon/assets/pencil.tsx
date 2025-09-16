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
const EuiIconPencil = ({
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
    <path d="M10 2.293a1 1 0 0 1 1.414 0l2.293 2.293a1 1 0 0 1 0 1.414l-7 7H11v1H2v-3.707l8-8Zm-7 8.414V13h2.293l5.5-5.5L8.5 5.207l-5.5 5.5ZM9.207 4.5 11.5 6.793l1.5-1.5L10.707 3l-1.5 1.5ZM14 14h-2v-1h2v1Z" />
  </svg>
);
export const icon = EuiIconPencil;
