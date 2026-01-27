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
const EuiIconIndexSettings = ({
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
    <path d="M3 6h2v1H3V6Zm3 0h2v1H6V6ZM3 9h2v1H3V9Zm0 3h2v1H3v-1Zm9.37-3.892a3.496 3.496 0 0 1 1.629.944l1.149-.235.5.867-.778.875a3.498 3.498 0 0 1 0 1.881l.778.877-.5.867-1.149-.236c-.44.45-1 .782-1.63.943L12 16h-1l-.37-1.11A3.494 3.494 0 0 1 9 13.949l-1.146.236-.5-.867.775-.876a3.502 3.502 0 0 1 0-1.883l-.775-.874.5-.867L9 9.051c.44-.45 1-.782 1.63-.943L11 7h1l.37 1.108ZM11.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
    <path
      fillRule="evenodd"
      d="M14 1a1 1 0 0 1 1 1v5.826l-.053.012-.658.134a4.53 4.53 0 0 0-.289-.21V5H2v9h4.593l.577 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 4h12V2H2v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconIndexSettings;
