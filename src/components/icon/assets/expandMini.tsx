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
const EuiIconExpandMini = ({
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
      d="M6.707 10 10 6.707A.5.5 0 0 0 9.293 6L6 9.293a.5.5 0 1 0 .707.707ZM4 9.5a.5.5 0 0 1 1 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 1 1 0 1h-1A1.5 1.5 0 0 1 4 10.5v-1Zm8-3a.5.5 0 1 1-1 0v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1 0-1h1A1.5 1.5 0 0 1 12 5.5v1Z"
    />
  </svg>
);
export const icon = EuiIconExpandMini;
