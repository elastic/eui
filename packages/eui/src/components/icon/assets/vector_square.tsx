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
const EuiIconVectorSquare = ({
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
      d="M4.103 1.005A1 1 0 0 1 5 2v.5h6V2a1 1 0 0 1 1-1h2l.102.005A1 1 0 0 1 15 2v2a1 1 0 0 1-1 1h-.5v6h.5l.102.005A1 1 0 0 1 15 12v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-.995-.898L11 14v-.5H5v.5a1 1 0 0 1-1 1H2a1 1 0 0 1-.995-.898L1 14v-2a1 1 0 0 1 1-1h.5V5H2a1 1 0 0 1-.995-.897L1 4V2a1 1 0 0 1 1-1h2l.103.005ZM2 14h2v-2H2v2Zm10 0h2v-2h-2v2ZM5 3.5V4a1 1 0 0 1-1 1h-.5v6H4l.103.005A1 1 0 0 1 5 12v.5h6V12a1 1 0 0 1 1-1h.5V5H12a1 1 0 0 1-.995-.897L11 4v-.5H5ZM2 4h2V2H2v2Zm10 0h2V2h-2v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconVectorSquare;
