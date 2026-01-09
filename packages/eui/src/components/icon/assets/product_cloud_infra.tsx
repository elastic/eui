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
const EuiIconProductCloudInfra = ({
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
    <path d="M15 8a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h8Zm-8 6h8v-2H9v1H8v-1H7v2ZM8 1a4 4 0 0 1 3.878 3.02A3.502 3.502 0 0 1 14.965 7H13.95a2.501 2.501 0 0 0-2.45-2h-.03a2.491 2.491 0 0 0-1.738.732l-.707-.707a3.493 3.493 0 0 1 1.825-.963A3.001 3.001 0 0 0 5.038 5.48l.117.727-.718-.16A2 2 0 1 0 4 10h1v1.001H4a3 3 0 0 1 0-6 4 4 0 0 1 4-4ZM7 11h8V9H9v1H8V9H7v2Z" />
  </svg>
);
export const icon = EuiIconProductCloudInfra;
