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
const EuiIconThumbUp = ({
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
    <path d="M4 13H3v-2h1v2Z" />
    <path
      fillRule="evenodd"
      d="M8.197 1.787a1.135 1.135 0 0 1 1.89-.438 3.222 3.222 0 0 1 .656 3.519L10.26 6h2.738a2 2 0 0 1 1.977 2.308l-.716 4.578A2.5 2.5 0 0 1 11.788 15H8.803a6.457 6.457 0 0 1-2.86-.67A.999.999 0 0 1 5 15H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3a1 1 0 0 1 .943.67A5.012 5.012 0 0 0 7.73 3.206l.467-1.42ZM2 14h3V6H2v8ZM9.372 2.048a.135.135 0 0 0-.225.051L8.68 3.52A6.012 6.012 0 0 1 6 6.827v6.392c.846.507 1.813.78 2.803.78h2.985a1.5 1.5 0 0 0 1.482-1.269l.715-4.577A1 1 0 0 0 12.997 7H9.5a.5.5 0 0 1-.46-.697l.784-1.829a2.222 2.222 0 0 0-.452-2.426Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconThumbUp;
