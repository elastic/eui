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
const EuiIconIndexOpen = ({
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
    <path d="M3 6h2v1H3V6Zm3 0h2v1H6V6ZM3 9h2v1H3V9Zm0 3h2v1H3v-1Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v5.257a5.508 5.508 0 0 0-1-.656V5H2v9h4.602c.182.358.402.693.656 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 4h12V2H2v2Z"
      clipRule="evenodd"
    />
    <path d="M15 11.5a3.5 3.5 0 1 0-3.5 3.5v1a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9v-1a3.5 3.5 0 0 0 3.5-3.5Z" />
    <path d="M12 9v2h2v1h-2v2h-1v-2H9v-1h2V9h1Z" />
  </svg>
);
export const icon = EuiIconIndexOpen;
