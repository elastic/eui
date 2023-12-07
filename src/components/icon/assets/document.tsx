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
const EuiIconDocument = ({
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
    <path d="M10.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h8.8ZM14 5h-3.5a.5.5 0 0 1-.5-.5V1H2v14h12V5Zm-8.5 7a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1h-5Zm0-3a.5.5 0 0 1 0-1h5a.5.5 0 1 1 0 1h-5Z" />
  </svg>
);
export const icon = EuiIconDocument;
