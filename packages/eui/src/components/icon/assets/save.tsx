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
const EuiIconSave = ({
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
      d="M2 3a1 1 0 0 1 1-1h8a1 1 0 0 1 .707.293l2 2A1 1 0 0 1 14 5v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Zm3 10h6v-3H5v3Zm7 0v-3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v3H3V3h2v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3l2 2v8h-1ZM6 3h4v3H6V3Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconSave;
