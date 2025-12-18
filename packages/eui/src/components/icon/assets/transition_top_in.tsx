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
const EuiIconTransitionTopIn = ({
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
    <path d="M9.146 10.146a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7 11.293V7.5a.5.5 0 0 1 1 0v3.793l1.146-1.147Z" />
    <path
      fillRule="evenodd"
      d="M15 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2Zm-1 2.707V5h-1.293l-4-4h1.586L14 4.707ZM1 6h13v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6Zm1.293-1H1V3.707L2.293 5Zm3 0H3.707L1 2.293V2a1 1 0 0 1 .455-.838L5.293 5Zm3 0H6.707l-4-4h1.586l4 4Zm3 0H9.707l-4-4h1.586l4 4ZM14 3.293V2a1 1 0 0 0-1-1h-1.293L14 3.293Z"
    />
  </svg>
);
export const icon = EuiIconTransitionTopIn;
