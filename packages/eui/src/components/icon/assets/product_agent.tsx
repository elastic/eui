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
const EuiIconProductAgent = ({
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
    <path d="M10.447 11.523C9.826 12.767 8.59 13 8 13c-.59 0-1.826-.233-2.447-1.477l.894-.447C6.826 11.833 7.59 12 8 12c.41 0 1.174-.167 1.553-.924l.894.447Z" />
    <path
      fillRule="evenodd"
      d="M5.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5-1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8 0a1.5 1.5 0 0 1 .5 2.912V4H11a3 3 0 0 1 3 3h1l.102.005A1 1 0 0 1 16 8v3a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1a3 3 0 0 1 3-3h2.5V2.912A1.498 1.498 0 0 1 8 0ZM5 5a2 2 0 0 0-2 2v7h10V7a2 2 0 0 0-2-2H5Zm-4 6h1V8H1v3Zm13 0h1V8h-1v3ZM8 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconProductAgent;
