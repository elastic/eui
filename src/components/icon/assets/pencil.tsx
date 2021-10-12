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

const EuiIconPencil = ({
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
    <path d="M12.148 3.148L11 2l-9 9v3h3l9-9-1.144-1.144-8.002 7.998a.502.502 0 01-.708 0 .502.502 0 010-.708l8.002-7.998zM11 1c.256 0 .512.098.707.293l3 3a.999.999 0 010 1.414l-9 9A.997.997 0 015 15H2a1 1 0 01-1-1v-3c0-.265.105-.52.293-.707l9-9A.997.997 0 0111 1zM5 14H2v-3l3 3z" />
  </svg>
);

export const icon = EuiIconPencil;
