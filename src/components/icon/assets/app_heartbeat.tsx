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
const EuiIconAppHeartbeat = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M4.14 15.39a8.058 8.058 0 0 1-2.2-4.043A6.788 6.788 0 0 1 4.198 5.47a6.73 6.73 0 0 1 8.727-.213l1.26-1.464a8.65 8.65 0 0 0-11.277.232A8.727 8.727 0 0 0 .068 11.6a10.172 10.172 0 0 0 2.793 5.275l1.28-1.484Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M15.515 31.274 4.548 18.454 15.855 4.763a8.67 8.67 0 0 1 12.266-.746 8.727 8.727 0 0 1 2.91 7.205c-.243 2.695-2.037 4.732-3.482 6.37L15.515 31.275Zm-8.427-12.82 8.427 9.862 10.55-11.995c1.32-1.503 2.822-3.21 3.007-5.265a6.788 6.788 0 0 0-2.24-5.586 6.73 6.73 0 0 0-9.504.563L7.088 18.455Z" />
  </svg>
);
export const icon = EuiIconAppHeartbeat;
