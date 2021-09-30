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

const EuiIconReturnKey = ({
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
    <path d="M11.994 4c1.059 0 1.924.818 2 1.856l.006.15v1.988a2.005 2.005 0 01-1.856 2L12 10H3.484l1.91 1.82a.52.52 0 010 .77.616.616 0 01-.829 0l-2.05-1.95a1.551 1.551 0 010-2.31l2.05-1.95a.617.617 0 01.83 0 .52.52 0 010 .77L3.45 9H12c.514-.003.935-.39.993-.888L13 7.994V6.006c0-.516-.388-.941-.888-1L11.994 5H9.5a.5.5 0 01-.09-.992L9.5 4h2.494z" />
  </svg>
);

export const icon = EuiIconReturnKey;
