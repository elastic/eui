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
const EuiIconAppIndexManagement = ({
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
    <path d="M17 18v-2h-2v2H3v6h2v-4h10v4h2v-4h10v4h2v-6z" />
    <path
      d="M4 32a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 4a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 4a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM23 8V6h-2.1a5 5 0 0 0-.73-1.75l1.49-1.49-1.42-1.42-1.49 1.49A5 5 0 0 0 17 2.1V0h-2v2.1a5 5 0 0 0-1.75.73l-1.49-1.49-1.42 1.42 1.49 1.49A5 5 0 0 0 11.1 6H9v2h2.1a5 5 0 0 0 .73 1.75l-1.49 1.49 1.41 1.41 1.49-1.49a5 5 0 0 0 1.76.74V14h2v-2.1a5 5 0 0 0 1.75-.73l1.49 1.49 1.41-1.41-1.48-1.5A5 5 0 0 0 20.9 8H23zm-7 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      className="euiIcon__fillSecondary"
    />
    <path d="M16 8a1 1 0 0 1-1-1 1.39 1.39 0 0 1 0-.2.65.65 0 0 1 .06-.18.74.74 0 0 1 .09-.18 1.61 1.61 0 0 1 .12-.15.93.93 0 0 1 .33-.21 1 1 0 0 1 1.09.21l.12.15a.78.78 0 0 1 .09.18.62.62 0 0 1 .1.18 1.27 1.27 0 0 1 0 .2 1 1 0 0 1-1 1Z" />
  </svg>
);
export const icon = EuiIconAppIndexManagement;
