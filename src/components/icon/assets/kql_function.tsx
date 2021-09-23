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

const EuiIconKqlFunction = ({
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
    <path d="M7 7H3v2h4v2l3-3-3-3v2zM6 6V5a1 1 0 011.707-.707l3 3a1 1 0 010 1.414l-3 3A1 1 0 016 11v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h3zm7.5-3a.5.5 0 01.5.5v9a.5.5 0 11-1 0v-9a.5.5 0 01.5-.5z" />
  </svg>
);

export const icon = EuiIconKqlFunction;
