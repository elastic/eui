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
const EuiIconWaypoint = ({
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
      d="M8 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8 1a5 5 0 0 1 5 5c0 5-5 9-5 9s-5-4-5-9a5 5 0 0 1 5-5Zm0 1a4 4 0 0 0-4 4c0 2.178 1.098 4.213 2.293 5.766a16.817 16.817 0 0 0 1.621 1.812l.086.08.086-.08a16.818 16.818 0 0 0 1.621-1.812C10.902 10.213 12 8.178 12 6a4 4 0 0 0-4-4Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconWaypoint;
