/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconArticle = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 10a.5.5 0 000 1h4a.5.5 0 000-1h-4zM8 6.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM3.5 2a.5.5 0 000 1h5a.5.5 0 000-1h-5zM8 8.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5zM3 12.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM7 6H3v5h4V6z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.526.312A1.002 1.002 0 0010.8 0H2a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V4.429c0-.256-.098-.503-.274-.689l-3.2-3.428zM10.5 5H14v10H2V1h8v3.5a.5.5 0 00.5.5z"
    />
  </svg>
);

export const icon = EuiIconArticle;
