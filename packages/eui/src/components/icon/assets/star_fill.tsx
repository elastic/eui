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
const EuiIconStarFill = ({
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
    <path d="M8 1a1 1 0 0 1 .936.648L10.193 5H14a1 1 0 0 1 .65 1.759l-3.006 2.576 1.314 4.378A1 1 0 0 1 11.4 14.8L8 12.249l-3.4 2.55a1 1 0 0 1-1.558-1.086l1.312-4.378L1.35 6.759A.999.999 0 0 1 2 5h3.807l1.257-3.352.066-.14A1 1 0 0 1 7.999 1Z" />
  </svg>
);
export const icon = EuiIconStarFill;
