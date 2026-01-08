/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconFilterInCircle = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
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
      d="M7.999 15.999a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM3.5 5h9a.5.5 0 1 1 0 1h-9a.5.5 0 0 1 0-1Zm2 3h5a.5.5 0 1 1 0 1h-5a.5.5 0 0 1 0-1Zm2 3h1a.5.5 0 1 1 0 1h-1a.5.5 0 1 1 0-1Z"
    />
  </svg>
);
export const icon = EuiIconFilterInCircle;
