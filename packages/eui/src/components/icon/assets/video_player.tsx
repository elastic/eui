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
const EuiIconVideoPlayer = ({
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
      d="M10.5 12a1.5 1.5 0 0 1 1.413 1H14v1h-2.087a1.5 1.5 0 0 1-2.826 0H2v-1h7.087a1.5 1.5 0 0 1 1.413-1Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM6.528 3.118a1 1 0 0 1 1.027.05l3 2a1 1 0 0 1 0 1.664l-3 2A1 1 0 0 1 6 8V4l.01-.137a1 1 0 0 1 .518-.745ZM7 8l3-2-3-2v4Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M13 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h10ZM3 10h10V2H3v8Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconVideoPlayer;
