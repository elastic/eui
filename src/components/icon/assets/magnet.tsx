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
const EuiIconMagnet = ({
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
    <path d="M4.552 10.71a3.008 3.008 0 0 0 4.19.738l1.642-1.15 1.15 1.642-1.643 1.15a5.013 5.013 0 1 1-5.75-8.212l1.642-1.15 1.15 1.643-1.642 1.15a3.007 3.007 0 0 0-.739 4.189Zm8.296-2.137 1.15 1.643-1.643 1.149-1.15-1.642 1.643-1.15Zm-4.6-6.571 1.15 1.643-1.643 1.15-1.15-1.642 1.642-1.151Zm1.97 1.068L9.07 1.428a1.003 1.003 0 0 0-1.397-.246L3.566 4.057A5.995 5.995 0 0 0 1.092 7.94a5.993 5.993 0 0 0 .996 4.495 5.99 5.99 0 0 0 3.883 2.473 5.991 5.991 0 0 0 4.495-.996l4.107-2.875c.454-.318.563-.943.246-1.396l-1.15-1.643a1.002 1.002 0 0 0-1.396-.246l-4.107 2.875a2.002 2.002 0 0 1-1.498.332 2 2 0 0 1-1.627-2.323c.09-.505.371-.976.824-1.294l4.107-2.876c.454-.317.564-.942.246-1.396Z" />
  </svg>
);
export const icon = EuiIconMagnet;
