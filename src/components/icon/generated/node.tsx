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

const EuiIconNode = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 1.443a1 1 0 00-1 0L2.572 4.29a1 1 0 00-.5.866v5.69a1 1 0 00.5.866L7.5 14.557a1 1 0 001 0l4.928-2.846a1 1 0 00.5-.866v-5.69a1 1 0 00-.5-.866L8.5 1.443zM9 .577l4.928 2.846a2 2 0 011 1.732v5.69a2 2 0 01-1 1.732L9 15.423a2 2 0 01-2 0l-4.928-2.846a2 2 0 01-1-1.732v-5.69a2 2 0 011-1.732L7 .577a2 2 0 012 0z" />
  </svg>
);

export const icon = EuiIconNode;
