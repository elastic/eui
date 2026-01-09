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
const EuiIconCloud = ({
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
    <path d="M4 7a4 4 0 0 1 7.878-.98A3.5 3.5 0 0 1 11.5 13H4a3 3 0 1 1 0-6Zm1 0c0 .164.013.324.038.48l.117.727-.718-.16A2 2 0 1 0 4 12h7.5a2.5 2.5 0 0 0 0-4.999h-.03l-.251.016a2.49 2.49 0 0 0-1.487.716l-.707-.707a3.493 3.493 0 0 1 1.825-.963A3.001 3.001 0 0 0 5 7Z" />
  </svg>
);
export const icon = EuiIconCloud;
