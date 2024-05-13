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
const EuiIconSearch = ({
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
    <path d="m11.271 11.978 3.872 3.873a.502.502 0 0 0 .708 0 .502.502 0 0 0 0-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532-2.73-2.73-7.17-2.73-9.898 0-2.728 2.729-2.728 7.17 0 9.9a6.955 6.955 0 0 0 4.949 2.05.5.5 0 0 0 0-1 5.96 5.96 0 0 1-4.242-1.757 6.01 6.01 0 0 1 0-8.486c2.337-2.34 6.143-2.34 8.484 0a6.01 6.01 0 0 1 0 8.486.5.5 0 0 0 .034.738Z" />
  </svg>
);
export const icon = EuiIconSearch;
