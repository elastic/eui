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
const EuiIconProductCanvas = ({
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
    <path d="M5 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0 1a1 1 0 1 0 1 1H5zM9 9H8V7h1zm2 0h-1V5h1zm2 0h-1V3h1zM5 4H3V3h2z" />
    <path d="M9 0a1 1 0 0 1 1 1h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.798l1.63 2.445A1 1 0 0 1 13 15h-1a1 1 0 0 1-.832-.445L10.132 13H5.868l-1.036 1.555A1 1 0 0 1 4 15H3a1 1 0 0 1-.832-1.555L3.798 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1-1zM3 14h1l2-3H5zm9 0h1l-2-3h-1zm-5.465-2h2.93l-.666-1H7.2zM2 10h12V2h-4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1H2zm5-9v1h2V1z" />
  </svg>
);
export const icon = EuiIconProductCanvas;
