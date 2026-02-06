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
const EuiIconServer = ({
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
    <path d="M4.5 11a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm7.5 1H7v-1h5v1ZM4.5 7a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM12 8H7V7h5v1ZM4.5 3a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM12 4H7V3h5v1Z" />
    <path d="M13 1a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1v1h-1v-1H4v1H3v-1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h10ZM3 13h10v-3H3v3Zm0-4h10V6H3v3Zm0-4h10V2H3v3Z" />
  </svg>
);
export const icon = EuiIconServer;
