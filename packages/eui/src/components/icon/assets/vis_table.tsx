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
const EuiIconVisTable = ({
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
    <path d="M5 6H3v1h2V6Zm1 0h2v1H6V6ZM5 9H3v1h2V9Zm1 0h2v1H6V9Zm-1 3H3v1h2v-1Zm1 0h2v1H6v-1Zm7-6H9v1h4V6ZM9 9h4v1H9V9Zm4 3H9v1h4v-1Z" />
    <path
      fillRule="evenodd"
      d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2Zm0 3V2h12v2H2Zm0 1h12v9H2V5Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconVisTable;
