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
const EuiIconString = ({
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
      d="M9.297 3 8.93 5.102h1.351l-.32 1.828H8.609l-.656 3.883c-.036.265-.02.466.05.601.071.135.247.208.528.219.11.005.334-.008.672-.04L9.016 13.5a4.16 4.16 0 0 1-1.383.195c-.797-.01-1.393-.244-1.79-.703-.395-.458-.557-1.08-.484-1.867l.688-4.195H5l.313-1.828h1.046L6.727 3h2.57z"
    />
  </svg>
);
export const icon = EuiIconString;
