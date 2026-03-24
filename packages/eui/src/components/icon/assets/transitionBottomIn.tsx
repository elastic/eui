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
const EuiIconTransitionBottomIn = ({
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
    <path d="M6.5 8V4.207L4.854 5.854l-.708-.708L7 2.293l2.854 2.853-.708.708L7.5 4.207V8h-1Z" />
    <path
      fillRule="evenodd"
      d="M1 14a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1ZM13 1H1v8h12V1Zm0 9.793V10h-.793l-3 3h1.586L13 10.793ZM10.793 10H9.207l-3 3h1.586l3-3Zm-3 0H6.207l-3 3h1.586l3-3Zm-3 0H3.207L1 12.207V13h.793l3-3Zm-3 0H1v.793L1.793 10ZM13 12.207l-.793.793H13v-.793Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTransitionBottomIn;
