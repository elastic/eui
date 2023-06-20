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
const EuiIconSecuritySignalDetected = ({
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
      d="M13.657 3.05a.5.5 0 0 0-.707-.707l-.366.366A7 7 0 1 0 8 15a4.994 4.994 0 0 1-.597-1.03 6 6 0 1 1 4.471-10.552l-.71.71a5 5 0 1 0-4.08 8.788 5.027 5.027 0 0 1-.082-1.042A4.002 4.002 0 0 1 8 4a3.98 3.98 0 0 1 2.453.84l-.715.714a3 3 0 0 0-3.86 4.567.5.5 0 1 0 .708-.707 2 2 0 0 1 2.43-3.137l-.757.757a1 1 0 1 0 .707.707l1.155-1.155 2.46-2.46a5.972 5.972 0 0 1 1.39 3.277c.367.158.713.36 1.029.597 0-1.636-.57-3.271-1.71-4.584l.367-.366zM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 .5a.577.577 0 0 1-.57-.495l-.29-2.015a.867.867 0 1 1 1.718 0l-.288 2.015a.577.577 0 0 1-.57.495zm0 2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
);
export const icon = EuiIconSecuritySignalDetected;
