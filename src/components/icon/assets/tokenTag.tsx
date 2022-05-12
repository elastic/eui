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

const EuiIconTokenTag = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10 8a1 1 0 11-2 0 1 1 0 012 0z" />
    <path
      fillRule="evenodd"
      d="M4 4a1 1 0 00-1 1v6a1 1 0 001 1h6.989a1 1 0 00.825-.436l2.05-3a1 1 0 000-1.128l-2.05-3A1 1 0 0010.99 4H4zm.75 1.25a.5.5 0 00-.5.5v4.5a.5.5 0 00.5.5h5.745a.5.5 0 00.405-.206l1.636-2.25a.5.5 0 000-.588L10.9 5.456a.5.5 0 00-.405-.206H4.75z"
    />
  </svg>
);

export const icon = EuiIconTokenTag;
