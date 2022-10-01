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

const EuiIconFilterIgnore = ({
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
    <path d="M.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zM2 4.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm2 3a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zM16 11.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4.5-.707L9.854 9.146a.5.5 0 10-.708.708l1.647 1.646-1.647 1.646a.5.5 0 00.708.708l1.646-1.647 1.646 1.647a.5.5 0 00.708-.708L12.207 11.5l1.647-1.646a.5.5 0 00-.708-.708L11.5 10.793z" />
  </svg>
);

export const icon = EuiIconFilterIgnore;
