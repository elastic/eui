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

const EuiIconIndexOpen = ({
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
    <path d="M12 2H2v11h6v1H1V1h12v6h-1V2zM5 5h5.999V4H5v1zM3 5V4h1v1H3zm2 3V7h3v1H5zM3 8V7h1v1H3zm2 3v-1h2v1H5zm5-1H8v1h2v2h1v-2h2v-1h-2V8h-1v2zm-7 1v-1h1v1H3zm7.5-5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
  </svg>
);

export const icon = EuiIconIndexOpen;
