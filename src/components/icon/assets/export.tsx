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
const EuiIconExport = ({
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
    <path d="M8.505 1c.422-.003.844.17 1.166.516l1.95 2.05c.213.228.213.6 0 .828a.52.52 0 0 1-.771 0L9 2.451v7.993c0 .307-.224.556-.5.556s-.5-.249-.5-.556v-7.96l-1.82 1.91a.52.52 0 0 1-.77 0 .617.617 0 0 1 0-.829l1.95-2.05A1.575 1.575 0 0 1 8.5 1h.005ZM4.18 7c-.473 0-.88.294-.972.703l-1.189 5.25a.776.776 0 0 0-.019.172c0 .483.444.875.99.875H14.01c.065 0 .13-.006.194-.017.537-.095.885-.556.778-1.03l-1.19-5.25C13.7 7.294 13.293 7 12.822 7H4.18ZM6 6v1h5V6h1.825c.946 0 1.76.606 1.946 1.447l1.19 5.4c.215.975-.482 1.923-1.556 2.118a2.18 2.18 0 0 1-.39.035H2.985C1.888 15 1 14.194 1 13.2c0-.119.013-.237.039-.353l1.19-5.4C2.414 6.606 3.229 6 4.174 6H6Z" />
  </svg>
);
export const icon = EuiIconExport;
