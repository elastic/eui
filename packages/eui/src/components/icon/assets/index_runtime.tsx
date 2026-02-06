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
const EuiIconIndexRuntime = ({
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
    <path d="M3 6h2v1H3V6Zm3 0h2v1H6V6Zm3 0h4v1H9V6ZM3 9h2v1H3V9Zm3 0h2v1H6V9Zm-3 3h2v1H3v-1Zm3 0h2v1H6v-1Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v7.264l-1-.5V5H2v9h6v1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 4h12V2H2v2Z"
      clipRule="evenodd"
    />
    <path d="M9.475 8.15a1 1 0 0 1 .972-.045l5 2.5a1 1 0 0 1 .126 1.714l-5 3.5A1 1 0 0 1 9 15V9a1 1 0 0 1 .475-.85ZM10 15l5-3.5L10 9v6Z" />
  </svg>
);
export const icon = EuiIconIndexRuntime;
