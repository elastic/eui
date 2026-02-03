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
const EuiIconCrosshair = ({
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
    <path d="M8.5 15h-1v-4h1v4ZM3 13h2.5v1H3a1 1 0 0 1-1-1v-2.5h1V13Zm11 0a1 1 0 0 1-1 1h-2.5v-1H13v-2.5h1V13ZM8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM5 8.5H1v-1h4v1Zm10 0h-4v-1h4v1ZM5.5 3H3v2.5H2V3a1 1 0 0 1 1-1h2.5v1ZM13 2a1 1 0 0 1 1 1v2.5h-1V3h-2.5V2H13ZM8.5 5h-1V1h1v4Z" />
  </svg>
);
export const icon = EuiIconCrosshair;
