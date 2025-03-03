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
const EuiIconLinkSlash = ({
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
    <path d="m15.354 1.354-.707-.708-14 14 .707.708 14-14Zm-6.977 11.27a2.993 2.993 0 0 1-.877-2.003l.5-.5.502.502c.028.471.222.934.582 1.293l1.501 1.498a2 2 0 0 0 2.829-2.828l-1.497-1.502a1.996 1.996 0 0 0-1.294-.582L10.121 8l.5-.5c.729.03 1.448.322 2.003.877l1.497 1.502a3 3 0 1 1-4.243 4.242l-1.501-1.497Z" />
    <path d="m8.707 9.414.707-.707 1.94 1.94-.707.707-1.94-1.94ZM8 5.879l.5-.5a2.992 2.992 0 0 0-.876-2.002L6.12 1.878a3 3 0 0 0-4.243 4.243l1.498 1.502a2.993 2.993 0 0 0 2.004.876l.5-.499-.502-.502a1.996 1.996 0 0 1-1.293-.582L2.586 5.414a2 2 0 1 1 2.828-2.828l1.503 1.498c.359.36.553.822.582 1.293L8 5.88Z" />
    <path d="m6.586 7.293.707-.707-1.94-1.94-.707.708 1.94 1.94Z" />
  </svg>
);
export const icon = EuiIconLinkSlash;
