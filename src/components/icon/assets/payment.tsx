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
const EuiIconPayment = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.586 2.586A2 2 0 0 0 0 4h1a1 1 0 0 1 1-1V2a2 2 0 0 0-1.414.586ZM2 2h10.5a.5.5 0 0 1 0 1H2V2ZM0 4h1v6.5a.5.5 0 0 1-1 0V4Zm2.586.586A2 2 0 0 0 2 6h1a1 1 0 0 1 1-1V4a2 2 0 0 0-1.414.586Zm0 8.828A2 2 0 0 1 2 12h1a1 1 0 0 0 1 1v1a2 2 0 0 1-1.414-.586Zm12.828-8.828A2 2 0 0 1 16 6h-1a1 1 0 0 0-1-1V4a2 2 0 0 1 1.414.586Zm0 8.828A2 2 0 0 0 16 12h-1a1 1 0 0 1-1 1v1a2 2 0 0 0 1.414-.586ZM4 4h10v1H4zM3 7h12v1H3zm1 6h10v1H4zM2 6h1v6H2zm13 0h1v6h-1zm-5.5 4a.5.5 0 0 1 0 1H7.496a.5.5 0 0 1 0-1H9.5Zm4 0a.5.5 0 0 1 0 1h-2.004a.5.5 0 0 1 0-1H13.5Z" />
  </svg>
);
export const icon = EuiIconPayment;
