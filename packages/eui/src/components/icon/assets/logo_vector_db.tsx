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
const EuiIconLogoVectorDb = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    data-type="logoVectorDB"
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#02BCB7"
      d="M16.875 9.96C19.48 5.09 25.54 3.252 30.41 5.857l-8.863 16.57a7.559 7.559 0 0 0-.478-1.051l-5.23-9.48 1.037-1.938Z"
    />
    <path
      fill="#FEC514"
      d="M4.084 6.122a5 5 0 0 1 6.794 1.962l3.554 6.442-4.34 8.116a4.995 4.995 0 0 0 .047 4.803l-.017-.03-8-14.5a5 5 0 0 1 1.962-6.793Z"
    />
    <path
      d="M18.878 22.584a5 5 0 1 1-8.786.058l4.34-8.116 4.446 8.058Z"
      className="euiIcon__fillNegative"
    />
  </svg>
);
export const icon = EuiIconLogoVectorDb;
