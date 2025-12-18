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
const EuiIconTokenKeyword = ({
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
    <path d="M10.33 10.28c-.12.04-.29.07-.42.07-.23 0-.43-.08-.53-.3l-.63-1.34 2.32-2.81H9.3L7.76 7.93h-.09L8.22 4H6.59l-1.05 7.5h1.63l.27-1.94h.1l.43 1.12c.27.71.74.92 1.33.92.23 0 .6-.04.86-.11l.17-1.21z" />
  </svg>
);
export const icon = EuiIconTokenKeyword;
