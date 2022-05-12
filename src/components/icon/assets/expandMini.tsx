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

const EuiIconExpandMini = ({
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
      d="M6.707 10L10 6.707A.5.5 0 009.293 6L6 9.293a.5.5 0 10.707.707zM4 9.5a.5.5 0 011 0v1a.5.5 0 00.5.5h1a.5.5 0 110 1h-1A1.5 1.5 0 014 10.5v-1zm8-3a.5.5 0 11-1 0v-1a.5.5 0 00-.5-.5h-1a.5.5 0 010-1h1A1.5 1.5 0 0112 5.5v1z"
    />
  </svg>
);

export const icon = EuiIconExpandMini;
