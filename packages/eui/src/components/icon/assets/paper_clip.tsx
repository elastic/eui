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
const EuiIconPaperClip = ({
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
    <path d="M7 11c0 .423.105.648.229.771.123.124.348.229.771.229.423 0 .648-.105.771-.229.124-.123.229-.348.229-.771V5h1v6c0 .577-.145 1.102-.521 1.479C9.102 12.854 8.577 13 8 13c-.577 0-1.102-.145-1.479-.521C6.145 12.101 6 11.577 6 11V4c0-.719.215-1.468.716-2.046C7.226 1.364 7.996 1 9 1c1.005 0 1.773.365 2.284.954.5.578.716 1.327.716 2.046v7c0 1.103-.345 2.11-1.043 2.845C10.255 14.583 9.242 15 8 15c-1.242 0-2.255-.417-2.957-1.155C4.345 13.11 4 12.103 4 11V4h1v7c0 .897.279 1.64.768 2.155C6.253 13.666 6.99 14 8 14c1.01 0 1.747-.334 2.232-.845.49-.515.768-1.258.768-2.155V4c0-.531-.16-1.032-.472-1.392C10.227 2.26 9.745 2 9 2s-1.227.26-1.528.608C7.16 2.968 7 3.47 7 4v7Z" />
  </svg>
);
export const icon = EuiIconPaperClip;
