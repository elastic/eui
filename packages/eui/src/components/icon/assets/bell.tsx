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
const EuiIconBell = ({
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
      d="M2.316 12h10.368c-.188-.704-.28-1.691-.348-3.037-.07-1.382-.103-1.888-.19-2.612-.028-.236-.06-.462-.096-.68-.31-1.892-1.506-2.923-3.708-3.131a1 1 0 1 0-1.684 0c-2.202.208-3.397 1.24-3.708 3.13a16.01 16.01 0 0 0-.096.68c-.087.725-.12 1.23-.19 2.613-.068 1.346-.16 2.333-.348 3.037Zm10.843 1H1.84c-.308.353-.737.5-1.341.5a.5.5 0 1 1 0-1c.786 0 1.024-.783 1.166-3.587.07-1.407.105-1.926.196-2.681.03-.25.063-.49.102-.724.334-2.041 1.546-3.313 3.556-3.792a2 2 0 0 1 3.96 0c2.01.479 3.222 1.75 3.557 3.792a17 17 0 0 1 .102.724c.09.755.125 1.274.196 2.681.14 2.804.379 3.587 1.165 3.587a.5.5 0 1 1 0 1c-.604 0-1.033-.147-1.341-.5ZM5.5 14h4a2 2 0 1 1-4 0Z"
    />
  </svg>
);
export const icon = EuiIconBell;
