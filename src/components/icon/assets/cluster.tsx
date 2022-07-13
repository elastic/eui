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

const EuiIconCluster = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-6a3.5 3.5 0 013.465 3h3.12a1.5 1.5 0 110 1h-3.12a3.482 3.482 0 01-.662 1.596l2.1 2.1A3.5 3.5 0 118.036 12h-3.12a1.5 1.5 0 110-.999h3.12a3.482 3.482 0 01.662-1.596l-2.1-2.1A3.5 3.5 0 114.5 1zM12 4.5a.5.5 0 101 0 .5.5 0 00-1 0zm-.5 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM4 11.5a.5.5 0 11-1 0 .5.5 0 011 0z"
    />
  </svg>
);

export const icon = EuiIconCluster;
