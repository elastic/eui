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
const EuiIconProductDiscover = ({
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
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm.5 2.5h-1V2.022A5.998 5.998 0 0 0 2.022 7.5H3.5v1H2.022A5.997 5.997 0 0 0 7.5 13.977V12.5h1v1.477A5.997 5.997 0 0 0 13.977 8.5H12.5v-1h1.477A5.998 5.998 0 0 0 8.5 2.022V3.5Zm1.793 1.545a.5.5 0 0 1 .662.662l-2.5 5.5a.5.5 0 0 1-.945-.11l-.435-2.172-2.173-.435a.5.5 0 0 1-.109-.945l5.5-2.5ZM6.617 7.813l.98.197.073.02a.5.5 0 0 1 .32.372l.196.98 1.307-2.875-2.876 1.306Z" />
  </svg>
);
export const icon = EuiIconProductDiscover;
