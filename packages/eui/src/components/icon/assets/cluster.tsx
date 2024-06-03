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
const EuiIconCluster = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M4.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0-6a3.5 3.5 0 0 1 3.465 3h3.12a1.5 1.5 0 1 1 0 1h-3.12a3.482 3.482 0 0 1-.662 1.596l2.1 2.1A3.5 3.5 0 1 1 8.036 12h-3.12a1.5 1.5 0 1 1 0-.999h3.12a3.482 3.482 0 0 1 .662-1.596l-2.1-2.1A3.5 3.5 0 1 1 4.5 1zM12 4.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm-.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM4 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconCluster;
