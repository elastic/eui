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

const EuiIconDesktop = ({
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
      d="M14.125 2.867H1.875v7.8h12.25v-7.8zM1.875 2A.87.87 0 001 2.867v7.8a.87.87 0 00.875.866h12.25a.87.87 0 00.875-.866v-7.8A.87.87 0 0014.125 2H1.875z"
      clipRule="evenodd"
    />
    <path d="M3.625 14.567c0-.24.196-.434.438-.434h7.875c.241 0 .437.194.437.434a.436.436 0 01-.438.433H4.064a.435.435 0 01-.438-.433zm2.625-3.034h.875l-.875 2.6h-.875l.875-2.6zm2.625 0h.875l.875 2.6H9.75l-.875-2.6zM4 7a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1A.5.5 0 014 7zm3 0a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1A.5.5 0 017 7zm3 0a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1A.5.5 0 0110 7z" />
  </svg>
);

export const icon = EuiIconDesktop;
