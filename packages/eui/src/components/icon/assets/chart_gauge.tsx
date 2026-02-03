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
const EuiIconChartGauge = ({
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
    <path d="M8 2c1.315 0 2.63.37 3.778 1.107l-.725.726A5.99 5.99 0 0 0 8 3a5.98 5.98 0 0 0-4.242 1.758A5.98 5.98 0 0 0 2 9a5.98 5.98 0 0 0 1.758 4.242l-.708.708A6.98 6.98 0 0 1 1 9a6.98 6.98 0 0 1 2.05-4.95A6.98 6.98 0 0 1 8 2Zm5.892 3.222A6.987 6.987 0 0 1 15 9a6.98 6.98 0 0 1-2.05 4.95l-.708-.708A5.98 5.98 0 0 0 14 9a5.99 5.99 0 0 0-.834-3.053l.726-.725Z" />
    <path d="M4.465 11.828a.5.5 0 1 1 .707.707.5.5 0 0 1-.707-.707Zm6.363 0a.5.5 0 1 1 .707.708.5.5 0 0 1-.707-.708Z" />
    <path
      fillRule="evenodd"
      d="M13.35 4.35 9.719 7.98a2 2 0 0 1-2.738 2.738l-.63.632-.7-.7.631-.631A2 2 0 0 1 9.018 7.28l3.632-3.63.7.699ZM8 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path d="M3.5 8.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm9 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM4.465 5.465a.5.5 0 1 1 .707.707.5.5 0 0 1-.707-.707ZM8 4a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z" />
  </svg>
);
export const icon = EuiIconChartGauge;
