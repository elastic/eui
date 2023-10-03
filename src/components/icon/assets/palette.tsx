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
const EuiIconPalette = ({
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
    <path d="M4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4-2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path d="M8 1a7 7 0 0 0 0 14h2a2 2 0 1 0 0-4 1 1 0 1 1 0-2h3.98C14.515 9 15 8.583 15 8a7 7 0 0 0-7-7ZM2 8a6 6 0 0 1 12-.005.035.035 0 0 1-.02.005H10a2 2 0 1 0 0 4 1 1 0 1 1 0 2H8a6 6 0 0 1-6-6Z" />
  </svg>
);
export const icon = EuiIconPalette;
