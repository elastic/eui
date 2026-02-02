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
const EuiIconWorkflow = ({
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
    <path d="M7 6.944v2h2v-2H7Zm-5-5v2h2v-2H2Zm3 .5h7a3 3 0 1 1 0 6h-2v.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-.5H4a2 2 0 1 0 0 4h9.293l-1.646-1.646.707-.707 2.853 2.853-2.854 2.854-.707-.707 1.647-1.647H4a3 3 0 1 1 0-6h2v-.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.5h2a2 2 0 1 0 0-4H5v.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.5Z" />
  </svg>
);
export const icon = EuiIconWorkflow;
