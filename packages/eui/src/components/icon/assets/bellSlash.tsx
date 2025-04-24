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
const EuiIconBellSlash = ({
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
    <path d="M10.93 2.948a4.973 4.973 0 0 0-2.43-.923V0h-1v2.025A5 5 0 0 0 3 7v2.5c0 .605-.096 1.146-.237 1.616L3.99 9.89A6.7 6.7 0 0 0 4 9.5V7a4 4 0 0 1 6.212-3.333l.719-.719ZM.647 14.647l.707.707L11.55 5.156l.734-.734 3.069-3.068-.707-.707-14 14Z" />
    <path
      fillRule="evenodd"
      d="m12.734 5.387-.814.814c.053.258.08.526.08.799v2.5a6.618 6.618 0 0 0 1 3.5H5.121l-1 1H6a2 2 0 1 0 4 0h5v-1h-.775a5.282 5.282 0 0 1-.536-.802A5.617 5.617 0 0 1 13 9.5V7c0-.564-.094-1.107-.266-1.613ZM7 14a1 1 0 1 0 2 0H7Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconBellSlash;
