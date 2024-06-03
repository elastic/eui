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
const EuiIconPackage = ({
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
    <path d="m14.447 3.724-6-3a1 1 0 0 0-.894 0l-6 3A1 1 0 0 0 1 4.618v6.764a1 1 0 0 0 .553.894l6 3a1 1 0 0 0 .894 0l6-3a1 1 0 0 0 .553-.894V4.618a1 1 0 0 0-.553-.894ZM5.871 5.897l5.343-2.672 2.158 1.079L8 6.943ZM8 1.618l2.096 1.048-5.353 2.677-2.115-1.039ZM2 5.11l2.25 1.105V9a.5.5 0 0 0 1 0V6.706L7.5 7.811v6.321L2 11.382Zm6.5 9.022v-6.32L14 5.11v6.272Z" />
  </svg>
);
export const icon = EuiIconPackage;
