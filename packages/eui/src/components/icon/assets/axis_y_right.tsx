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
const EuiIconAxisYRight = ({
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
    <path d="M3 15H1v-1h2v1Zm3 0H4v-1h2v1Zm3 0H7v-1h2v1Zm3 0h-2v-1h2v1Zm4-13h-1v12h1v1h-3v-1h1V2h-1V1h3v1ZM7 4v1h-.433L8 6.719 9.433 5H9V4h2.5v1h-.766L8.5 7.68V10h1v1h-3v-1h1V7.68L5.266 5H4.5V4H7Z" />
  </svg>
);
export const icon = EuiIconAxisYRight;
