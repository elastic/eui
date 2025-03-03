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
const EuiIconTrash = ({
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
    <path d="M7 6H6v6h1V6Zm2.997 0h-1v6h1V6Z" />
    <path
      fillRule="evenodd"
      d="M5 2v1H2v1h1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4h1V3h-3V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1Zm5 0H6v1h4V2ZM4 14V4h8v10H4Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTrash;
