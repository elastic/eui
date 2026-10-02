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
const EuiIconCloudRain = ({
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
    <path d="m5.447 13.224-1 2-.894-.448 1-2zm3 0-1 2-.894-.448 1-2zm3 0-1 2-.894-.448 1-2zm-7-3-1 2-.894-.448 1-2zm3 0-1 2-.894-.448.925-1.848.075-.152zm3 0-1 2-.894-.448.925-1.848.075-.152zm3 0-.135.27-.865 1.73-.894-.448 1-2z" />
    <path d="M8 1a4 4 0 0 1 3.878 3.02 3.5 3.5 0 0 1 2.457 5.529l-.911-.455A2.5 2.5 0 0 0 11.5 5h-.03l-.251.016a2.5 2.5 0 0 0-1.487.716l-.707-.707a3.5 3.5 0 0 1 1.825-.963A3.001 3.001 0 0 0 5.038 5.48l.117.727-.718-.16A2 2 0 0 0 2 8c0 .563.233 1.07.606 1.432l-.46.922A2.99 2.99 0 0 1 1 8a3 3 0 0 1 3-3 4 4 0 0 1 4-4" />
  </svg>
);
export const icon = EuiIconCloudRain;
