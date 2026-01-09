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
const EuiIconAxisX = ({
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
    <path d="M2 14h12v-1h1v3h-1v-1H2v1H1v-3h1v1Zm0-2H1v-2h1v2Zm5-7h-.433L8 6.719 9.433 5H9V4h2.5v1h-.766L8.65 7.5l2.084 2.5h.766v1H9v-1h.433L8 8.28 6.567 10H7v1H4.5v-1h.766l2.083-2.5L5.266 5H4.5V4H7v1ZM2 9H1V7h1v2Zm0-3H1V4h1v2Zm0-3H1V1h1v2Z" />
  </svg>
);
export const icon = EuiIconAxisX;
