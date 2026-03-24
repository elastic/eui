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
    <path d="M7.5 9V5.207L5.854 6.854l-.708-.708L8 3.293l2.854 2.853-.707.708L8.5 5.207V9z" />
    <path
      fillRule="evenodd"
      d="M2 15a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1zM14 2H2v8h12zm0 9.793V11h-.793l-3 3h1.586zM11.793 11h-1.586l-3 3h1.586zm-3 0H7.207l-3 3h1.586zm-3 0H4.207L2 13.207V14h.793zm-3 0H2v.793zM14 13.207l-.793.793H14z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconTransitionBottomIn;
