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
    <path d="M14 6a3 3 0 0 0-5.571-1.546L8 5.165l-.429-.71a3 3 0 1 0-4.887 3.454l.195.212v.002L8 13l5.12-4.877.001-.002A2.989 2.989 0 0 0 14 6Zm1 0a3.989 3.989 0 0 1-1.172 2.828l-.002-.002c-.006.006-.01.015-.016.02l-5.12 4.878a1 1 0 0 1-1.38 0L2.19 8.847c-.017-.017-.031-.037-.047-.055l-.002.003-.195-.213-.033-.037A4 4 0 0 1 8 3.355 4 4 0 0 1 15 6Z" />
  </svg>
);
export const icon = EuiIconHeart;
