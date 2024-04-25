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
const EuiIconKqlSelector = ({
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
    <path d="M5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1A5 5 0 1 1 5 3a5 5 0 0 1 0 10Zm6-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
  </svg>
);
export const icon = EuiIconKqlSelector;
