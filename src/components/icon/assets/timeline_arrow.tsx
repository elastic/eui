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

const EuiIconTimelineArrow = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.854 10.146A.5.5 0 016 10.5v.5h1a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h1v-.5a.5.5 0 01.854-.354zM7 14H4v-2h3v2zM9.854 4.854A.5.5 0 019 4.5V4H8a1 1 0 01-1-1V1a1 1 0 011-1h3a1 1 0 011 1v2a1 1 0 01-1 1h-1v.5a.5.5 0 01-.146.354zM8 3V1h3v2H8zM2.854 4.854A.5.5 0 003 4.5V4h1a1 1 0 001-1V1a1 1 0 00-1-1H1a1 1 0 00-1 1v2a1 1 0 001 1h1v.5a.5.5 0 00.854.354zM1 1v2h3V1H1zM12.646 5.646a.5.5 0 01.708 0l1.5 1.5a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708-.708L13.293 8h-2.378a1.5 1.5 0 01-2.83 0h-4.17a1.5 1.5 0 01-2.83 0H.5a.5.5 0 010-1h.585a1.5 1.5 0 012.83 0h4.17a1.5 1.5 0 012.83 0h2.378l-.647-.646a.5.5 0 010-.708zM2.5 7a.5.5 0 100 1 .5.5 0 000-1zm7 0a.5.5 0 100 1 .5.5 0 000-1z"
    />
  </svg>
);

export const icon = EuiIconTimelineArrow;
