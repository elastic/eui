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
const EuiIconBeaker = ({
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
    <path d="M5.277 10.088c.02.014.04.03.057.047.582.55 1.134.812 1.666.812.586 0 1.84-.293 3.713-.88L9 6.212V2H7v4.212l-1.723 3.876Zm-.438.987L3.539 14h8.922l-1.32-2.969C9.096 11.677 7.733 12 7 12c-.74 0-1.463-.315-2.161-.925ZM6 2H5V1h6v1h-1v4l3.375 7.594A1 1 0 0 1 12.461 15H3.54a1 1 0 0 1-.914-1.406L6 6V2Z" />
  </svg>
);
export const icon = EuiIconBeaker;
