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
const EuiIconAppFilebeat = ({
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
      d="M8 18h16v2H8zM8 13h9v2H8zM8 23h16v2H8z"
      className="euiIcon__fillSecondary"
    />
    <path d="M21.41 0H5a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V8.59L21.41 0ZM22 3.41 26.59 8H22V3.41ZM27 30H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h15v8h8v19a1 1 0 0 1-1 1Z" />
  </svg>
);
export const icon = EuiIconAppFilebeat;
