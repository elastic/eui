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
const EuiIconLaunch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M10 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6.679 12.967c.353-.136.697-.3 1.033-.475l1.36 2.265a.5.5 0 0 0 .828.043l3-4a.5.5 0 0 0-.046-.654l-.886-.886C13.604 7.456 15 4.913 15 1.5a.5.5 0 0 0-.5-.5c-3.413 0-5.956 1.395-7.76 3.033l-.886-.887A.5.5 0 0 0 5.2 3.1l-4 3a.5.5 0 0 0 .043.829l2.264 1.358a9.59 9.59 0 0 0-.475 1.036v.001a.5.5 0 0 0 .114.53l3 3c.139.138.35.182.533.113ZM4.09 9.384l2.525 2.525a14.616 14.616 0 0 0 3.555-2.285c1.841-1.612 3.657-4.076 3.818-7.612-3.537.16-6.001 1.976-7.613 3.817A14.617 14.617 0 0 0 4.09 9.384Zm-.096-1.97a15.616 15.616 0 0 1 2.03-2.682l-.572-.572-3.058 2.294 1.6.96Zm5.551 6.191-.96-1.6a15.617 15.617 0 0 0 2.682-2.03l.572.572-2.294 3.058Z"
      clipRule="evenodd"
    />
    <path d="M3.854 12.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0Zm2 1.708a.5.5 0 0 0-.708-.708l-1 1a.5.5 0 0 0 .708.708l1-1Zm-3-3.708a.5.5 0 0 1 0 .708l-1 1a.5.5 0 0 1-.708-.708l1-1a.5.5 0 0 1 .708 0Z" />
  </svg>
);
export const icon = EuiIconLaunch;
