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

const EuiIconIndexTemporary = ({
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
    <path d="M3 13V2h11V1H2v13h2v-1H3z" />
    <path d="M11.999 5H6V4h5.999v1zM4 4v1h1V4H4zm2 3v1h4V7H6zM4 7v1h1V7H4zm2 3v1h2v-1H6zm-2 0v1h1v-1H4zm10-7h-1v1h1V3zm-1 2h1v1h-1V5zm1 2h-1v1h1V7zm-1 2h1v1h-1V9zm1 2h-1v1h1v-1zm-1 2h1v1h-1v-1zm-7 0H5v1h1v-1zm1 0h1v1H7v-1zm3 0H9v1h1v-1zm1 0h1v1h-1v-1z" />
  </svg>
);

export const icon = EuiIconIndexTemporary;
