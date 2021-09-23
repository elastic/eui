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

const EuiIconFaceNeutral = ({
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
    <g fill="#13252D" fillRule="evenodd">
      <circle cx={5} cy={5} r={1} />
      <circle cx={10} cy={5} r={1} />
      <path
        fillRule="nonzero"
        d="M7.5 14a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0 1a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
      />
      <path fillRule="nonzero" d="M3 10h9a.5.5 0 100-1H3a.5.5 0 000 1z" />
    </g>
  </svg>
);

export const icon = EuiIconFaceNeutral;
