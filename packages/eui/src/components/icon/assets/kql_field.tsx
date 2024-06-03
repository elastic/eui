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
const EuiIconKqlField = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={10}
    viewBox="0 0 16 10"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 9a5 5 0 1 1 0-8 5 5 0 1 1 0 8Zm.75-.692a4 4 0 1 0 0-6.615A4.981 4.981 0 0 1 10 5a4.981 4.981 0 0 1-1.25 3.308ZM4.133 8V5.559h2.496v-.625H4.133V2.996h2.719v-.633H3.43V8h.703Z" />
  </svg>
);
export const icon = EuiIconKqlField;
