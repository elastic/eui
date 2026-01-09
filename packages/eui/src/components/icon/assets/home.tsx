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
const EuiIconHome = ({
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
      d="M13 9.414V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V9.414l1-1V13h2v-3a1 1 0 0 1 1-1h2l.103.005A1 1 0 0 1 10 10v3h2V8.414l1 1ZM7 13h2v-3H7v3Z"
      clipRule="evenodd"
    />
    <path d="M8.048 2.002a1.002 1.002 0 0 1 .659.291l6 6L14 9 8 3 2 9l-.707-.707 6-6 .076-.068a.994.994 0 0 1 .679-.223ZM13 5.172l-1-1V2h1v3.172Z" />
  </svg>
);
export const icon = EuiIconHome;
