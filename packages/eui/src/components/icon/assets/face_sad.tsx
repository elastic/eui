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
const EuiIconFaceSad = ({
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
    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1.067A6.933 6.933 0 1 0 8 1.067a6.933 6.933 0 0 0 0 13.866ZM5.333 6.4a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133Zm5.334 0a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133Zm2.487 3.868a.533.533 0 1 1-.708.797C10.936 9.725 9.458 9.067 8 9.067c-1.458 0-2.937.657-4.446 1.998a.533.533 0 1 1-.708-.797C4.536 8.765 6.258 8 8 8s3.463.765 5.154 2.268Z" />
  </svg>
);
export const icon = EuiIconFaceSad;
