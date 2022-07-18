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

const EuiIconKeyboard = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2h16v11H0V2zm15 10V3H1v9h14zM2 4h2v1H2V4zm2 7v-1H2v1h2zm10-1v1h-2v-1h2zm-3 1v-1H5v1h6zM5 4h1v1H5V4zM3 6H2v1h1V6zm3 0h1v1H6V6zM3 8H2v1h1V8zm3 0h1v1H6V8zm2-4H7v1h1V4zM4 6h1v1H4V6zm5 0H8v1h1V6zm1 0h1v1h-1V6zM5 8H4v1h1V8zm3 0h1v1H8V8zm3 0h-1v1h1V8zM9 4h1v1H9V4zm3 0h-1v1h1V4zm1 0h1v1h-1V4zm1 2h-2v3h2V6z"
    />
  </svg>
);

export const icon = EuiIconKeyboard;
