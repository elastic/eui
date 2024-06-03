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
const EuiIconAppDashboard = ({
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
    <path d="M29 9H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3ZM3 2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Z" />
    <path
      d="M12 20H3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3Zm-9-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M12 31H3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3Zm-9-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3Z" />
    <path
      d="M29 31h-9a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3Zm-9-18a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1h-9Z"
      className="euiIcon__fillSecondary"
    />
  </svg>
);
export const icon = EuiIconAppDashboard;
