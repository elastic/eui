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
const EuiIconPin = ({
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
    <path d="M9.617 1.076a1 1 0 0 1 1.09.217l4 4A1 1 0 0 1 14 7h-1.548L8.64 12.932l.715.714-.708.707L5.5 11.207 1.707 15H1v-.707L4.793 10.5 1.646 7.354l.708-.707.713.713L9 3.548V2a1 1 0 0 1 .617-.924ZM3.792 8.085l4.122 4.122 3.67-5.709-2.083-2.083-5.709 3.67ZM10 3.5 12.5 6H14l-4-4v1.5Z" />
  </svg>
);
export const icon = EuiIconPin;
