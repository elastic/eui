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
const EuiIconAppLens = ({
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
    <path
      d="m23.793 14.293 1.414 1.414-6.408 6.409-3.75-3.25-4.342 4.341-1.414-1.414 5.658-5.659 3.75 3.25 5.092-5.091ZM12 11v5l-2 2v-7h2Zm10-6v8l-2 2V5h2Zm-5 3v7l-2-2V8h2Z"
      className="euiIcon__fillSecondary"
    />
    <path d="M17 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-3.782 0-7.238-1.4-9.876-3.71l-5.417 5.417-1.414-1.414 5.417-5.417A14.943 14.943 0 0 1 2 15c0-1.05.108-2.074.313-3.062l1.906.672C4.075 13.385 4 14.184 4 15c0 7.18 5.82 13 13 13s13-5.82 13-13S24.18 2 17 2c-1.002 0-1.978.113-2.915.328l-.75-1.877A15.031 15.031 0 0 1 17 0ZM9.621 1.937l.75 1.877a13.062 13.062 0 0 0-4.82 5.024l-1.907-.673a15.068 15.068 0 0 1 5.977-6.228Z" />
  </svg>
);
export const icon = EuiIconAppLens;
