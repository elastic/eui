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
const EuiIconFolderOpen = ({
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
    <path d="M5.191 2a1 1 0 0 1 .894.553L6.809 4H13a1 1 0 0 1 1 1v1.5h-1V5H6.191l-.138-.276L5.19 3H1v8.751l-.317 1.111a.5.5 0 0 0 .48.638h11.96a.5.5 0 0 0 .48-.362L14 11.75V13a1 1 0 0 1-1 1H1a1 1 0 0 1-.995-.898L0 13V3a1 1 0 0 1 1-1h4.191Z" />
    <path d="M14.837 6a1 1 0 0 1 .962 1.274l-1.715 6a1 1 0 0 1-.961.726H1.163a1 1 0 0 1-.962-1.274l1.715-6A1 1 0 0 1 2.877 6h11.96ZM1.163 13h11.96l1.714-6H2.877l-1.714 6Z" />
  </svg>
);
export const icon = EuiIconFolderOpen;
