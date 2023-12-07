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
const EuiIconBeta = ({
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
    <path d="M8 6.394h1.03c.72 0 1.283.153 1.688.459a2.2 2.2 0 0 1 .813 1.163c.138.47.165.952.083 1.447-.1.597-.33 1.135-.69 1.616a3.95 3.95 0 0 1-1.333 1.137 3.689 3.689 0 0 1-1.735.418c-.381 0-.747-.07-1.097-.212-.35-.144-.636-.417-.86-.818l-.082.041.33-2.018c-.055.337-.024.647.092.932.12.285.32.513.598.685.281.171.634.257 1.06.257a2.54 2.54 0 0 0 2.075-1.03c.226-.308.369-.645.427-1.008a1.929 1.929 0 0 0-.072-.973 1.524 1.524 0 0 0-.536-.752c-.25-.196-.57-.293-.957-.293H7.825L8 6.395Zm1.359-4.591c.49 0 .913.079 1.266.237a2.258 2.258 0 0 1 1.303 1.528c.082.33.094.668.036 1.014-.069.433-.25.864-.54 1.293-.29.425-.684.78-1.185 1.065-.497.282-1.096.422-1.796.422h-.597l.175-1.05h.576a2.182 2.182 0 0 0 1.812-.89c.192-.265.312-.544.36-.84.08-.473-.036-.866-.344-1.178-.31-.313-.726-.469-1.251-.469-.35 0-.683.072-.999.216a2.256 2.256 0 0 0-.793.603 1.852 1.852 0 0 0-.412.89l-1.78 10.81H3.973l1.782-10.81a3.17 3.17 0 0 1 .648-1.457c.34-.429.765-.767 1.277-1.014a3.827 3.827 0 0 1 1.678-.37Z" />
  </svg>
);
export const icon = EuiIconBeta;
