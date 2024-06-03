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
const EuiIconLogoAppSearch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#0080D5"
      d="M19.5.938a7.002 7.002 0 0 0-7 0l-8 4.619A7 7 0 0 0 1 11.62v9.237a7 7 0 0 0 3.5 6.062l7.5 4.33V17.979a7 7 0 0 1 3.5-6.062L27 5.276 19.5.939Z"
    />
    <path
      d="M19.5.938a7.002 7.002 0 0 0-7 0L5 5.277l11 6.35 11-6.35-7.5-4.34Z"
      className="euiIcon__fillNegative"
    />
    <path
      fill="#FA744E"
      d="m28.435 7.76-10.026 5.79a6.994 6.994 0 0 1 1.59 4.428v13.27l7.5-4.33a7 7 0 0 0 3.5-6.061v-9.238a6.992 6.992 0 0 0-1.586-4.422l-.978.564Z"
    />
  </svg>
);
export const icon = EuiIconLogoAppSearch;
