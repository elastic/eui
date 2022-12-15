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

const EuiIconIssue = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('issue');
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g clipPath={`url(#${generateId('a')})`} fill="#343741">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 .5c4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5S.5 12.136.5 8 3.864.5 8 .5zm0 .882a6.618 6.618 0 100 13.236A6.618 6.618 0 008 1.382z"
        />
        <path d="M9 8a1 1 0 11-2 0 1 1 0 012 0z" />
      </g>
      <clipPath id={generateId('a')}>
        <path d="M0 0h16v16H0z" />
      </clipPath>
    </svg>
  );
};

export const icon = EuiIconIssue;
