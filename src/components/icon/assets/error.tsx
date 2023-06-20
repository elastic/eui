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
const EuiIconError = ({
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
      d="M10 1a1 1 0 0 1 .707.293l4 4A1 1 0 0 1 15 6v5a1 1 0 0 1-.293.707l-4 4A1 1 0 0 1 10 16H5a1 1 0 0 1-.707-.293l-4-4A1 1 0 0 1 0 11V6a1 1 0 0 1 .293-.707l4-4A1 1 0 0 1 5 1h5ZM4.146 5.146a.5.5 0 0 1 .708 0L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708.708L8.207 8.5l2.647 2.646a.5.5 0 0 1-.708.708L7.5 9.207l-2.646 2.647a.5.5 0 0 1-.708-.708L6.793 8.5 4.146 5.854a.5.5 0 0 1 0-.708Z"
    />
  </svg>
);
export const icon = EuiIconError;
