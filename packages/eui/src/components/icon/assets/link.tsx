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
const EuiIconLink = ({
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
    <path d="M2.586 2.586a2 2 0 0 1 2.828 0l1.503 1.498c.359.36.553.822.582 1.293l.901.902a3.003 3.003 0 0 0-.776-2.902L6.12 1.878a3 3 0 0 0-4.243 4.243l1.498 1.502a3.005 3.005 0 0 0 2.902.777l-.901-.902a1.996 1.996 0 0 1-1.293-.582L2.586 5.414a2 2 0 0 1 0-2.828Z" />
    <path d="m6.518 7.225.722.722.812.812.723.723 1.871 1.872.708-.707-6-6-.708.707 1.872 1.871Z" />
    <path d="M8.377 12.624A3.005 3.005 0 0 1 7.6 9.721l.902.902c.028.471.222.934.581 1.293l1.502 1.498a2 2 0 0 0 2.83-2.828l-1.498-1.502a1.996 1.996 0 0 0-1.294-.582L9.721 7.6a3.005 3.005 0 0 1 2.903.777l1.497 1.502a3 3 0 0 1-4.242 4.243l-1.502-1.498Z" />
  </svg>
);
export const icon = EuiIconLink;
