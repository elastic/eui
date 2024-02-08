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
const EuiIconDiff = ({
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
    <path d="M3.5 6.5a.5.5 0 1 0 1 0v-2h2a.5.5 0 1 0 0-1h-2v-2a.5.5 0 1 0-1 0v2h-2a.5.5 0 1 0 0 1h2v2Zm11 4.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1ZM3.854 12.854l9-9a.5.5 0 1 0-.707-.707l-9 9a.5.5 0 0 0 .707.707Z" />
  </svg>
);
export const icon = EuiIconDiff;
