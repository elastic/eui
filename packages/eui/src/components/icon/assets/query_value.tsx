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
const EuiIconQueryValue = ({
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
    <path d="M9.5 6h-.786L10 9.537 11.286 6H10.5V5H13v1h-.65l-1.818 5H9.468L7.65 6H7V5h2.5v1Z" />
    <path
      fillRule="evenodd"
      d="M10 2a6 6 0 1 1-4.499 2.031l.014-.015c.051-.058.104-.114.158-.17l.053-.055c.137-.14.28-.273.431-.398l.013-.012A5.976 5.976 0 0 1 10 2Zm0 1a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
      clipRule="evenodd"
    />
    <path d="M5.099 3.002a7.037 7.037 0 0 0-.9 1.078 4.001 4.001 0 0 0 0 7.839c.264.39.565.75.9 1.078L5 13A5 5 0 0 1 5 3l.099.002Z" />
  </svg>
);
export const icon = EuiIconQueryValue;
