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
const EuiIconMoney = ({
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
      d="M7 6a2 2 0 0 1 1.565 3.241c.364.134.66.32.892.552.247.247.385.511.46.734a1.666 1.666 0 0 1 .08.395l.002.043.001.018v.015S9.995 11 9 11h1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1h1c-.995 0-1-.002-1-.002v-.015l.001-.018a1.237 1.237 0 0 1 .013-.15c.011-.08.032-.178.069-.288a1.88 1.88 0 0 1 .46-.734c.232-.232.527-.418.89-.552A2 2 0 0 1 7 6Zm0 4c-2 0-2 1-2 1h4s0-1-2-1Zm0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M14 13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8ZM1 13h1a1 1 0 0 0-1-1v1Zm2-8a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h8a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3Zm10 7a1 1 0 0 0-1 1h1v-1ZM1 6a1 1 0 0 0 1-1H1v1Zm11-1a1 1 0 0 0 1 1V5h-1Z"
      clipRule="evenodd"
    />
    <path d="M15 3H1a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1V3Z" />
  </svg>
);
export const icon = EuiIconMoney;
