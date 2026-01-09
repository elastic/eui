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
const EuiIconContrast = ({
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
      d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1a6 6 0 1 0 0 12V2Zm1 11.707v.209a6.002 6.002 0 0 0 4.951-5.161L9 13.707Zm0-3v1.586l4.96-4.962a5.956 5.956 0 0 0-.29-1.295L9 10.707Zm0-3v1.586l4.23-4.231a6.015 6.015 0 0 0-.649-.937L9 7.707Zm0-3v1.586l2.873-2.874a6.012 6.012 0 0 0-.934-.651L9 4.707Zm0-1.414.963-.964A5.956 5.956 0 0 0 9 2.083v1.21Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconContrast;
