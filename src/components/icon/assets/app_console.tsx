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
const EuiIconAppConsole = ({
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
      d="M29 32H3a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3ZM3 13a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1H3Z"
      className="euiIcon__fillSecondary"
    />
    <path d="m7.29 17.71 3.3 3.29-3.3 3.29 1.42 1.42 4.7-4.71-4.7-4.71zM15 24h9v2h-9z" />
  </svg>
);
export const icon = EuiIconAppConsole;
