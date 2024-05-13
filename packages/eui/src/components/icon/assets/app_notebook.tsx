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
const EuiIconAppNotebook = ({
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
    <path d="M25 2h-5V0h-2v2h-3V0h-2v2h-3V0H8v2H3v26h22V2Zm-2 24H5V4h3v2h2V4h3v2h2V4h3v2h2V4h3v22Z" />
    <path d="M27 7v23H8v2h21V7z" />
    <path d="M8 12h12v2H8zM8 17h12v2H8z" className="euiIcon__fillSecondary" />
  </svg>
);
export const icon = EuiIconAppNotebook;
