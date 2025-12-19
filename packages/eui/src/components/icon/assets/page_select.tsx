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
const EuiIconPageSelect = ({
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
      d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5a4.995 4.995 0 0 1-.584-1H3V2h7v2a1 1 0 0 0 1 1h2v2.1c.348.07.682.177 1 .316V4a1 1 0 0 0-.293-.707l-2-2A1 1 0 0 0 11 1H3zm13 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-1.646-1.354a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 2.146-2.147a.5.5 0 0 1 .708 0z"
    />
  </svg>
);
export const icon = EuiIconPageSelect;
