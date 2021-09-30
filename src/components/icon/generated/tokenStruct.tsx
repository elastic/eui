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

const EuiIconTokenStruct = ({
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
      d="M4.336 4.667h2.667v2.666H4.336V4.667zm0 4h2.667v2.666H4.336V8.667zm4-4h2.667v2.666H8.336V4.667zm0 4h2.667v2.666H8.336V8.667zM3.003 3.333v9.334h9.333V3.333H3.003zm0-1.333h9.333c.737 0 1.334.597 1.334 1.333v9.334c0 .736-.597 1.333-1.334 1.333H3.003a1.333 1.333 0 01-1.333-1.333V3.333C1.67 2.597 2.267 2 3.003 2z"
    />
  </svg>
);

export const icon = EuiIconTokenStruct;
