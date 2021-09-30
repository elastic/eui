/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconMlDataVisualizer = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 20v10h10v2H0V20h2zm30 0v12H20v-2h10V20h2zM12 4a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12 6 6 0 000-12zm0-6v2H2v10H0V0h12zm20 0v12h-2V2H20V0h12z" />
    <path
      className="euiIcon__fillSecondary"
      d="M21.997 12.251c-.017.689-.104 1.36-.253 2.006a6 6 0 11-7.487 7.487c-.646.15-1.317.236-2.006.253a8 8 0 109.746-9.746z"
    />
  </svg>
);

export const icon = EuiIconMlDataVisualizer;
