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

const EuiIconNewChat = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 4a.5.5 0 01.5.5V6H10a.5.5 0 010 1H8.5v1.5a.5.5 0 01-1 0V7H6a.5.5 0 010-1h1.5V4.5A.5.5 0 018 4z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 4a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0115 4v5a2.5 2.5 0 01-2.5 2.5H7.707L4.5 14.707V11.5h-1A2.5 2.5 0 011 9V4zm2.5-1.5A1.5 1.5 0 002 4v5a1.5 1.5 0 001.5 1.5h2v1.793L7.293 10.5H12.5A1.5 1.5 0 0014 9V4a1.5 1.5 0 00-1.5-1.5h-9z"
    />
  </svg>
);

export const icon = EuiIconNewChat;
