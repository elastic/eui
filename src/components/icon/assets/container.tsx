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

const EuiIconContainer = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.5A.5.5 0 01.5 2h15a.5.5 0 010 1H15v10h.5a.5.5 0 010 1H.5a.5.5 0 010-1H1V3H.5a.5.5 0 01-.5-.5zM2 3h12v10H2V3zm3 2a.5.5 0 00-.5.5v5a.5.5 0 001 0v-5A.5.5 0 005 5zm5.5.5a.5.5 0 011 0v5a.5.5 0 01-1 0v-5zM8 5a.5.5 0 00-.5.5v5a.5.5 0 001 0v-5A.5.5 0 008 5z"
    />
  </svg>
);

export const icon = EuiIconContainer;
