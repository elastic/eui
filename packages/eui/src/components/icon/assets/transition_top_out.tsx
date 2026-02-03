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
const EuiIconTransitionTopOut = ({
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
    <path d="m10.854 10.146-.707.707L8.5 9.207V13h-1V9.207l-1.646 1.646-.708-.707L8 7.293l2.854 2.853Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 14h12V6H2v8Zm0-9.793V5h.793l3-3H4.207L2 4.207ZM4.207 5h1.586l3-3H7.207l-3 3Zm3 0h1.586l3-3h-1.586l-3 3Zm3 0h1.586L14 2.793V2h-.793l-3 3Zm3 0H14v-.793L13.207 5ZM2 2.793 2.793 2H2v.793Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTransitionTopOut;
