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
const EuiIconBranchUser = ({
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
      d="M6 7.987a3.49 3.49 0 0 0-2.5 1.05v-4.1a2 2 0 1 0-1 0v6.126a2 2 0 1 0 1.034.01A2.5 2.5 0 0 1 6 8.986h1a3.5 3.5 0 0 0 3.47-3.043 2 2 0 1 0-1.009-.017A2.5 2.5 0 0 1 7 7.987H6zM4 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
      clipRule="evenodd"
    />
    <path d="M13.5 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9 15c.284-1.223 1.519-2.143 3-2.143s2.716.92 3 2.143H9z" />
  </svg>
);
export const icon = EuiIconBranchUser;
