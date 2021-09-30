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

const EuiIconAppMl = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M10 18v.56a1 1 0 01-.68.95L3 21.61V10a1 1 0 01.4-.8l3.2-2.4-1.2-1.6-3.2 2.4A3 3 0 001 10v12a3 3 0 001.2 2.4l3.2 2.4 1.2-1.6-2.47-1.85 5.82-1.95A3 3 0 0012 18.56V18h-2zM29.8 7.6l-3.2-2.4-1.2 1.6 3.2 2.4a1 1 0 01.4.8v11.61l-6.32-2.11a1 1 0 01-.68-.95V18h-2v.56a3 3 0 002.05 2.85l5.82 1.94-2.47 1.85 1.2 1.6 3.2-2.4A3 3 0 0031 22V10a3 3 0 00-1.2-2.4z"
    />
    <path d="M11 6A3 3 0 018.88.88a3.07 3.07 0 014.24 0A3 3 0 0111 6zm0-4a1 1 0 10-.012 2A1 1 0 0011 2zm0 30a3 3 0 01-2.12-5.12 3.07 3.07 0 014.24 0A3 3 0 0111 32zm0-4a1 1 0 10-.012 2A1 1 0 0011 28zm0-12a3 3 0 01-2.12-5.12 3.07 3.07 0 014.24 0A3 3 0 0111 16zm0-4a1 1 0 10-.012 2A1 1 0 0011 12zm10-6A3 3 0 0118.88.88a3.07 3.07 0 014.24 0A3 3 0 0121 6zm0-4a1 1 0 10-.012 2A1 1 0 0021 2zm0 30a3 3 0 01-2.12-5.12 3.07 3.07 0 014.24 0A3 3 0 0121 32zm0-4a1 1 0 10-.012 2A1 1 0 0021 28zm0-12a3 3 0 01-2.12-5.12 3.07 3.07 0 014.24 0A3 3 0 0121 16zm0-4a1 1 0 10-.012 2A1 1 0 0021 12z" />
  </svg>
);

export const icon = EuiIconAppMl;
