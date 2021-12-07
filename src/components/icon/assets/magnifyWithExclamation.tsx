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

const EuiIconMagnifyWithExclamation = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
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
      d="M15.143 15.85l-3.872-3.872a.5.5 0 01-.034-.738 6.01 6.01 0 000-8.486 6.004 6.004 0 00-8.484 0 6.01 6.01 0 000 8.486 5.96 5.96 0 004.242 1.757.5.5 0 010 1 6.955 6.955 0 01-4.949-2.05c-2.728-2.73-2.728-7.171 0-9.9 2.728-2.73 7.168-2.73 9.898 0 2.609 2.61 2.723 6.785.342 9.532l3.565 3.564a.502.502 0 01-.708.708zM6.35 3.61l.24 4.878h.81l.25-4.877h-1.3zm.186 6.593a.61.61 0 00.448.186.607.607 0 00.437-.184.6.6 0 00.189-.446.602.602 0 00-.187-.448.608.608 0 00-.44-.182.614.614 0 00-.447.184.604.604 0 00-.186.446c0 .172.062.32.186.444z"
      clipRule="evenodd"
    />
  </svg>
);

export const icon = EuiIconMagnifyWithExclamation;
