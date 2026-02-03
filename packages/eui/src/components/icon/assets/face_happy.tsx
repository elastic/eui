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
const EuiIconFaceHappy = ({
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
    <path d="M11.834 9.143a4.002 4.002 0 0 1-7.669 0l.959-.286a3.002 3.002 0 0 0 5.751 0l.959.286ZM5.5 6A1.5 1.5 0 0 1 7 7.5V8H6v-.5a.5.5 0 0 0-1 0V8H4v-.5A1.5 1.5 0 0 1 5.5 6Zm5 0A1.5 1.5 0 0 1 12 7.5V8h-1v-.5a.5.5 0 0 0-1 0V8H9v-.5A1.5 1.5 0 0 1 10.5 6Z" />
    <path
      fillRule="evenodd"
      d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconFaceHappy;
