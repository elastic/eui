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
const EuiIconWrench = ({
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
      d="M11.28 2.013 10 3.293V6h2.707l1.28-1.28a3 3 0 1 1-2.707-2.707Zm1.165-.744a4 4 0 0 0-5.31 4.767l-5.55 5.55a2 2 0 1 0 2.83 2.828l5.549-5.55A4.005 4.005 0 0 0 15 5c0-.509-.095-.996-.27-1.445a.5.5 0 0 0-.819-.173L12.293 5H11V3.707l1.618-1.618a.5.5 0 0 0-.173-.82ZM8.968 8.446l-5.26 5.261a1 1 0 0 1-1.415-1.414l5.26-5.261c.345.582.833 1.07 1.415 1.414Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconWrench;
