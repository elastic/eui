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
const EuiIconMlOutlierDetectionJob = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 12v6h6v2H0v-8h2zm18 0v8h-8v-2h6v-6h2zM8 0v2H2v6H0V0h8zm12 0v8h-2V2h-6V0h8z" />
    <path
      d="M16 24a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm12 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-12 1.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm12 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM28 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"
      className="euiIcon__fillSecondary"
    />
  </svg>
);
export const icon = EuiIconMlOutlierDetectionJob;
