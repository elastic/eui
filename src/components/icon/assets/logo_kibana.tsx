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

const EuiIconLogoKibana = ({
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
      <path fill="#F04E98" d="M4 0v28.789L28.935.017z" />
      <path
        className="euiIcon__fillNegative"
        d="M4 12v16.789l11.906-13.738A24.721 24.721 0 004 12"
      />
      <path
        fill="#00BFB3"
        d="M18.479 16.664L6.268 30.754l-1.073 1.237h23.191c-1.252-6.292-4.883-11.719-9.908-15.327"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoKibana;
