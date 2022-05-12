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

const EuiIconVisTable = ({
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
    <path d="M16 3v11a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12a2 2 0 012 2v1zm-1 0V2a1 1 0 00-1-1H2a1 1 0 00-1 1v1h14zm0 1H1v10a1 1 0 001 1h12a1 1 0 001-1V4zM4.5 6a.5.5 0 010 1H2.496a.5.5 0 110-1H4.5zm9 0a.5.5 0 110 1h-6a.5.5 0 010-1h6zm-9 3a.5.5 0 010 1H2.496a.5.5 0 110-1H4.5zm9 0a.5.5 0 110 1h-6a.5.5 0 010-1h6zm-9 3a.5.5 0 110 1H2.496a.5.5 0 110-1H4.5zm9 0a.5.5 0 110 1h-6a.5.5 0 110-1h6z" />
  </svg>
);

export const icon = EuiIconVisTable;
