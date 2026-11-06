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
const EuiIconProductCloudConnect = ({
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
      d="M12 10h1V8h1v2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1v2h-1v-2h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1V8h1v2Zm-1 3h3v-2h-3v2Z"
      clipRule="evenodd"
    />
    <path d="M7.506 1.03a4.003 4.003 0 0 1 4.372 2.989A3.502 3.502 0 0 1 14.968 7h-1.069A2.503 2.503 0 0 0 11.5 5h-.03l-.251.016a2.491 2.491 0 0 0-1.487.716l-.707-.707a3.495 3.495 0 0 1 1.825-.963 3.003 3.003 0 0 0-3.324-2.02 3.003 3.003 0 0 0-2.488 3.437l.117.728-.718-.16a2.002 2.002 0 0 0-2.157.942A2 2 0 0 0 4 10h5.27c-.17.294-.27.635-.27 1H4a3 3 0 0 1 0-6 4.01 4.01 0 0 1 1-2.649A4.012 4.012 0 0 1 7.506 1.03Z" />
  </svg>
);
export const icon = EuiIconProductCloudConnect;
