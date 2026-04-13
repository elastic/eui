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
const EuiIconAddToDashboard = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('add_to_dashboard');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="m8.5 9.207 3.854-3.853-.708-.708L8.5 7.793l-2-2-3.854 3.853.708.708L6.5 7.207zM14 13h2v1h-2v2h-1v-2h-2v-1h2v-2h1z" />
      <mask
        id={generateId('a')}
        width={13}
        height={13}
        x={1}
        y={1}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fillRule="evenodd"
          d="M13.072 1c.464 0 .928.542.928 1.083v10.834c0 .541-.464 1.083-.929 1.083H1.931C1.464 14 1 13.567 1 12.917V2.083C1 1.542 1.467 1 1.93 1zM1.93 12.917h11.14V2.083H1.932z"
        />
      </mask>
      <g mask={`url(#${generateId('a')})`}>
        <path d="M1-.083h13.464V9H9v5H1z" />
      </g>
    </svg>
  );
};
export const icon = EuiIconAddToDashboard;
