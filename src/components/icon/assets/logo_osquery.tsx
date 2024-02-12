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
const EuiIconLogoOsquery = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none">
      <path
        fill="#A596FF"
        d="M31.907.032v7.969l-7.952 7.951V7.967L31.907.032"
      />
      <path fill="#333" d="M16.003.032v7.969l7.952 7.951V7.967L16.003.032" />
      <path
        fill="#A596FF"
        d="M31.923 31.855h-7.968l-7.952-7.951h7.985l7.935 7.951"
      />
      <path
        fill="#333"
        d="M31.923 15.952h-7.968l-7.952 7.952h7.985l7.935-7.952"
      />
      <path fill="#A596FF" d="M.1 31.872v-7.968l7.952-7.952v7.985L.1 31.872" />
      <path
        fill="#333"
        d="M16.004 31.872v-7.968l-7.952-7.952v7.985l7.952 7.935"
      />
      <path fill="#A596FF" d="M.084.048h7.968L16.004 8H8.019L.084.048" />
      <path fill="#333" d="M.084 15.952h7.968L16.004 8H8.019L.084 15.952" />
    </g>
  </svg>
);
export const icon = EuiIconLogoOsquery;
