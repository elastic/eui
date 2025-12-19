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
const EuiIconFilterExclude = ({
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
    <path d="M15.854 10.852 14.207 12.5l1.647 1.647-.706.707-1.648-1.647-1.646 1.648-.707-.707 1.646-1.648-1.645-1.647.707-.707 1.645 1.647 1.646-1.646.707.706ZM8 13H6v-1h2v1Zm2-3H4V9h6v1Zm2-3H2V6h10v1Zm2-3H0V3h14v1Z" />
  </svg>
);
export const icon = EuiIconFilterExclude;
