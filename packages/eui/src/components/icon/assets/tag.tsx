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
const EuiIconTag = ({
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
      d="M11 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm1 2a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12 1a1 1 0 0 1 .707.293l2 2A1 1 0 0 1 15 4v3a1 1 0 0 1-.293.707l-7 7a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l7-7A1 1 0 0 1 9 1h3Zm2 3v3l-7 7-5-5 7-7h3l2 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTag;
