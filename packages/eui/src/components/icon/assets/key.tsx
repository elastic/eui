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
      d="M11.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M10.5 1A4.5 4.5 0 1 1 9 9.742V11H7v2H5v2H1v-3.707l5.06-5.06A4.5 4.5 0 0 1 10.5 1Zm0 1a3.5 3.5 0 0 0-3.411 4.287l.061.27L2 11.707V14h2v-2h2v-2h2V8.098l.75.434A3.5 3.5 0 1 0 10.5 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconKey;
