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
const EuiIconFilterIgnore = ({
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
      d="M5.5 9.914.293 4.707A1 1 0 0 1 0 4V2h12v2a1 1 0 0 1-.293.707L6.5 9.914V13l-1 1V9.914ZM11 3v1L6 9 1 4V3h10Z"
      clipRule="evenodd"
    />
    <path d="m11.793 12.5-2.147-2.146.708-.708 2.146 2.147 2.146-2.147.708.708-2.147 2.146 2.147 2.146-.707.708-2.147-2.147-2.146 2.147-.708-.707 2.147-2.147Z" />
  </svg>
);
export const icon = EuiIconFilterIgnore;
