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
const EuiIconIndexEdit = ({
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
    <path d="M12 2H2v11h4v1H1V1h12v5h-1V2ZM5 5h5.999V4H5v1ZM3 5V4h1v1H3Zm2 3V7h6v1H5ZM3 8V7h1v1H3Zm2 3v-1h3v1H5Zm-2 0v-1h1v1H3Zm4.502 1.41L12.913 7 15 9.087l-5.41 5.41L7 15l.502-2.59Z" />
  </svg>
);
export const icon = EuiIconIndexEdit;
