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
const EuiIconInfinity = ({
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
    <path d="M5.37 9.457A1.994 1.994 0 0 1 3.993 10a2 2 0 1 1 1.403-3.433l.601.679 1.336-1.508-.462-.522a4 4 0 1 0-.041 5.613l.021-.022 3.777-4.265.002.001a2 2 0 1 1-.024 2.89l-.601-.679-1.336 1.508.462.522a4 4 0 1 0 0-5.569l-3.74 4.223a1.991 1.991 0 0 1-.02.02Z" />
  </svg>
);
export const icon = EuiIconInfinity;
