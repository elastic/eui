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
const EuiIconPipeBreaks = ({
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
    <path d="M2 3h9.5a2.5 2.5 0 0 1 0 5H6v1L4 7.5 6 6v1h5.5a1.5 1.5 0 0 0 0-3H2V3Zm1 3H2v3h1V6Zm0 4H2v3h1v-3Zm3 0-2 1.5L6 13v-1h5.5a2.5 2.5 0 0 0 2.165-3.75 3.497 3.497 0 0 1-.865.5A1.5 1.5 0 0 1 11.5 11H6v-1Z" />
  </svg>
);
export const icon = EuiIconPipeBreaks;
