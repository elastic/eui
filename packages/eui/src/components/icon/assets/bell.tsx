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
const EuiIconBell = ({
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
    <path
      fillRule="evenodd"
      d="M3 7a5 5 0 0 1 4.5-4.975V0h1v2.025A5 5 0 0 1 13 7v2.5a5.617 5.617 0 0 0 1.16 3.418l.065.082H15v1h-5a2 2 0 1 1-4 0H1v-1h.775l.066-.082A5.617 5.617 0 0 0 3 9.5V7Zm4 7a1 1 0 1 0 2 0H7Zm5.811-1.323c.063.116.127.223.188.323H3.001a6.618 6.618 0 0 0 1-3.5V7A4 4 0 1 1 12 7v2.5a6.62 6.62 0 0 0 .811 3.177Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconBell;
