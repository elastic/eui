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
const EuiIconAppCases = ({
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
      fillRule="evenodd"
      d="M22.5 24a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 2a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
    />
    <path d="m30.293 27.707-4-4 1.414-1.414 4 4-1.414 1.414ZM6 4H2v27h25v-3h-2v1H4V6h2V4Zm19 6h2V4h-4v2h2v4Z" />
    <path
      fillRule="evenodd"
      d="m16.381 3.024.538 1.158h2.274l.636 2.545H9.68l.637-2.545h2.558l.538-1.158c.292-.63.955-1.024 1.484-1.024.53 0 1.193.394 1.485 1.024Zm6.01 5.703-1.636-6.545h-2.56C17.6.898 16.262 0 14.897 0c-1.364 0-2.703.898-3.299 2.182H8.755L7.118 8.727h15.273ZM7 15h6v-2H7v2Zm6 5H7v-2h6v2Zm-6 5h6v-2H7v2Z"
      className="euiIcon__fillSecondary"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconAppCases;
