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
const EuiIconClickRight = ({
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
    <path d="M11 .5a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0v-1Zm3.146.646a.5.5 0 0 1 .708.708l-1 1a.5.5 0 0 1-.708-.708l1-1Z" />
    <path
      fillRule="evenodd"
      d="M3 7a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0V7Zm1 0a4 4 0 0 1 4-4v5a1 1 0 0 0 1 1h3v2a4 4 0 0 1-8 0V7Z"
    />
    <path d="M16 4.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .5-.5Z" />
  </svg>
);
export const icon = EuiIconClickRight;
