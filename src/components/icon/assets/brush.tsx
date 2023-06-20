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
const EuiIconBrush = ({
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
    <path d="M11.993 8.17c0 .83-.673 1.507-1.499 1.507H5.498A1.505 1.505 0 0 1 3.999 8.17V6.662h7.994V8.17Zm-2.998 5.998c0 .455-.448.827-.999.827-.55 0-1-.372-1-.827v-3.486h2v3.486ZM4 5.658V1.005h1.262v4.653H4Zm2.261 0V1.005h1.244v4.653H6.26Zm2.244 0V1.005h1.235v4.653H8.504Zm2.234 0V1.005h1.254v4.653h-1.254ZM3.008 0 3 8.17a2.509 2.509 0 0 0 2.498 2.512h.5v3.486c0 1.01.896 1.832 1.998 1.832 1.102 0 1.998-.822 1.998-1.832v-3.486h.5a2.509 2.509 0 0 0 2.498-2.512L13 0H3.008Z" />
  </svg>
);
export const icon = EuiIconBrush;
