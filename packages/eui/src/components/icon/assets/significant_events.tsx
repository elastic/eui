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
const EuiIconSignificantEvents = ({
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
    <path d="M8.5 15h-1v-3h1v3ZM4.354 12.354l-1.5 1.5-.708-.707 1.5-1.5.708.707ZM13.854 13.146l-.707.707-1.5-1.5.707-.707 1.5 1.5Z" />
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4Zm-4 5h4V6H6v4Z"
      clipRule="evenodd"
    />
    <path d="M4.005 8.495h-3v-1h3v1ZM15.005 8.495h-3v-1h3v1ZM4.354 3.646l-.708.708-1.5-1.5.708-.708 1.5 1.5ZM13.854 2.854l-1.5 1.5-.707-.708 1.5-1.5.707.708ZM8.5 4h-1V1h1v3Z" />
  </svg>
);
export const icon = EuiIconSignificantEvents;
