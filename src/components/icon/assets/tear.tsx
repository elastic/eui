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

const EuiIconTear = ({
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
    <path d="M7.553 1.776a.5.5 0 01.894 0l4 8a.5.5 0 01.053.235c-.004.15-.026.396-.084.705a5.538 5.538 0 01-.505 1.512C11.189 13.638 9.906 14.5 8 14.5c-1.906 0-3.19-.862-3.91-2.272a5.538 5.538 0 01-.506-1.512 4.672 4.672 0 01-.084-.705.5.5 0 01.053-.235l4-8zm-3.046 8.329c.009.106.027.253.06.429.079.424.213.848.413 1.238C5.537 12.862 6.487 13.5 8 13.5c1.513 0 2.463-.638 3.02-1.728.2-.39.334-.814.413-1.238.033-.176.051-.323.06-.43L8 3.119l-3.493 6.987z" />
  </svg>
);

export const icon = EuiIconTear;
