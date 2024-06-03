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
const EuiIconTokenText = ({
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
    <path d="m9.147 4.297-.255 1.455h.936l-.222 1.266h-.935l-.455 2.688c-.025.184-.013.323.036.417.048.093.17.144.365.151.075.004.23-.005.465-.027l-.13 1.32c-.3.097-.618.142-.957.135-.552-.007-.965-.17-1.239-.487-.274-.317-.386-.748-.335-1.293l.476-2.904h-.725l.216-1.266h.725l.254-1.455h1.78Z" />
  </svg>
);
export const icon = EuiIconTokenText;
