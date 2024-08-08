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
import { htmlIdGenerator } from '../../../services';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconCrossInCircle = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('crossInCircle');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g clipPath={`url(#${generateId('a')})`}>
        <path
          d="m8.755 8 2.64 2.641a.534.534 0 1 1-.754.755L8 8.755l-2.641 2.64a.534.534 0 1 1-.755-.754L7.245 8l-2.64-2.641a.534.534 0 1 1 .754-.755L8 7.245l2.641-2.64a.534.534 0 1 1 .755.754L8.755 8Zm4.904-5.66c3.121 3.121 3.121 8.199 0 11.32-3.12 3.12-8.198 3.12-11.318 0C-.78 10.538-.78 5.46 2.34 2.34c3.12-3.12 8.198-3.12 11.319 0Zm-.665.666a7.062 7.062 0 1 0-9.988 9.988 7.062 7.062 0 0 0 9.988-9.988Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id={generateId('a')}>
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const icon = EuiIconCrossInCircle;
