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
const EuiIconBullseye = ({
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
    <path d="M8 1c.858 0 1.68.155 2.44.438l-.793.792A6.002 6.002 0 0 0 2 8a6 6 0 1 0 11.769-1.648l.793-.793A7 7 0 1 1 8 1Z" />
    <path d="M8 4c.345 0 .68.044 1 .126v.753l-.226.225a3 3 0 1 0 2.121 2.121L11.122 7h.753A4.006 4.006 0 0 1 8 12a4 4 0 0 1 0-8Z" />
    <path
      fillRule="evenodd"
      d="M13 3h2.707l-3 3h-2L8.965 7.741a1 1 0 1 1-.707-.707l1.478-1.478.264-.263v-2l3-3V3Zm-2 .707V5h1.293l.546-.547.454-.453H12V2.707l-1 1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconBullseye;
