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
const EuiIconSnowflake = ({
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
      d="M14.354 2.354 11.707 5H14v1h-3.293L10 6.707V7.5h3v1h-3v.793l.707.707H14v1h-2.293l2.646 2.646-.707.707L11 11.707V14h-1v-3.293L9.293 10H8.5v3h-1v-3h-.793L6 10.707V14H5v-2.293l-2.646 2.646-.708-.707L4.293 11H2v-1h3.293L6 9.293V8.5H3v-1h3v-.793L5.293 6H2V5h2.293L1.646 2.354l.708-.708L5 4.293V2h1v3.293L6.707 6H7.5V3h1v3h.793L10 5.293V2h1v2.293l2.646-2.647.707.708ZM7 9h2V7H7v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconSnowflake;
