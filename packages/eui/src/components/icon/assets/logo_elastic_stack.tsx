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
const EuiIconLogoElasticStack = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#F04E98"
      d="M0 2.37A2.37 2.37 0 0 1 2.37 0h27.26A2.37 2.37 0 0 1 32 2.37v6.52H0V2.37Z"
    />
    <path
      fill="#00BFB3"
      fillRule="evenodd"
      d="M0 20.148h32v-8.296H0v8.296Z"
      clipRule="evenodd"
    />
    <path
      fill="#07C"
      d="M0 23.111h32v6.519A2.37 2.37 0 0 1 29.63 32H2.37A2.37 2.37 0 0 1 0 29.63v-6.52Z"
    />
  </svg>
);
export const icon = EuiIconLogoElasticStack;
