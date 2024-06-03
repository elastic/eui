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
const EuiIconVisGoal = ({
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
    <path d="M10.725 3.653a6 6 0 0 1 2.847 7.576.5.5 0 0 1-.928-.372 5 5 0 1 0-9.293-.014.5.5 0 0 1-.218.619L1.39 12.47a.5.5 0 0 1-.708-.23A7.99 7.99 0 0 1 0 9a8 8 0 0 1 11.212-7.329.5.5 0 0 1 .234.704l-.721 1.278Zm-.933-.38.5-.889a7 7 0 0 0-8.902 8.93l.886-.511a6 6 0 0 1 7.516-7.53ZM6.73 9.467a1.75 1.75 0 1 1 2.539 0 2 2 0 1 1-2.539 0ZM8 12.013a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  </svg>
);
export const icon = EuiIconVisGoal;
