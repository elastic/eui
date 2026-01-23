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
const EuiIconCalendar = ({
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
    <path d="M4 12H3v-1h1v1Zm3 0H6v-1h1v1Zm3 0H9v-1h1v1Zm3 0h-1v-1h1v1Zm-9-2H3V9h1v1Zm3 0H6V9h1v1Zm3 0H9V9h1v1Zm3 0h-1V9h1v1ZM4 8H3V7h1v1Zm3 0H6V7h1v1Zm3 0H9V7h1v1Zm3 0h-1V7h1v1Z" />
    <path
      fillRule="evenodd"
      d="M5 2h6V1h1v1h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2V1h1v1ZM2 13h12V6H2v7Zm0-8h12V3h-2v1h-1V3H5v1H4V3H2v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconCalendar;
