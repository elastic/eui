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
      d="M10.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M14.243 1.022a8.47 8.47 0 0 0-3.168.373c-1.534.491-2.94 1.533-4.138 2.715l-.168-.168a.995.995 0 0 0-1.175-.182l-4.09 2.23c-.656.357-.657 1.303-.002 1.702l1.372.836c.078.048.235.144.44.28l-.109.183c-.216.369-.14.84.17 1.15l2.484 2.484c.31.31.781.387 1.15.17l.183-.109c.137.206.233.363.28.442l.836 1.37c.4.656 1.345.654 1.703-.002l2.23-4.089a.995.995 0 0 0-.183-1.176l-.167-.167c1.182-1.2 2.223-2.605 2.714-4.138a8.477 8.477 0 0 0 .373-3.169.79.79 0 0 0-.735-.735ZM10.32 9.178c1.487-1.322 2.812-2.902 3.348-4.577a7.508 7.508 0 0 0 .341-2.61 7.543 7.543 0 0 0-2.608.342c-1.676.537-3.256 1.861-4.578 3.348-1.29 1.449-2.254 2.962-2.745 3.792l2.449 2.45c.83-.492 2.343-1.456 3.792-2.745Zm-4.055-4.37-.18-.18-4.089 2.228 1.373.837c.08.049.238.145.444.282a25.66 25.66 0 0 1 2.452-3.167Zm1.761 7.38c.138.208.235.367.284.446l.835 1.371 2.23-4.088-.181-.18a25.652 25.652 0 0 1-3.168 2.451Z"
      clipRule="evenodd"
    />
    <path d="M3.236 12.058c.19-.19.5-.185.696.01.195.195.2.507.01.696L1.887 14.82a.442.442 0 0 1-.706-.706l2.055-2.056Zm1.412 1.412c.19-.19.5-.185.696.01.195.195.2.507.01.696l-.685.685c-.19.19-.5.185-.696-.01a.492.492 0 0 1-.01-.696l.685-.685Zm-2.824-2.824c.19-.19.5-.185.696.01.195.195.2.507.01.696l-.685.685c-.19.19-.5.185-.696-.01a.492.492 0 0 1-.01-.696l.685-.685Z" />
  </svg>
);
export const icon = EuiIconLaunch;
