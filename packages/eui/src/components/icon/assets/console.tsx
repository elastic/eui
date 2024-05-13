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
const EuiIconConsole = ({
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
    <path d="M1.157 12.224 5.768 8.32a.404.404 0 0 0 0-.64l-4.61-3.904a.407.407 0 0 1 0-.643.608.608 0 0 1 .759 0l4.61 3.904c.631.534.63 1.393 0 1.926l-4.61 3.904a.608.608 0 0 1-.76 0 .407.407 0 0 1 0-.643ZM9 12h6v1H9v-1Z" />
  </svg>
);
export const icon = EuiIconConsole;
