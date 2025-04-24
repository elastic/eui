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
const EuiIconMagnifyWithMinus = ({
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
    <path d="M11 6.5H3v1h8v-1Z" />
    <path
      fillRule="evenodd"
      d="M7 14c1.39 0 2.686-.405 3.775-1.104l2.665 2.665a1.5 1.5 0 1 0 2.12-2.122l-2.664-2.664A7 7 0 1 0 7 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Zm7.147 1.854-2.563-2.563a7.15 7.15 0 0 0 .707-.707l2.563 2.563a.5.5 0 0 1-.707.707Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconMagnifyWithMinus;
