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
const EuiIconHourglass = ({
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
    <path d="M8.5 13h-1v-1h1v1Z" />
    <path
      fillRule="evenodd"
      d="M13 2h-1v2.47a2.5 2.5 0 0 1-1.047 2.035L8.86 8l2.093 1.495A2.5 2.5 0 0 1 12 11.53V14h1v1H3v-1h1v-2.47a2.5 2.5 0 0 1 1.047-2.035L7.139 8 5.047 6.505A2.5 2.5 0 0 1 4 4.47V2H3V1h10v1Zm-4.5 9h-1V8.97l-1.872 1.34A1.5 1.5 0 0 0 5 11.529V14h6v-2.47a1.5 1.5 0 0 0-.628-1.221L8.5 8.97V11ZM5.097 5a1.5 1.5 0 0 0 .53.691L8 7.385l2.372-1.694c.245-.175.428-.417.531-.691H5.097ZM5 4h6V2H5v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconHourglass;
