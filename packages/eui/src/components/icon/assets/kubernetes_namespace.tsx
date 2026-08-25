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
const EuiIconKubernetesNamespace = ({
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
    <path d="M5 6.233A2.1 2.1 0 0 1 6 6c.462 0 .843.117 1.144.318.3.2.492.462.616.708a2.3 2.3 0 0 1 .236.874l.003.067v.032L7.5 8l.5-.001V10h.5v1h-2v-1H7V8l-.001-.03a1.4 1.4 0 0 0-.133-.497.8.8 0 0 0-.275-.323C6.47 7.07 6.287 7 6 7c-.288 0-.47.07-.59.15a.8.8 0 0 0-.275.324 1.4 1.4 0 0 0-.133.497L5 8v2h.5v1h-2v-1H4V7h-.5V6H5zM12 7.5h-1a.5.5 0 1 0-.5.5 1.5 1.5 0 1 1-.5 2.912V11H9V9.5h1a.5.5 0 1 0 .5-.5 1.5 1.5 0 1 1 .5-2.913V6h1z" />
    <path d="M7.66.06a1 1 0 0 1 .787.045l6 3 .104.06a1 1 0 0 1 .435.67l1 6a1 1 0 0 1-.205.79l-4 5A1 1 0 0 1 11 16H5a1 1 0 0 1-.781-.375l-4-5a1 1 0 0 1-.205-.79l1-6 .026-.115a1 1 0 0 1 .513-.615l6-3zM2 4l-1 6 4 5h6l4-5-1-6-6-3z" />
  </svg>
);
export const icon = EuiIconKubernetesNamespace;
