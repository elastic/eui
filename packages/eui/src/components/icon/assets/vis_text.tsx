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
const EuiIconVisText = ({
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
    <path d="M6 1h4v1H6V1Zm0 13h4v1H6v-1Zm9-4V6h-1v4h1ZM2 6v4H1V6h1ZM1 2a1 1 0 0 1 1-1h2v1H2v2H1V2Zm1 13a1 1 0 0 1-1-1v-2h1v2h2v1H2ZM15 2a1 1 0 0 0-1-1h-2v1h2v2h1V2Zm-1 13a1 1 0 0 0 1-1v-2h-1v2h-2v1h2ZM12 4H4v2h1V5h2.5v6h-1v1h3v-1h-1V5H11v1h1V4Z" />
  </svg>
);
export const icon = EuiIconVisText;
