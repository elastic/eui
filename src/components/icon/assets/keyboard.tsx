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
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 3h16v11H0V3zm15 10V4H1v9h14zM2 5h2v1H2V5zm2 7v-1H2v1h2zm10-1v1h-2v-1h2zm-3 1v-1H5v1h6zM5 5h1v1H5V5zM3 7H2v1h1V7zm3 0h1v1H6V7zM3 9H2v1h1V9zm3 0h1v1H6V9zm2-4H7v1h1V5zM4 7h1v1H4V7zm5 0H8v1h1V7zm1 0h1v1h-1V7zM5 9H4v1h1V9zm3 0h1v1H8V9zm3 0h-1v1h1V9zM9 5h1v1H9V5zm3 0h-1v1h1V5zm1 0h1v1h-1V5zm1 2h-2v3h2V7z"
    />
  </svg>
);

export const icon = EuiIconKeyboard;
