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
const EuiIconTokenAnnotation = ({
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
      d="M8.15 3.392c2.797 0 4.524 1.644 4.517 4.289.007 1.816-.708 2.893-2.21 3.004-.908.076-1.081-.287-1.157-.725h-.041c-.163.42-.964.732-1.744.683-1.053-.065-2.082-.842-2.09-2.572.008-1.72 1.071-2.441 1.959-2.586.804-.135 1.598.158 1.723.462h.051v-.386h1.195v3.452c.007.3.128.425.304.425.4 0 .677-.583.673-1.861.004-2.376-1.705-2.914-3.187-2.914-2.34 0-3.415 1.522-3.422 3.387.007 2.127 1.22 3.277 3.433 3.277.808 0 1.598-.176 2.006-.349l.393 1.122c-.435.27-1.419.508-2.493.508-2.98 0-4.723-1.66-4.727-4.496.004-2.804 1.748-4.72 4.817-4.72ZM7.964 6.79c-.76 0-1.185.459-1.188 1.24.003.683.3 1.332 1.202 1.332.821 0 1.094-.473 1.077-1.343-.004-.718-.204-1.23-1.091-1.23Z"
    />
  </svg>
);
export const icon = EuiIconTokenAnnotation;
