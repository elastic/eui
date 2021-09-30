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

const EuiIconContinuityAboveBelow = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.5 3a.5.5 0 01.5.5v9a.5.5 0 01-1 0V9H4v1.5a.5.5 0 01-.82.384l-3-2.5a.5.5 0 010-.768l3-2.5A.5.5 0 014 5.5V7h2V3.5a.5.5 0 01.5-.5zm3 0a.5.5 0 00-.5.5v9a.5.5 0 001 0V9h2v1.5a.5.5 0 00.82.384l3-2.5a.5.5 0 000-.768l-3-2.5A.5.5 0 0012 5.5V7h-2V3.5a.5.5 0 00-.5-.5z" />
  </svg>
);

export const icon = EuiIconContinuityAboveBelow;
