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
const EuiIconQuestion = ({
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
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
    />
    <path d="M9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path
      fillRule="evenodd"
      d="M8 4h.033l.067.004a2.343 2.343 0 0 1 .874.236c.246.124.508.317.708.616.2.302.318.682.318 1.144 0 .463-.117.843-.318 1.145-.2.299-.462.492-.708.615a2.274 2.274 0 0 1-.474.172V9h-1V7H8c.005 0 .015 0 .029-.002a1.344 1.344 0 0 0 .498-.133.817.817 0 0 0 .323-.275C8.93 6.47 9 6.288 9 6c0-.287-.07-.47-.15-.59a.818.818 0 0 0-.324-.275 1.344 1.344 0 0 0-.555-.133 1.344 1.344 0 0 0-.498.133.817.817 0 0 0-.323.275C7.07 5.53 7 5.713 7 6H6c0-.462.117-.843.318-1.144.2-.3.462-.492.708-.616a2.343 2.343 0 0 1 .94-.24H8Z"
    />
  </svg>
);
export const icon = EuiIconQuestion;
