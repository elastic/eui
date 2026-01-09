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
const EuiIconVectorTriangle = ({
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
      d="M9 2a1 1 0 0 1 1 1v2a.995.995 0 0 1-.327.736L12.339 10H14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-.499H5V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1.661l2.664-4.264A.996.996 0 0 1 6 5V3a1 1 0 0 1 1-1h2ZM2 13h2v-2H2v2Zm10 0h2v-2h-2v2Zm-7.325-2.736c.2.183.325.444.325.736v.501h6V11c0-.292.125-.553.324-.736L8.66 6H7.341l-2.666 4.264ZM7 5h2V3H7v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconVectorTriangle;
