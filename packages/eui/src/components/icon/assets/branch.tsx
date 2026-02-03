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
const EuiIconBranch = ({
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
      d="M5 1a1.998 1.998 0 0 1 .5 3.934v4.163C6.105 8.476 7.053 8 8.5 8c1.654 0 2.372-.47 2.687-.83.082-.093.14-.187.185-.273a2 2 0 1 1 1.053.056 2.321 2.321 0 0 1-.487.876C11.378 8.47 10.346 9 8.5 9c-1.574 0-2.284.657-2.63 1.252a2.797 2.797 0 0 0-.313.828 2 2 0 1 1-1.057-.015V4.934A1.998 1.998 0 0 1 5 1Zm0 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm7-8a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM5 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconBranch;
