/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconReadOnly = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g
      style={{
        mixBlendMode: 'multiply',
      }}
    >
      <path
        fillRule="evenodd"
        d="M6 1a1 1 0 0 0-1 1v3.027a4.655 4.655 0 0 1 1 0V2h4v3a1 1 0 0 0 1 1h3v8H6v-.027a4.666 4.666 0 0 1-1 0V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.293L10.707 1H6Zm7.293 4L11 2.707V5h2.293Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M5.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 9.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="m9.5 9.5.447-.224v-.001l-.002-.003-.005-.009-.015-.03a7.348 7.348 0 0 0-.277-.47 8.1 8.1 0 0 0-.842-1.1C8.082 6.871 6.957 6 5.5 6s-2.581.872-3.306 1.662a8.102 8.102 0 0 0-1.119 1.57l-.015.031-.005.009-.001.003s-.001.001.446.225l-.447-.224a.502.502 0 0 0 0 .448L1.5 9.5l-.447.224v.001l.002.003.005.009.015.03.058.106a8.104 8.104 0 0 0 1.06 1.465C2.92 12.128 4.044 13 5.501 13c1.457 0 2.582-.872 3.306-1.662a8.103 8.103 0 0 0 1.119-1.57l.015-.031.005-.009.001-.003c.001 0 .001-.001-.446-.225Zm-7.428 0a7.096 7.096 0 0 0 .86 1.162C3.581 11.372 4.456 12 5.5 12c1.043 0 1.919-.628 2.569-1.338A7.096 7.096 0 0 0 8.928 9.5a7.101 7.101 0 0 0-.859-1.162C7.419 7.628 6.543 7 5.5 7s-1.918.628-2.569 1.338A7.101 7.101 0 0 0 2.072 9.5Z"
        clipRule="evenodd"
      />
      <path d="m9.5 9.5.447.224a.502.502 0 0 0 0-.448L9.5 9.5Z" />
    </g>
  </svg>
);
export const icon = EuiIconReadOnly;
