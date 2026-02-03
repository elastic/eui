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
const EuiIconNumber = ({
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
    <path d="M12.975 2.158 12.027 5H15v1h-3.306l-1.334 4H13v1h-2.973l-1.052 3.158-.95-.316L8.973 11H5.027l-1.052 3.158-.95-.316L3.973 11H1v-1h3.306L5.64 6H3V5h2.973l1.052-3.158.95.316L7.027 5h3.946l1.052-3.158.95.316ZM5.36 10h3.946l1.334-4H6.694L5.36 10Z" />
  </svg>
);
export const icon = EuiIconNumber;
