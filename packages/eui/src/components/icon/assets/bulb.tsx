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
const EuiIconBulb = ({
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
      d="M8 2a4 4 0 0 1 4 4 3.98 3.98 0 0 1-1.1 2.752c-.608.638-.9 1.086-.9 1.487V14H6v-3.76c0-.402-.292-.85-.9-1.488A3.98 3.98 0 0 1 4 6a4 4 0 0 1 4-4ZM7 13h2v-1H7v1ZM8 3a3 3 0 0 0-3 3c0 .8.314 1.526.825 2.063C6.41 8.675 7 9.392 7 10.239V11h2v-.76c0-.848.59-1.564 1.175-2.178A2.98 2.98 0 0 0 11 6a3 3 0 0 0-3-3Z"
      clipRule="evenodd"
    />
    <path d="m3.923 8.929-1.733 1-.5-.867 1.733-1 .5.867Zm10.397.134-.5.866-1.732-1 .5-.867 1.731 1ZM3.005 6.495h-2v-1h2v1Zm12 0h-2v-1h2v1ZM3.928 3.063l-.501.866-1.732-1 .5-.866 1.733 1Zm10.387-.134-1.732 1-.5-.866 1.732-1 .5.866Z" />
  </svg>
);
export const icon = EuiIconBulb;
