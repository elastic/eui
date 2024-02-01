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
const EuiIconIndex = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    viewBox="0 0 17 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.063 2.5h-10v11h11v1h-12v-13h12v12h-1v-11Zm-7 3h5.999v-1h-6v1Zm-2 0v-1h1v1h-1Zm2 3v-1h6v1h-6Zm-2 0v-1h1v1h-1Zm2 3v-1h6v1h-6Zm-2 0v-1h1v1h-1Z" />
  </svg>
);
export const icon = EuiIconIndex;
