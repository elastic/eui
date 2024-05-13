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
const EuiIconLineDashed = ({
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
    <path d="M12.707 4.707a1 1 0 1 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414l-2 2zm-6.414 5a1 1 0 0 0 1.414 0l2-2a1 1 0 1 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414zm-5 5a1 1 0 0 0 1.414 0l2-2a1 1 0 1 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414z" />
  </svg>
);
export const icon = EuiIconLineDashed;
