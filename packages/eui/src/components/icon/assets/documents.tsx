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
const EuiIconDocuments = ({
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
      d="M4 1a1 1 0 0 1 1-1h4.707L14 4.293V13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V1Zm5 0H5v12h8V5h-3a1 1 0 0 1-1-1V1Zm1 .707L12.293 4H10V1.707Z"
      clipRule="evenodd"
    />
    <path d="M3 15V2H2v13a1 1 0 0 0 1 1h9v-1H3Z" />
  </svg>
);
export const icon = EuiIconDocuments;
