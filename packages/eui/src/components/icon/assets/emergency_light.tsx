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
const EuiIconEmergencyLight = ({
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
    <path d="M8 4a5 5 0 0 1 5 5v3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1V9a5 5 0 0 1 5-5M3 14h10v-1H3zm5-9a4 4 0 0 0-4 4v3h3.5V9h1v3H12V9a4 4 0 0 0-4-4M15.186 5.438l-1.732 1-.5-.867 1.731-1zm-12.129.133-.5.866-1.733-1 .5-.866zm2.377-2.014-.867.5-1-1.733.867-.5zm7.008-1.234-1 1.733-.866-.5 1-1.733zM8.5 3h-1V1h1z" />
  </svg>
);
export const icon = EuiIconEmergencyLight;
