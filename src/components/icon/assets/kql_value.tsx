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
const EuiIconKqlValue = ({
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
    <path d="M8 4a5 5 0 1 1 0 8 5 5 0 1 1 0-8Zm-.75.692a4 4 0 1 0 0 6.615A4.981 4.981 0 0 1 6 8c0-1.268.472-2.426 1.25-3.308ZM11.348 11l2.078-5.637h-.739l-1.656 4.727h-.062L9.313 5.363h-.739L10.652 11h.696Z" />
  </svg>
);
export const icon = EuiIconKqlValue;
