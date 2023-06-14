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
const EuiIconPush = ({
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
    <path d="M8.171 5.15 10.114 7H1.556C1.249 7 1 7.224 1 7.5s.249.5.556.5h8.526l-1.91 1.82a.52.52 0 0 0 0 .77c.227.213.6.213.828 0l2.05-1.95a1.552 1.552 0 0 0 0-2.31L9 4.38a.617.617 0 0 0-.829 0 .52.52 0 0 0 0 .77z" />
    <path d="M6.804 12.792A.993.993 0 0 1 6 11.82V10H5v1.826c0 .945.673 1.76 1.608 1.945l6 1.19A1.992 1.992 0 0 0 15 13.016V1.984A2 2 0 0 0 12.608.04l-6 1.19C5.673 1.415 5 2.23 5 3.175V5h1V3.18c0-.472.336-.879.804-.972l6-1.189A1 1 0 0 1 14 1.991v11.018a.995.995 0 0 1-1.196.972l-6-1.19z" />
  </svg>
);
export const icon = EuiIconPush;
