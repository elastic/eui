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
const EuiIconContinuityWithin = ({
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
    <path d="M.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9A.5.5 0 0 0 .5 3zm14.5.5a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zm-4.712 1.547a.5.5 0 0 1 .532.069l3 2.5a.5.5 0 0 1 0 .768l-3 2.5A.5.5 0 0 1 10 10.5V9H6v1.5a.5.5 0 0 1-.82.384l-3-2.5a.5.5 0 0 1 0-.768l3-2.5A.5.5 0 0 1 6 5.5V7h4V5.5a.5.5 0 0 1 .288-.453z" />
  </svg>
);
export const icon = EuiIconContinuityWithin;
