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
const EuiIconFullScreenExit = ({
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
    <path d="M6 12H5v-2H3V9h3v3Zm7-2h-2v2h-1V9h3v1ZM6 7H3V6h2V4h1v3Zm5-1h2v1h-3V4h1v2Z" />
    <path
      fillRule="evenodd"
      d="M14.102 2.005A1 1 0 0 1 15 3v10a1 1 0 0 1-.898.995L14 14H2a1 1 0 0 1-.995-.898L1 13V3a1 1 0 0 1 1-1h12l.102.005ZM2 13h12V3H2v10Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconFullScreenExit;
