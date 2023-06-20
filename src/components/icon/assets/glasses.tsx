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
const EuiIconGlasses = ({
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
    <path d="M9.035 9A3.5 3.5 0 0 1 15 7.05V4.5c0-1.072-.648-1.72-2.098-2.01a.5.5 0 0 1 .196-.98C14.981 1.886 16 2.905 16 4.5v4.25c0 .072-.015.14-.043.202A3.5 3.5 0 1 1 9.035 10h-2.07A3.5 3.5 0 1 1 .043 8.952.498.498 0 0 1 0 8.75V4.5c0-1.595 1.019-2.614 2.902-2.99a.5.5 0 0 1 .196.98C1.648 2.78 1 3.428 1 4.5v2.55A3.5 3.5 0 0 1 6.965 9h2.07ZM3.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm9 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);
export const icon = EuiIconGlasses;
