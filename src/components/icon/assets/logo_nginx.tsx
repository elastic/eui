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

const EuiIconLogoNginx = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path fill="#119639" d="M16 0l13.856 8v16L16 32 2.144 24V8z" />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M11.17 13.512v8.376a1.607 1.607 0 11-3.215 0V9.632c0-1.432 1.731-2.149 2.744-1.136l9.51 9.512V9.632a1.607 1.607 0 013.215 0v12.256c0 1.432-1.731 2.149-2.744 1.136l-9.51-9.512z"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoNginx;
