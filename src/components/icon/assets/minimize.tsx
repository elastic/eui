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

const EuiIconMinimize = ({
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
    <path d="M1.146 14.146l4-4a.5.5 0 01.765.638l-.057.07-4 4a.5.5 0 01-.765-.638l.057-.07 4-4-4 4zM6.5 8A1.5 1.5 0 018 9.5v3a.5.5 0 11-1 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 010-1h3zm2-5a.5.5 0 01.5.5v3a.5.5 0 00.5.5h3a.5.5 0 110 1h-3A1.5 1.5 0 018 6.5v-3a.5.5 0 01.5-.5zm1.651 2.146l4-4a.5.5 0 01.765.638l-.057.07-4 4a.5.5 0 01-.765-.638l.057-.07 4-4-4 4z" />
  </svg>
);

export const icon = EuiIconMinimize;
