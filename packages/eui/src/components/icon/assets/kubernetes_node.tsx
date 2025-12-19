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
const EuiIconKubernetesNode = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M14 11.42V4.58L8 1.152 2 4.58v6.84l6 3.428 6-3.428zM8 16l7-4V4L8 0 1 4v8l7 4zM8 4.607l3 1.714V9.68l-3 1.714-3-1.714V6.32l3-1.714zm4 1.134v4.518l-4 2.286-4-2.286V5.741l4-2.286 4 2.286z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconKubernetesNode;
