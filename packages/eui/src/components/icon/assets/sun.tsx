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
const EuiIconSun = ({
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
    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM7.25.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 1 1-1.5 0V.75Zm0 13a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5Zm5.346-11.407a.75.75 0 0 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.06-1.06l1.06-1.06Zm-9.192 9.193a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06ZM.75 8.75a.75.75 0 0 1 0-1.5h1.5a.75.75 0 1 1 0 1.5H.75Zm13 0a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5h-1.5ZM2.343 3.404a.75.75 0 1 1 1.06-1.06l1.061 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06Zm9.193 9.192a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06Z" />
  </svg>
);
export const icon = EuiIconSun;
