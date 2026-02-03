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
const EuiIconChartWaterfall = ({
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
    <path d="M2 14h13v1H2a1 1 0 0 1-1-1V1h1v13Z" />
    <path
      fillRule="evenodd"
      d="M13.102 10.005A1 1 0 0 1 14 11v1l-.005.102a1 1 0 0 1-.893.893L13 13h-3l-.103-.005a1 1 0 0 1-.892-.893L9 12v-1a1 1 0 0 1 .897-.995L10 10h3l.102.005ZM10 12h3v-1h-3v1Z"
      clipRule="evenodd"
    />
    <path d="M4 12H3v-1h1v1Zm2 0H5v-1h1v1Zm2 0H7v-1h1v1Z" />
    <path
      fillRule="evenodd"
      d="M11 6a1 1 0 0 1 1 1v1a1 1 0 0 1-.898.995L11 9H8l-.103-.005a1 1 0 0 1-.892-.892L7 8V7a1 1 0 0 1 1-1h3ZM8 8h3V7H8v1Z"
      clipRule="evenodd"
    />
    <path d="M4 8H3V7h1v1Zm2 0H5V7h1v1Zm8 0h-1V7h1v1Z" />
    <path
      fillRule="evenodd"
      d="M11.102 2.005A1 1 0 0 1 12 3v1l-.005.103a1 1 0 0 1-.893.892L11 5H4l-.103-.005a1 1 0 0 1-.892-.892L3 4V3a1 1 0 0 1 .897-.995L4 2h7l.102.005ZM4 4h7V3H4v1Z"
      clipRule="evenodd"
    />
    <path d="M14 4h-1V3h1v1Z" />
  </svg>
);
export const icon = EuiIconChartWaterfall;
