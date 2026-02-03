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
const EuiIconQuery = ({
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
    <path d="M5 3H3v10h2v1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2v1Zm8-1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2v-1h2V3h-2V2h2Z" />
    <path
      fillRule="evenodd"
      d="M5.879 5.879a3 3 0 0 1 4.566 3.86l1.409 1.407-.707.707-1.409-1.408a3 3 0 0 1-3.86-4.566Zm3.535.707a2 2 0 1 0-2.828 2.828 2 2 0 0 0 2.828-2.828Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconQuery;
