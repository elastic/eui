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
const EuiIconRouteSplit = ({
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
    <path d="M13 3a2 2 0 1 1 0 4 2 2 0 0 1-1.934-1.5H6.903C7.524 6.105 8 7.053 8 8.5c0 1.654.47 2.372.83 2.687.093.082.187.14.273.185a2 2 0 1 1-.056 1.053 2.3 2.3 0 0 1-.876-.487C7.53 11.378 7 10.346 7 8.5c0-1.574-.657-2.284-1.252-2.63a2.8 2.8 0 0 0-.828-.313A2 2 0 1 1 4.935 4.5h6.131A2 2 0 0 1 13 3m-2 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2M3 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
  </svg>
);
export const icon = EuiIconRouteSplit;
