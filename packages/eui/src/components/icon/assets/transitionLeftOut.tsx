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
const EuiIconTransitionLeftOut = ({
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
    <path d="M9.854 5.854a.5.5 0 0 0-.708-.708l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L8.707 8H12.5a.5.5 0 0 0 0-1H8.707l1.147-1.146Z" />
    <path
      fillRule="evenodd"
      d="M2 0h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm2.707 1H5v1.293l-4 4V4.707L4.707 1ZM6 14V1h7a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6Zm-1-1.293V14H3.707L5 12.707Zm0-3v1.586L2.293 14H2a1 1 0 0 1-.838-.454L5 9.707Zm0-3v1.586l-4 4v-1.586l4-4Zm0-3v1.586l-4 4V7.707l4-4ZM3.293 1H2a1 1 0 0 0-1 1v1.293L3.293 1Z"
    />
  </svg>
);
export const icon = EuiIconTransitionLeftOut;
