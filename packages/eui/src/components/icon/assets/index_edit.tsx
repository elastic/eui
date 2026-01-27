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
const EuiIconIndexEdit = ({
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
    <path d="M3 6h2v1H3V6Zm3 0h2v1H6V6Zm0 3h2v1H6V9Zm3-3h4v1H9V6ZM3 9h2v1H3V9Zm0 3h2v1H3v-1Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v5.269a1.993 1.993 0 0 0-1-.267V5H2v9h5v1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 4h12V2H2v2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M13.37 8.225a1 1 0 0 1 1.337.068l1 1a1 1 0 0 1 0 1.414l-5 5A1 1 0 0 1 10 16H8v-2a1 1 0 0 1 .293-.707l5-5 .076-.068ZM9 14v1h1l3.646-3.646-1-1L9 14Zm4.354-4.354 1 1L15 10l-1-1-.646.646Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconIndexEdit;
