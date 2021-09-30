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

const EuiIconLogoBeats = ({
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
    <path
      fill="#0080D5"
      d="M15 20H4V0h11c5.522 0 10 4.478 10 10s-4.478 10-10 10"
    />
    <path
      fill="#00C2B3"
      d="M26.702 15.624C24.6 19.979 20.152 23 15 23H4v9h15c5.522 0 10-4.478 10-10a9.952 9.952 0 00-2.298-6.376"
    />
    <path
      className="euiIcon__fillNegative"
      d="M24.338 13.554A9.942 9.942 0 0019 12H4v8h11c4.27 0 7.903-2.68 9.338-6.446"
    />
  </svg>
);

export const icon = EuiIconLogoBeats;
