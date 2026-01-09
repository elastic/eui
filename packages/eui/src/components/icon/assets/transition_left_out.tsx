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
    <path d="M10.854 5.854 9.207 7.5H13v1H9.207l1.646 1.646-.707.707L7.293 8l2.853-2.854.707.708Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 13.207V14h.793L5 11.793v-1.586l-3 3ZM4.207 14H5v-.793L4.207 14ZM6 14h8V2H6v12Zm-4-3.793v1.586l3-3V7.207l-3 3Zm0-3v1.586l3-3V4.207l-3 3Zm0-3v1.586l3-3V2h-.793L2 4.207Zm0-1.414L2.793 2H2v.793Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTransitionLeftOut;
