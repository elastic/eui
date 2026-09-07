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
const EuiIconMemory = ({
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
    <path d="M15 3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 13h1v-1H2zm2 0h1v-1H4zm5 0h1v-1H9zm2 0h1v-1h-1zm2 0h1v-1h-1zM1 7h1v1H1v3h14V8h-1V7h1V4H1zm11-2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 9h2V6H4zm3 0h2V6H7zm3 0h2V6h-2z" />
  </svg>
);
export const icon = EuiIconMemory;
