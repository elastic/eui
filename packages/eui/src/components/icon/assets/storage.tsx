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
const EuiIconStorage = ({
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
    <path d="M5 5H3V4h2v1Zm0 2H3V6h2v1Zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-7v3H8V4h1Zm4 3V4h-1v3h1Z" />
    <path
      fillRule="evenodd"
      d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1v1h-1v-1H4v1H3v-1H2a1 1 0 0 1-1-1V3Zm5 0H2v9h4V3Zm1 0v9h3V3H7Zm4 0v9h3V3h-3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconStorage;
