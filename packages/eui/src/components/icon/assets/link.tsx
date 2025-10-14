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
const EuiIconLink = ({
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
    <path d="M9.723 7.602a3.003 3.003 0 0 1 2.901.775l1.497 1.502a3.001 3.001 0 0 1-4.242 4.243l-1.502-1.498a3.002 3.002 0 0 1-.774-2.9l.9.9c.029.47.221.933.58 1.292l1.502 1.498a2 2 0 0 0 2.83-2.828l-1.498-1.502a1.994 1.994 0 0 0-1.292-.58l-.902-.902Z" />
    <path d="m11.354 10.646-.707.707-6-6 .707-.707 6 6Z" />
    <path d="M1.879 1.879a3 3 0 0 1 4.242-.001l1.503 1.499a3 3 0 0 1 .773 2.9l-.9-.902a1.991 1.991 0 0 0-.58-1.291L5.414 2.586a2 2 0 1 0-2.828 2.828l1.498 1.502c.358.358.82.55 1.29.58l.901.9a3.002 3.002 0 0 1-2.899-.773L1.878 6.121a3 3 0 0 1 0-4.242Z" />
  </svg>
);
export const icon = EuiIconLink;
