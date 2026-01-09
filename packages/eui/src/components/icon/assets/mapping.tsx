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
const EuiIconMapping = ({
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
      d="M3 1a2 2 0 0 1 1.935 1.5H7.5a1 1 0 0 1 1 1v4h2.565A1.999 1.999 0 1 1 13 10a1.999 1.999 0 0 1-1.935-1.5H8.5v4a1 1 0 0 1-1 1H4.935A1.999 1.999 0 0 1 1 13a2 2 0 0 1 3.935-.5H7.5v-9H4.935A1.999 1.999 0 0 1 1 3a2 2 0 0 1 2-2Zm0 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M3 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconMapping;
