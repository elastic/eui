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
const EuiIconFullScreenExit = ({
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
    <path d="M9 7V3h1v3h3v1H9zM7 7H3V6h3V3h1v4zm2 2h4v1h-3v3H9V9zM7 9v4H6v-3H3V9h4zM0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zm1 0v12.012c0 .548.446.994.994.994h12.012a.995.995 0 0 0 .994-.994V1.994A.995.995 0 0 0 14.006 1H1.994A.995.995 0 0 0 1 1.994z" />
  </svg>
);
export const icon = EuiIconFullScreenExit;
