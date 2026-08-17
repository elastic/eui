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
const EuiIconTranslate = ({
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
    <path d="M15.108 14H16v1h-3v-1h1.017l-.438-1H9.421l-.438 1H10v1H7v-1h.892l3.062-7h1.092l3.062 7Zm-5.25-2h3.284L11.5 8.247 9.858 12ZM5 3h4v1H6.924a8.566 8.566 0 0 1-.86 2.364 7.555 7.555 0 0 1-.865 1.262c.713.62 1.653 1.135 2.899 1.384l-.41.935C6.332 9.636 5.294 9.044 4.5 8.342c-.793.702-1.831 1.294-3.189 1.603L.902 9.01c1.246-.25 2.185-.765 2.898-1.384a7.554 7.554 0 0 1-.863-1.262A8.566 8.566 0 0 1 2.077 4H0V3h4V1h1v2ZM3.1 4c.013.054.025.112.04.172.118.455.323 1.07.673 1.714.186.339.413.684.687 1.02a6.76 6.76 0 0 0 .687-1.02 7.58 7.58 0 0 0 .672-1.714c.016-.06.028-.118.04-.172H3.101Z" />
  </svg>
);
export const icon = EuiIconTranslate;
