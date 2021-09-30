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

const EuiIconControlsHorizontal = ({
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
      d="M8.05 10a2.5 2.5 0 014.9 0h1.55a.5.5 0 110 1h-1.55a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 110-1h6.55zm-.1-4a2.5 2.5 0 01-4.9 0H1.5a.5.5 0 010-1h1.55a2.5 2.5 0 014.9 0h6.55a.5.5 0 110 1H7.95zM4 5.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm8 5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
    />
  </svg>
);

export const icon = EuiIconControlsHorizontal;
