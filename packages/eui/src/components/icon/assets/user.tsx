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
const EuiIconUser = ({
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
      d="M3.293 9.293 4 10l-1 4h10l-1-4 .707-.707a1 1 0 0 1 .263.464l1 4A1 1 0 0 1 13 15H3a1 1 0 0 1-.97-1.242l1-4a1 1 0 0 1 .263-.465ZM8 9c3 0 4 1 4 1 .707-.707.706-.708.706-.708l-.001-.001-.002-.002-.005-.005-.01-.01a1.798 1.798 0 0 0-.101-.089 2.907 2.907 0 0 0-.235-.173 4.66 4.66 0 0 0-.856-.44 7.11 7.11 0 0 0-1.136-.342 4 4 0 1 0-4.72 0 7.11 7.11 0 0 0-1.136.342 4.66 4.66 0 0 0-.856.44 2.909 2.909 0 0 0-.335.262l-.011.01-.005.005-.002.002h-.001S3.293 9.294 4 10c0 0 1-1 4-1Zm0-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconUser;
