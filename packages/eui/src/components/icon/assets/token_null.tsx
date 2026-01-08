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
const EuiIconTokenNull = ({
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
    <path d="m5.002 12.412-.962.962a1 1 0 0 1-1.414-1.414l.962-.962a5.333 5.333 0 0 1 7.41-7.41l.962-.962a1 1 0 1 1 1.414 1.414l-.962.962a5.333 5.333 0 0 1-7.41 7.41Zm.966-.966a4 4 0 0 0 5.478-5.478l-5.478 5.478Zm-1.414-1.414 5.478-5.478a4 4 0 0 0-5.478 5.478Z" />
  </svg>
);
export const icon = EuiIconTokenNull;
