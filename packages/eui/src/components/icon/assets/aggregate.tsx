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
const EuiIconAggregate = ({
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
      d="M11.984 9.277a2 2 0 1 1-.707.707L8.5 7.207v3.856a2 2 0 1 1-1 0V7.208L4.723 9.984a2 2 0 1 1-.707-.707L7.5 5.793V2.207L5.353 4.353l-.707-.707L8 .293l3.353 3.353-.707.707L8.5 2.207v3.585l3.484 3.485ZM13 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-6 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-5-2a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconAggregate;
