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
const EuiIconLogoElasticMono = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      d="M31.934 16.665a6.28 6.28 0 0 0-4.157-5.927c.112-.565.168-1.14.168-1.716a9.019 9.019 0 0 0-16.334-5.28A4.789 4.789 0 0 0 4.19 9.198 6.37 6.37 0 0 0 0 15.148a6.29 6.29 0 0 0 4.176 5.945 9 9 0 0 0-.157 1.714 8.994 8.994 0 0 0 16.313 5.244 4.783 4.783 0 0 0 7.426-5.435 6.37 6.37 0 0 0 4.176-5.951m-19.57-11.96a7.884 7.884 0 0 1 14.229 6.005l-7.05 6.174-6.988-3.184-1.364-2.913zM8.83 3.921c.829 0 1.634.272 2.293.775l-1.057 5.442-4.788-1.132A3.79 3.79 0 0 1 8.83 3.921m-7.595 11.24a5.33 5.33 0 0 1 3.628-5.019l5.255 1.241 1.233 2.637-6.719 6.077a5.28 5.28 0 0 1-3.397-4.935m18.367 11.952a7.9 7.9 0 0 1-14.275-6.01l6.87-6.217 7.015 3.197 1.553 2.967zm3.51.784a3.75 3.75 0 0 1-2.282-.784l1.041-5.424 4.785 1.118a3.79 3.79 0 0 1-3.544 5.087zm3.96-6.229-5.268-1.231-1.4-2.667 6.89-6.036A5.27 5.27 0 0 1 30.7 16.66a5.33 5.33 0 0 1-3.629 5.005z"
    />
  </svg>
);
export const icon = EuiIconLogoElasticMono;
