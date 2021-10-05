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

const EuiIconIndexMapping = ({
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
    <path d="M8 8H4.915a1.5 1.5 0 110-1H8V2.5A1.5 1.5 0 019.5 1h2.585a1.5 1.5 0 110 1H9.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h2.585a1.5 1.5 0 110 1H9.5A1.5 1.5 0 018 12.5V8zM3.5 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10-6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
  </svg>
);

export const icon = EuiIconIndexMapping;
