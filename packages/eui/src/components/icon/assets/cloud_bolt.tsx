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
const EuiIconCloudBolt = ({
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
    <path d="M8 11h2l-5 5 2-4H5l5-5z" />
    <path d="M8 0a4 4 0 0 1 3.878 3.02A3.5 3.5 0 0 1 11.5 10H9.618l.5-1H11.5a2.5 2.5 0 0 0 0-5h-.03l-.251.016a2.5 2.5 0 0 0-1.487.716l-.707-.707a3.5 3.5 0 0 1 1.825-.963A3.001 3.001 0 0 0 5.038 4.48l.117.727-.718-.16A2 2 0 1 0 4 9h2.586l-1 1.001H4a3 3 0 0 1 0-6 4 4 0 0 1 4-4" />
  </svg>
);
export const icon = EuiIconCloudBolt;
