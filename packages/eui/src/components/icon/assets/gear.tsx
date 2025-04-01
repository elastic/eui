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
const EuiIconGear = ({
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
    <path
      fillRule="evenodd"
      d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M7 0a1 1 0 0 0-1 1v.799a1.58 1.58 0 0 1-2.37 1.369l-.692-.4a1 1 0 0 0-1.366.366l-1 1.732a1 1 0 0 0 .366 1.366l.692.4a1.58 1.58 0 0 1 0 2.737l-.692.4a1 1 0 0 0-.366 1.365l1 1.732a1 1 0 0 0 1.366.366l.692-.4A1.58 1.58 0 0 1 6 14.203V15a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.799a1.58 1.58 0 0 1 2.37-1.368l.692.4a1 1 0 0 0 1.366-.367l1-1.732a1 1 0 0 0-.366-1.366l-.692-.4a1.58 1.58 0 0 1 0-2.736l.692-.4a1 1 0 0 0 .366-1.366l-1-1.732a1 1 0 0 0-1.366-.366l-.692.4A1.58 1.58 0 0 1 10 1.799V1a1 1 0 0 0-1-1H7Zm0 1.799V1h2v.8a2.58 2.58 0 0 0 3.87 2.234l.692-.4 1 1.732-.692.4a2.58 2.58 0 0 0 0 4.469l.692.4-1 1.731-.692-.4A2.58 2.58 0 0 0 9 14.202V15H7v-.799a2.58 2.58 0 0 0-3.87-2.234l-.692.4-1-1.733.692-.4a2.58 2.58 0 0 0 0-4.468l-.692-.4 1-1.732.692.4A2.58 2.58 0 0 0 7 1.799Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconGear;
