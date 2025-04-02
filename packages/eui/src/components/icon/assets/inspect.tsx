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
const EuiIconInspect = ({
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
    <path d="M2 2h11v4c.379.284.716.62 1 1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h5a5.029 5.029 0 0 1-1-1H2V2Z" />
    <path d="M3.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm0 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM4 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM3.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM5.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM6 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    <path
      fillRule="evenodd"
      d="M6 10a4 4 0 1 1 7.16 2.453l2.194 2.193-.707.707-2.194-2.193A4 4 0 0 1 6 10Zm4-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconInspect;
