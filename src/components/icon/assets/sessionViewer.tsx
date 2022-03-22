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

const EuiIconSessionViewer = ({
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
    <path
      fillRule="evenodd"
      d="M14.125 2.75H1.875v10.5h12.25V2.75zm-12.25-.875A.875.875 0 001 2.75v10.5c0 .483.392.875.875.875h12.25A.875.875 0 0015 13.25V2.75a.875.875 0 00-.875-.875H1.875z"
      clipRule="evenodd"
    />
    <path d="M1.875 2.75h12.25V4.5H1.875zm4.375 7.875h3.5v.875h-3.5zM3.625 6.25H4.5v.875h-.875zm.875.875h.875V8H4.5zM5.375 8h.875v.875h-.875zm-.875.875h.875v.875H4.5zm-.875.875H4.5v.875h-.875z" />
  </svg>
);

export const icon = EuiIconSessionViewer;
