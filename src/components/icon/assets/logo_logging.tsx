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
const EuiIconLogoLogging = ({
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
    <path fill="#0080D5" d="M2 10v13a9 9 0 0 1 9 9h13c0-12.15-9.85-22-22-22" />
    <path
      d="M14 13.565V32h10c0-7.722-3.981-14.51-10-18.436"
      className="euiIcon__fillNegative"
    />
    <path
      fill="#00BFB3"
      d="M14 0v10.226C21.666 14.468 26.869 22.636 26.869 32H30V16c0-8.837-7.163-16-16-16"
    />
  </svg>
);
export const icon = EuiIconLogoLogging;
