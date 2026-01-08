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
const EuiIconTokenSemanticText = ({
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
    <path d="M2 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H3v10h1.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5v-11ZM13.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V3h-1.5a.5.5 0 0 1 0-1h2ZM9.098 4.5l-.244 1.393h.896l-.212 1.211h-.896l-.435 2.574c-.024.176-.013.308.034.398.046.09.163.138.35.145.072.004.22-.005.445-.026L8.91 11.46a2.75 2.75 0 0 1-.916.129c-.528-.007-.923-.162-1.186-.466-.262-.304-.37-.716-.32-1.237l.455-2.78H6.25l.207-1.212h.694L7.394 4.5h1.704Z" />
  </svg>
);
export const icon = EuiIconTokenSemanticText;
