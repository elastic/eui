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
const EuiIconSection = ({
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
    <path d="M2 2v12h12V2H2Zm13 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12Z" />
    <path d="M9 6v6h3V6H9Zm4 6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6Zm0-9v1H5V3h8ZM4 6v1h2V6H4Zm3 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2l.103.005A1 1 0 0 1 7 6v1Zm-3 3v2h2v-2H4Zm3 2a1 1 0 0 1-1 1H4a1 1 0 0 1-.995-.898L3 12v-2a1 1 0 0 1 1-1h2l.103.005A1 1 0 0 1 7 10v2ZM4 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
  </svg>
);
export const icon = EuiIconSection;
