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
const EuiIconIf = ({
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
      d="M8.5 5.134c.074.043.144.096.207.159l2 2a1 1 0 0 1 0 1.414l-.647.647L13 12.293V11h1v3h-3v-1h1.293l-2.94-2.94-.646.647a1 1 0 0 1-1.414 0l-.647-.647L3.707 13H5v1H2v-3h1v1.293l2.94-2.94-.647-.646a1 1 0 0 1 0-1.414l2-2 .076-.068a.996.996 0 0 1 .131-.09V2h1v3.134ZM6 8l2 2 2-2-2-2-2 2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconIf;
