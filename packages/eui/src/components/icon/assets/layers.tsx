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
const EuiIconLayers = ({
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
      d="M1.553 4.106a1 1 0 0 0 0 1.788l6 3a1 1 0 0 0 .894 0l6-3a1 1 0 0 0 0-1.788l-6-3a1 1 0 0 0-.894 0l-6 3ZM14 5 8 8 2 5l6-3 6 3Z"
      clipRule="evenodd"
    />
    <path d="m8 11 6.894-3.447S15 7.843 15 8a1 1 0 0 1-.553.895l-6 3a1 1 0 0 1-.894 0l-6-3A1 1 0 0 1 1 8c0-.158.106-.447.106-.447L8 11Z" />
    <path d="m8 14 6.894-3.447s.106.29.106.447a1 1 0 0 1-.553.895l-6 3a1 1 0 0 1-.894 0l-6-3A1 1 0 0 1 1 11c0-.158.106-.447.106-.447L8 14Z" />
  </svg>
);
export const icon = EuiIconLayers;
