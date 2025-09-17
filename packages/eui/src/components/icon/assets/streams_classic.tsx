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
const EuiIconStreamsClassic = ({
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
    <path
      fillRule="evenodd"
      d="M13.5 9a1.5 1.5 0 1 1-1.413 2H3.913a1.5 1.5 0 1 1 0-1h8.174A1.5 1.5 0 0 1 13.5 9Zm-11 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm11 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm0-6a1.5 1.5 0 1 1-1.413 2H3.913a1.5 1.5 0 1 1 0-1h8.174A1.5 1.5 0 0 1 13.5 4Zm-11 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm11 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconStreamsClassic;
