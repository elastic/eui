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
const EuiIconLogIn = ({
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
    <path d="M13.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5V12h1v1h7V3H6v1H5V2.5a.5.5 0 0 1 .5-.5zm-1.793 6-3.353 3.354-.708-.707L9.793 8.5H2v-1h7.793L7.646 5.354l.708-.708z" />
  </svg>
);
export const icon = EuiIconLogIn;
