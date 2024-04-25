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
    <path d="M5 10.038a3.49 3.49 0 0 1 2.5-1.05h2a2.5 2.5 0 0 0 2.462-2.061 2 2 0 1 1 1.008.017A3.5 3.5 0 0 1 9.5 9.987h-2a2.5 2.5 0 0 0-2.466 2.085A2 2 0 1 1 4 12.063V3.937a2 2 0 1 1 1 0v6.1ZM4.5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
);
export const icon = EuiIconBranch;
