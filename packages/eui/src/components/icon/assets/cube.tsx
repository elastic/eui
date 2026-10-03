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
const EuiIconCube = ({
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
    <path d="M7.66.06a1 1 0 0 1 .787.045l6 3A1 1 0 0 1 15 4v8a1 1 0 0 1-.553.895l-6 3a1 1 0 0 1-.894 0l-6-3A1 1 0 0 1 1 12V4a1 1 0 0 1 .553-.895l6-3zM2 12l5.5 2.75V7.309L2 4.559zm6.5-4.691v7.441L14 12V4.559zm-5.941-3.59L8 6.44l5.44-2.72L8 1z" />
  </svg>
);
export const icon = EuiIconCube;
