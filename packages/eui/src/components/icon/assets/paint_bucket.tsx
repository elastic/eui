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
const EuiIconPaintBucket = ({
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
    <path
      fillRule="evenodd"
      d="m14.823 11.432.001.002.003.005.01.014.036.052a14.427 14.427 0 0 1 .492.786c.134.231.28.5.395.762.097.22.24.582.24.947a2 2 0 0 1-4 0c0-.365.143-.727.24-.947.115-.262.26-.531.395-.762a14.24 14.24 0 0 1 .492-.786l.036-.052.01-.014c0-.002.002-.004.003-.005v-.001L14 10.24l.823 1.192ZM14 12s-1 1.448-1 2a1 1 0 1 0 2 0c0-.549-.988-1.982-1-2Z"
      clipRule="evenodd"
    />
    <path d="m14.353 8.646-.707.708-.793-.793-6.146 6.146a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l2.94-2.94.706.708L1 9l5 5 6.147-6.146-5-5L6.06 3.939l-.707-.707L6.44 2.146l-.793-.792.707-.708 8 8Z" />
    <path
      fillRule="evenodd"
      d="m6.853 6.146-.002.003a1.5 1.5 0 1 1-.701.701l-.004.004-4.5-4.5.707-.708 4.5 4.5ZM7.5 7a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconPaintBucket;
