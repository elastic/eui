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
const EuiIconAppSecurity = ({
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
    <path d="m14 32-.36-.14A21.07 21.07 0 0 1 0 12.07V5.44L14 .06l14 5.38v6.63a21.07 21.07 0 0 1-13.64 19.78L14 32ZM2 6.82v5.25a19.08 19.08 0 0 0 12 17.77 19.08 19.08 0 0 0 12-17.77V6.82L14 2.2 2 6.82Z" />
    <path
      d="M9 17.83h2V23H9zM11 10.18V7H9v3.18a3 3 0 1 0 2 0ZM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM17 7h2v5.17h-2zM21 17a3 3 0 1 0-4 2.82V23h2v-3.18A3 3 0 0 0 21 17Zm-3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
      className="euiIcon__fillSecondary"
    />
  </svg>
);
export const icon = EuiIconAppSecurity;
