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
const EuiIconPinFill = ({
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
    <path d="M10.707 1.293A1 1 0 0 0 9 2v1.548L3.069 7.361l-.715-.715-.708.708.997.996.003.004L4.793 10.5 1 14.293V15h.707L5.5 11.207l2.146 2.147.004.003.996.997.708-.707-.658-.658c.935-1.055 1.935-2.63 2.718-3.969.444-.76.827-1.457 1.098-1.965l.03-.055H14a1 1 0 0 0 .707-1.707l-4-4Z" />
  </svg>
);
export const icon = EuiIconPinFill;
