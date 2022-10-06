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

const EuiIconFilterInclude = ({
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
    <path d="M.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zM16 11.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4-3a.5.5 0 00-1 0V11H8.5a.5.5 0 000 1H11v2.5a.5.5 0 001 0V12h2.5a.5.5 0 000-1H12V8.5zM2 4.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM4.5 7a.5.5 0 000 1h1a.5.5 0 000-1h-1z" />
  </svg>
);

export const icon = EuiIconFilterInclude;
