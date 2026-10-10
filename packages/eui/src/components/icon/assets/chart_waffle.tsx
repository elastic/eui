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
const EuiIconChartWaffle = ({
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
    <path d="M4.103 11.005A1 1 0 0 1 5 12v2l-.005.102A1 1 0 0 1 4 15H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2zM2 14h2v-2H2zm7.103-2.995A1 1 0 0 1 10 12v2l-.005.102A1 1 0 0 1 9 15H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2zM7 14h2v-2H7zm7.103-2.995A1 1 0 0 1 15 12v2l-.005.102A1 1 0 0 1 14 15h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2zM12 14h2v-2h-2zM4.103 6.005A1 1 0 0 1 5 7v2l-.005.103A1 1 0 0 1 4 10H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2zM2 9h2V7H2zm7.103-2.995A1 1 0 0 1 10 7v2l-.005.103A1 1 0 0 1 9 10H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2zM7 9h2V7H7zM14 9h-2V7h2zM4 4H2V2h2zm5 0H7V2h2zm5 0h-2V2h2z" />
  </svg>
);
export const icon = EuiIconChartWaffle;
