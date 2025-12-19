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
const EuiIconTableInfo = ({
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
    <path d="M3 1h10a2 2 0 0 1 2 2v4.337a5.533 5.533 0 0 0-1-1.08V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3.257c.314.38.677.716 1.08 1H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z" />
    <path d="M3.5 6h3.837a5.54 5.54 0 0 0-1.08 1H3.5a.5.5 0 0 1 0-1Zm0 6h1.707c.098.345.228.677.388.991A.505.505 0 0 1 5.5 13h-2a.5.5 0 0 1 0-1Zm0-8a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1h-9ZM3 9.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5Z" />
    <path
      fillRule="evenodd"
      d="M15 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-2.146-2.354a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708 0ZM9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
);
export const icon = EuiIconTableInfo;
