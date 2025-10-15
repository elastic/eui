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
const EuiIconIndexTemporary = ({
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
    <path d="M12 11h2v1h-3V9h1v2Z" />
    <path d="M11.5 7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    <path d="M14 1a1 1 0 0 1 1 1v5.257a5.507 5.507 0 0 0-1-.656V5H2v9h4.602c.182.358.402.693.656 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 4h12V2H2v2Z" />
    <path d="M5 13H3v-1h2v1Zm0-3H3V9h2v1Zm0-3H3V6h2v1Zm3 0H6V6h2v1Z" />
  </svg>
);
export const icon = EuiIconIndexTemporary;
