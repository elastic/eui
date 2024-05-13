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

const EuiIconAlert = ({
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
    <path d="M8.55 9.502l.35-3.507a.905.905 0 10-1.8 0l.35 3.507a.552.552 0 001.1 0zM9 12a1 1 0 11-2 0 1 1 0 012 0z" />
    <path d="M8.864 1.496a1 1 0 00-1.728 0l-7 12A1 1 0 001 15h14a1 1 0 00.864-1.504l-7-12zM1 14L8 2l7 12H1z" />
  </svg>
);

export const icon = EuiIconAlert;
