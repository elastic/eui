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
const EuiIconTokenGeo = ({
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
      d="M8 3c1.636 0 3.088.785 4 2 .628.836 1 1.875 1 3a4.978 4.978 0 0 1-.999 3H12a4.992 4.992 0 0 1-4 2 4.992 4.992 0 0 1-4-1.999V11a5 5 0 0 1 4-8Zm.948 8H7.052c.277.626.623 1 .948 1 .325 0 .67-.374.948-1ZM6 11l-.645.001c.274.242.581.446.914.606A5.445 5.445 0 0 1 6 11.001Zm4.645.001H10a5.51 5.51 0 0 1-.269.606c.333-.16.64-.364.914-.606Zm-5.133-2.5H4.031c.068.54.243 1.048.505 1.5h1.172a9.186 9.186 0 0 1-.196-1.5Zm3.975 0H6.513c.03.544.104 1.05.21 1.5h2.553c.107-.45.182-.956.21-1.5Zm2.482 0h-1.481a9.186 9.186 0 0 1-.196 1.5h1.172c.262-.452.437-.96.505-1.5ZM5.708 6 4.535 6c-.261.452-.437.96-.504 1.5h1.481A9.187 9.187 0 0 1 5.708 6Zm3.568 0H6.724c-.107.449-.182.955-.21 1.499h2.973a8.479 8.479 0 0 0-.21-1.5ZM11.465 6h-1.173c.102.467.17.972.196 1.5h1.481a3.974 3.974 0 0 0-.504-1.5ZM6.269 4.393l-.124.062c-.286.15-.551.333-.79.545H6a5.51 5.51 0 0 1 .269-.607ZM8 4c-.326 0-.671.375-.948 1h1.896C8.671 4.376 8.326 4 8 4Zm1.73.393.038.071c.083.168.161.347.232.536h.646a4.006 4.006 0 0 0-.915-.607Z"
    />
  </svg>
);
export const icon = EuiIconTokenGeo;
