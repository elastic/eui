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
const EuiIconFilterInclude = ({
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
    <path
      fillRule="evenodd"
      d="M5.5 9.914.293 4.707A1 1 0 0 1 0 4V2h12v2a1 1 0 0 1-.293.707L6.5 9.914V13l-1 1V9.914ZM11 3v1L6 9 1 4V3h10Z"
      clipRule="evenodd"
    />
    <path d="M12 12V9h1v3h3v1h-3v3h-1v-3H9v-1h3Z" />
  </svg>
);
export const icon = EuiIconFilterInclude;
