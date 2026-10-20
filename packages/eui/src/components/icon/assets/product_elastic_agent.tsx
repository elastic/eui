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
const EuiIconProductElasticAgent = ({
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
    <path d="M13.515 4.143A1 1 0 0 1 14 5v6a1 1 0 0 1-.485.857l-5 3a1 1 0 0 1-1.03 0l-5-3A1 1 0 0 1 2 11V5a1 1 0 0 1 .485-.857L4 3.233V4.4L3 5v6l5 3 5-3V5l-1-.6V3.232z" />
    <path d="M11 6.132v3.735l-3 1.8-3-1.8V6.132l3-1.8zm-5 .566v2.603l2 1.2 2-1.2V6.698l-2-1.2zM11 2.634V3.8L8 2 5 3.8V2.634l3-1.8z" />
  </svg>
);
export const icon = EuiIconProductElasticAgent;
