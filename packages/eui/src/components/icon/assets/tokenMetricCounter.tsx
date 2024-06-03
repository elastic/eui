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
const EuiIconTokenMetricCounter = ({
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
    <path d="M12 10.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1H12v-.5Z" />
    <path
      fillRule="evenodd"
      d="M8 3h4v5.035A3.5 3.5 0 1 1 8.337 13H2V9h3V6h3V3Zm1.05 9a2.5 2.5 0 1 1 4.902-1 2.5 2.5 0 0 1-4.902 1ZM11 8.035a3.49 3.49 0 0 0-2 1.016V4h2v4.035ZM8 12H6V7h2v5Zm-3 0v-2H3v2h2Z"
    />
  </svg>
);
export const icon = EuiIconTokenMetricCounter;
