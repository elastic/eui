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

const EuiIconExpand = ({
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
      d="M4.354 12.354l8-8a.5.5 0 00-.708-.708l-8 8a.5.5 0 00.708.708zM1 10.5a.5.5 0 111 0v3a.5.5 0 00.5.5h3a.5.5 0 110 1h-3A1.5 1.5 0 011 13.5v-3zm14-5a.5.5 0 11-1 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 110-1h3A1.5 1.5 0 0115 2.5v3z"
    />
  </svg>
);

export const icon = EuiIconExpand;
