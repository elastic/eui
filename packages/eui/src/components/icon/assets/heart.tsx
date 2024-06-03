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
const EuiIconHeart = ({
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
    <path d="M7.402 3.098a3.75 3.75 0 0 0-5.304 5.304l5.558 5.27L8 14l5.892-5.588a3.75 3.75 0 1 0-5.294-5.313L8 3.697l-.598-.599ZM2.796 7.685a2.747 2.747 0 0 1 .01-3.88 2.75 2.75 0 0 1 3.889 0L8 5.111l1.305-1.306a2.75 2.75 0 1 1 3.89 3.89L8 12.62 2.796 7.685Z" />
  </svg>
);
export const icon = EuiIconHeart;
