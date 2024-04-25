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
const EuiIconCloudSunny = ({
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
    <path d="M10.746 5.005A5.5 5.5 0 0 1 10.5 16H4a4 4 0 0 1-1.61-7.663A4.473 4.473 0 0 1 2.029 7H.5a.5.5 0 0 1 0-1h1.527a4.479 4.479 0 0 1 .957-2.309L1.646 2.354a.5.5 0 1 1 .708-.708L3.69 2.984A4.479 4.479 0 0 1 6 2.027V.5a.5.5 0 0 1 1 0v1.528a4.493 4.493 0 0 1 2.309.956l1.337-1.338a.5.5 0 0 1 .708.708L10.016 3.69c.311.388.56.831.73 1.314ZM4 15h6.5a4.5 4.5 0 1 0-4.152-6.239A3.995 3.995 0 0 1 8 12a.5.5 0 1 1-1 0 3 3 0 1 0-3 3Zm5.691-9.94a3.5 3.5 0 1 0-6.33 2.991 4.029 4.029 0 0 1 2.106.227 5.505 5.505 0 0 1 4.224-3.219Z" />
  </svg>
);
export const icon = EuiIconCloudSunny;
