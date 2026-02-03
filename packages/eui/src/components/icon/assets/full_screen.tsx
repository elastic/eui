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
const EuiIconFullScreen = ({
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
    <path d="M2 13h2v1H1v-3h1v2Zm13 1h-3v-1h2v-2h1v3Z" />
    <path
      fillRule="evenodd"
      d="M12.102 4.005A1 1 0 0 1 13 5v6a1 1 0 0 1-.898.995L12 12H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h8l.102.005ZM4 11h8V5H4v6Z"
      clipRule="evenodd"
    />
    <path d="M4 3H2v2H1V2h3v1Zm11 2h-1V3h-2V2h3v3Z" />
  </svg>
);
export const icon = EuiIconFullScreen;
