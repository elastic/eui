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
const EuiIconLogstashOutput = ({
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
    <path d="M2.21 4.008H13.76V0h1v4.008h.088c.619 0 1.122.504 1.122 1.123V7.49c0 .62-.503 1.122-1.122 1.122H1.122A1.122 1.122 0 0 1 0 7.49V5.13c0-.618.503-1.122 1.122-1.122h.089V0h1v4.008Zm11.549 1H1.12A.123.123 0 0 0 1 5.13V7.49c0 .068.055.122.122.122h13.725a.122.122 0 0 0 .122-.122V5.13a.123.123 0 0 0-.122-.122h-1.088Zm-5.301 9.097 2.405-2.26.686.728-3.58 3.363-3.58-3.363.686-.728 2.383 2.24V9.577h1v4.528Z" />
  </svg>
);
export const icon = EuiIconLogstashOutput;
