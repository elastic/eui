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
const EuiIconTrash = ({
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
    <path d="M11 3h5v1H0V3h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2Zm-7.056 8H7v1H4.1l.392 2.519c.042.269.254.458.493.458h6.03c.239 0 .451-.189.493-.458l1.498-9.576H14l-1.504 9.73c-.116.747-.74 1.304-1.481 1.304h-6.03c-.741 0-1.365-.557-1.481-1.304l-1.511-9.73H9V5.95H3.157L3.476 8H8v1H3.632l.312 2ZM6 3h4V1H6v2Z" />
  </svg>
);
export const icon = EuiIconTrash;
