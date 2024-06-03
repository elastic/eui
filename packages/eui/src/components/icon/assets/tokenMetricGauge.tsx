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
const EuiIconTokenMetricGauge = ({
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
      d="M6 3H2v10h6.337A3.5 3.5 0 1 0 12 8.035V5H8v2H6V3Zm5 5.035V6H9v3.05a3.49 3.49 0 0 1 2-1.015ZM9 11.5a2.5 2.5 0 1 1 5.002 0A2.5 2.5 0 0 1 9 11.5ZM8 8H6v4h2V8ZM5 4H3v8h2V4Z"
    />
  </svg>
);
export const icon = EuiIconTokenMetricGauge;
