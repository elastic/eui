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
const EuiIconArticle = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM8 6.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM3.5 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM8 8.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM3 12.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5ZM7 6H3v5h4V6Z" />
    <path
      fillRule="evenodd"
      d="M11.526.312A1.002 1.002 0 0 0 10.8 0H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4.429c0-.256-.098-.503-.274-.689l-3.2-3.428ZM10.5 5H14v10H2V1h8v3.5a.5.5 0 0 0 .5.5Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconArticle;
