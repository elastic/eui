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
const EuiIconDocumentation = ({
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
    <path d="M6 16H5v-3h1v3Zm3-8h1v1H7V8h1V7h-.5V6H9v2Zm-.5-4a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z" />
    <path d="M7 14h5v-2H4a1 1 0 1 0 0 2v1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10v11h-1v2h1v1H7v-1ZM4 2a1 1 0 0 0-1 1v8.27A1.99 1.99 0 0 1 4 11V2Zm1 9h8V2H5v9Z" />
  </svg>
);
export const icon = EuiIconDocumentation;
