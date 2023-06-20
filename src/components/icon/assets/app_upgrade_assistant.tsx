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
const EuiIconAppUpgradeAssistant = ({
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
      d="M16 21a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M27.42 19.69a12 12 0 0 1-23.11-1l2.27-.45-4.32-4.47L0 19.55l2.39-.47a14 14 0 0 0 27 1.23l-1.97-.62zm2.23-6.77a14 14 0 0 0-27-1.23l1.9.62a12 12 0 0 1 23.11 1l-2.27.45 4.32 4.46L32 12.45l-2.35.47z" />
  </svg>
);
export const icon = EuiIconAppUpgradeAssistant;
