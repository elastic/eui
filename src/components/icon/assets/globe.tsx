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
const EuiIconGlobe = ({
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
    <path d="M1.019 8a6.462 6.462 0 0 0 1.003 3h2.382a14.469 14.469 0 0 1-.396-3h-2.99Zm0-1h2.989c.033-1.078.172-2.094.396-3H2.022a6.462 6.462 0 0 0-1.003 3ZM13.98 8h-2.989a14.469 14.469 0 0 1-.396 3h2.382a6.462 6.462 0 0 0 1.003-3Zm0-1a6.462 6.462 0 0 0-1.003-3h-2.382c.224.906.363 1.922.396 3h2.99ZM5.008 8c.037 1.107.195 2.127.429 3h4.126c.234-.873.392-1.893.429-3H5.008Zm0-1h4.984a13.422 13.422 0 0 0-.429-3H5.437a13.422 13.422 0 0 0-.429 3ZM.016 8H0V7h.016a7.5 7.5 0 0 1 14.968 0H15v1h-.016A7.5 7.5 0 0 1 .016 8Zm2.794 4a6.501 6.501 0 0 0 2.717 1.695A7.315 7.315 0 0 1 4.7 12H2.81Zm9.38 0H10.3c-.23.657-.51 1.23-.827 1.695A6.501 6.501 0 0 0 12.19 12Zm-6.428 0c.484 1.24 1.132 2 1.738 2 .606 0 1.254-.76 1.738-2H5.762ZM2.81 3H4.7c.23-.657.51-1.23.827-1.695A6.501 6.501 0 0 0 2.81 3Zm9.38 0a6.501 6.501 0 0 0-2.717-1.695c.317.465.597 1.038.827 1.695h1.89ZM5.762 3h3.476C8.754 1.76 8.106 1 7.5 1c-.606 0-1.254.76-1.738 2Z" />
  </svg>
);
export const icon = EuiIconGlobe;
