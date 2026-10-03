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
const EuiIconCursorDefault = ({
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
      d="M2.646 2.646a.5.5 0 0 1 .497-.125l10 3a.5.5 0 0 1 .134.895l-2.493 1.66 3.069 3.07a.5.5 0 0 1 0 .707l-2 2a.5.5 0 0 1-.707 0l-3.07-3.07-1.66 2.494a.5.5 0 0 1-.895-.134l-3-10a.5.5 0 0 1 .125-.497m3.526 9.192 1.411-2.116.072-.085a.503.503 0 0 1 .698.01l3.146 3.146 1.293-1.293-3.146-3.147a.5.5 0 0 1 .076-.77l2.115-1.41-8.093-2.428z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconCursorDefault;
