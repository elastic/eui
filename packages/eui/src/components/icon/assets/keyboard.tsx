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
const EuiIconKeyboard = ({
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
    <path d="M5 11H3v-1h2v1Zm5 0H6v-1h4v1Zm3 0h-2v-1h2v1ZM4 9H3V8h1v1Zm2 0H5V8h1v1Zm2 0H7V8h1v1Zm2 0H9V8h1v1Zm3 0h-2V8h2v1ZM4 7H3V6h1v1Zm2 0H5V6h1v1Zm2 0H7V6h1v1Zm2 0H9V6h1v1Zm3 0h-2V6h2v1Z" />
    <path
      fillRule="evenodd"
      d="M13 2a1 1 0 0 1-1 1H8.5v1H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5.5V3a1 1 0 0 1 1-1H12V1h1v1ZM2 12h12V5H2v7Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconKeyboard;
