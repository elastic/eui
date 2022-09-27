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

const EuiIconLaunch = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11 6a1 1 0 11-2 0 1 1 0 012 0z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.355 1.791A3.5 3.5 0 0112.57 1H14a1 1 0 011 1v1.43a3.5 3.5 0 01-.791 2.215l-3.144 3.843a2.5 2.5 0 00-.565 1.583v1.636l-1.646 1.647a.5.5 0 01-.557.103l-.634-.282a11.5 11.5 0 01-5.838-5.838l-.282-.634a.5.5 0 01.103-.557L3.293 5.5h1.636a2.5 2.5 0 001.583-.565l3.843-3.144zM12.57 2a2.5 2.5 0 00-1.583.565L7.145 5.71a3.5 3.5 0 01-2.215.79H3.707l-1.11 1.11.142.32a10.498 10.498 0 001.825 2.799l2.082-2.083a.5.5 0 11.708.708L5.27 11.436a10.496 10.496 0 002.798 1.825l.32.143L9.5 12.293V11.07a3.5 3.5 0 01.791-2.216l3.144-3.843A2.5 2.5 0 0014 3.43V2h-1.43z"
    />
    <path d="M1.9 10.7a.5.5 0 00-.88.163l-1 3.5A.5.5 0 000 14.5v1a.5.5 0 00.5.5h1a.502.502 0 00.137-.02l3.5-1a.5.5 0 00.163-.88l-1.314-.986a5.5 5.5 0 01-1.1-1.1L1.9 10.7z" />
  </svg>
);

export const icon = EuiIconLaunch;
