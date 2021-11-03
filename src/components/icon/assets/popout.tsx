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

const EuiIconPopout = ({
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
    <path d="M13 8.5a.5.5 0 111 0V12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5a.5.5 0 010 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8.5zm-5.12.339a.5.5 0 11-.706-.707L13.305 2H10.5a.5.5 0 110-1H14a1 1 0 011 1v3.5a.5.5 0 11-1 0V2.72L7.88 8.838z" />
  </svg>
);

export const icon = EuiIconPopout;
