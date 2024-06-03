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
const EuiIconTokenEnumMember = ({
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
      d="M7.682 12V9.247l1.023-.861a.5.5 0 0 0-.003-.768l-1.02-.844V4h5.578v1.57H9.615v1.64h3.36v1.575h-3.36v1.645h3.645V12H7.682Zm.743-4.103a.138.138 0 0 1 0 .206L6.158 9.97a.133.133 0 0 1-.218-.103v-.934H2.873A.133.133 0 0 1 2.74 8.8V7.2c0-.074.06-.133.133-.133H5.94v-.934a.133.133 0 0 1 .218-.103l2.267 1.867Z"
    />
  </svg>
);
export const icon = EuiIconTokenEnumMember;
