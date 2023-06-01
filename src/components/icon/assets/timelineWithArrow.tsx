/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconTimelineWithArrow = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M7.854 4.854A.5.5 0 017 4.5V4H6a1 1 0 01-1-1V1a1 1 0 011-1h3a1 1 0 011 1v2a1 1 0 01-1 1H8v.5a.5.5 0 01-.146.354zM6 3V1h3v2H6zM2.146 9.146A.5.5 0 002 9.5v.5H1a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 00-1-1H3v-.5a.5.5 0 00-.854-.354zM4 13v-2H1v2h3zM11.5 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm.354-6.854l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.707-.708L12.293 11H9.5a.5.5 0 010-1h2.793l-1.146-1.146a.5.5 0 11.707-.708zM8.337 6H3.915a1.5 1.5 0 00-2.83 0H.5a.5.5 0 000 1h.585a1.5 1.5 0 002.83 0h3.342c.314-.38.677-.716 1.08-1zM2 6.5a.5.5 0 111 0 .5.5 0 01-1 0z"
    />
  </svg>
);
export const icon = EuiIconTimelineWithArrow;
