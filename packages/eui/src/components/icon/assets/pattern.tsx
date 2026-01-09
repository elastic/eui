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
const EuiIconPattern = ({
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
    <path d="M5 13H3v-1h2v1Zm1.5-1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm6.5 1H8v-1h5v1Zm-5-3H3V9h5v1Zm1.5-1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm3.5 1h-2V9h2v1ZM5 7H3V6h2v1Zm1.5-1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM13 7H8V6h5v1ZM8 4H3V3h5v1Zm1.5-1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM13 4h-2V3h2v1Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 14h12V2H2v12Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconPattern;
