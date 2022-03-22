/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import { htmlIdGenerator } from '../../../services';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconBranchUser = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('branchUser');
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
      <g clipPath={`url(#${generateId('clip0_1210_934')})`}>
        <path d="M3.188 8.482a3.053 3.053 0 012.187-.92h.875c1.077 0 1.972-.351 2.154-1.376a1.75 1.75 0 11.883.015C9.09 7.704 7.806 8.438 6.25 8.438h-.875c-1.084 0-1.985.789-2.157 2.25a1.75 1.75 0 11-.905-.008V4.445a1.75 1.75 0 11.874 0v4.037zM2.75 3.625a.875.875 0 100-1.75.875.875 0 000 1.75zm0 9.625a.875.875 0 100-1.75.875.875 0 000 1.75zm6.125-7.875a.875.875 0 100-1.75.875.875 0 000 1.75z" />
      </g>
      <g clipPath={`url(#${generateId('clip1_1210_934')})`}>
        <circle cx={11.938} cy={10.406} r={1.531} />
        <g clipPath={`url(#${generateId('clip2_1210_934')})`}>
          <path
            d="M15 15H8.875c.29-1.248 1.55-2.188 3.063-2.188 1.511 0 2.772.94 3.062 2.188zm-3.058 3.281h-.009.009z"
            clipRule="evenodd"
          />
        </g>
      </g>
      <defs>
        <clipPath id={generateId('clip0_1210_934')}>
          <path d="M0 0h9.625v13.125H0z" transform="translate(1 1)" />
        </clipPath>
        <clipPath id={generateId('clip1_1210_934')}>
          <path d="M0 0h6.125v6.125H0z" transform="translate(8.875 8.875)" />
        </clipPath>
        <clipPath id={generateId('clip2_1210_934')}>
          <path d="M0 0h6.125v2.625H0z" transform="translate(8.875 12.375)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const icon = EuiIconBranchUser;
