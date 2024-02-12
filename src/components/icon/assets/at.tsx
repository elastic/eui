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
const EuiIconAt = ({
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
    <path
      fillRule="evenodd"
      d="M3 8a5 5 0 1 1 9.812 1.364.78.78 0 0 1-.341.476c-.16.1-.382.16-.659.16-.507 0-.668-.18-.73-.274a.53.53 0 0 1-.082-.23V5h-1v.764a3 3 0 1 0 .146 4.333c.028.057.06.117.1.177.267.407.761.726 1.566.726.412 0 .83-.088 1.189-.311.367-.23.64-.583.773-1.053a6 6 0 1 0-2.501 3.393l-.546-.837A5 5 0 0 1 3 8Zm7 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
    />
  </svg>
);
export const icon = EuiIconAt;
