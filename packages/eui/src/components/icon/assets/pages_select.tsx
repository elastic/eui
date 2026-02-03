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
const EuiIconPagesSelect = ({
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
    <path d="M1 15h6.258c.314.38.678.716 1.082 1H1a1 1 0 0 1-1-1V2h1v13ZM12 4.293v1.73a5.564 5.564 0 0 0-1 0V5H8a1 1 0 0 1-1-1V1H3v12h3.208c.099.349.231.683.394 1H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h4.707L12 4.293ZM8 4h2.293L8 1.707V4Z" />
    <path d="M15 11.5a3.5 3.5 0 1 0-3.5 3.5v1a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9v-1a3.5 3.5 0 0 0 3.5-3.5Z" />
    <path d="M13.854 10.854 11 13.707l-1.854-1.854.708-.707L11 12.293l2.146-2.146.707.707Z" />
  </svg>
);
export const icon = EuiIconPagesSelect;
