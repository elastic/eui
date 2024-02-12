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
const EuiIconKey = ({
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
      d="M14 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
    <path d="M6 6a5 5 0 1 1 3.086 4.62l-1.232 1.234A.5.5 0 0 1 7.5 12H6v1.5a.5.5 0 0 1-.5.5H4v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .175-.38l5.932-5.085A5.019 5.019 0 0 1 6 6Zm5-4a4 4 0 0 0-3.853 5.08.5.5 0 0 1-.156.515L1 12.73V15h2v-1.5a.5.5 0 0 1 .5-.5H5v-1.5a.5.5 0 0 1 .5-.5h1.793l.877-.877a5.033 5.033 0 0 1-.503-.396.5.5 0 1 1 .666-.745A3.983 3.983 0 0 0 11 10h.005A4 4 0 0 0 11 2Z" />
  </svg>
);
export const icon = EuiIconKey;
