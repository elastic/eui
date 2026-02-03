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
const EuiIconSend = ({
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
      d="M14.707 1.293a1 1 0 0 1 .25.994l-3 10a1 1 0 0 1-1.664.42L7.146 9.561l-1.792 1.793-.708-.707L6.44 8.854 3.293 5.707a1 1 0 0 1 .42-1.665l10-3a1 1 0 0 1 .994.25ZM11 12 7.854 8.854l4.5-4.5-.707-.708-4.5 4.5L4 5l10-3-3 10Z"
      clipRule="evenodd"
    />
    <path d="m3.646 8.646-3 3 .708.708 3-3-.708-.708Zm-3 6 3-3 .708.708-3 3-.708-.707Zm6-3-3 3 .708.708 3-3-.708-.707Z" />
  </svg>
);
export const icon = EuiIconSend;
