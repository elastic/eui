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
const EuiIconPencil = ({
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
      d="M13.707 5a1 1 0 0 0 0-1.414l-2.293-2.293a1 1 0 0 0-1.414 0l-1.5 1.5-.013.013L2 9.293V13h3.707l8-8Zm-2.207.793L9.207 3.5l1.5-1.5L13 4.293l-1.5 1.5Zm-3-1.586L3 9.707V12h2.293l5.5-5.5L8.5 4.207Z"
      clipRule="evenodd"
    />
    <path d="M2 15h7v-1H2v1Zm10 0h-2v-1h2v1Zm1 0h1v-1h-1v1Z" />
  </svg>
);
export const icon = EuiIconPencil;
