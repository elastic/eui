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
const EuiIconAppManagement = ({
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
    <path
      d="M16 21a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M20 32h-8v-4.06a1 1 0 0 0-1.61-.67l-2.88 2.87-5.65-5.65 2.87-2.87a.92.92 0 0 0 .2-1 .93.93 0 0 0-.86-.6H0V12h4.06a.92.92 0 0 0 .85-.58.94.94 0 0 0-.19-1L1.86 7.51l5.65-5.65 2.87 2.87A1 1 0 0 0 12 4.06V0h8v4.06a1 1 0 0 0 1.61.67l2.87-2.87 5.66 5.66-2.87 2.87a.92.92 0 0 0-.2 1 .93.93 0 0 0 .86.6H32v8h-4.06a.92.92 0 0 0-.85.58.94.94 0 0 0 .19 1l2.87 2.87-5.66 5.66-2.87-2.87a1 1 0 0 0-1.61.67L20 32Zm-6-2h4v-2.06a3 3 0 0 1 5-2.08l1.46 1.46 2.83-2.83L25.86 23a3 3 0 0 1 2.08-5H30v-4h-2.06a3 3 0 0 1-2.08-5l1.46-1.46-2.83-2.85L23 6.14a3 3 0 0 1-5-2.08V2h-4v2.06a3 3 0 0 1-5 2.08L7.51 4.69 4.69 7.51 6.14 9a3 3 0 0 1-2.08 5H2v4h2.06a3 3 0 0 1 2.08 5l-1.45 1.49 2.83 2.83L9 25.86a3 3 0 0 1 5 2.08V30Z" />
  </svg>
);
export const icon = EuiIconAppManagement;
