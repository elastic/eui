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
const EuiIconInputOutput = ({
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
    <path d="M1 14V6a1 1 0 0 1 1-1h8.293L8.646 3.354l.708-.708L12.207 5.5 9.354 8.354l-.708-.708L10.293 6H2v8h8v-2h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm6.354-5.646L5.707 10H14V2H6v2H5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5.707l1.647 1.646-.708.707L3.793 10.5l2.853-2.854.708.708Z" />
  </svg>
);
export const icon = EuiIconInputOutput;
