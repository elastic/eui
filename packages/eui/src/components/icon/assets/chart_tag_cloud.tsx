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
const EuiIconChartTagCloud = ({
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
    <path d="M7 14H5v-1h2v1Zm4 0H8v-1h3v1Zm-3-2H3v-1h5v1Zm5 0H9v-1h4v1Z" />
    <path
      fillRule="evenodd"
      d="M14 6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-.995-.897L1 9V7a1 1 0 0 1 1-1h12ZM2 9h12V7H2v2Z"
      clipRule="evenodd"
    />
    <path d="M6 5H3V4h3v1Zm7 0H7V4h6v1Zm-3-2H6V2h4v1Z" />
  </svg>
);
export const icon = EuiIconChartTagCloud;
