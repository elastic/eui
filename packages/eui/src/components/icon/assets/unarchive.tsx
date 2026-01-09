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
const EuiIconUnarchive = ({
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
    <path d="m10.854 9.646-.707.707L8 8.207l-2.146 2.146-.708-.707L8 6.793l2.854 2.853Z" />
    <path
      fillRule="evenodd"
      d="M14 2a1 1 0 0 1 1 1v2h-1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5H1V3a1 1 0 0 1 1-1h12ZM3 13h10V5H3v8ZM2 4h12V3H2v1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconUnarchive;
