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
const EuiIconMegaphone = ({
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
    <path d="M5 9H3V8h2v1Zm0-2H3V6h2v1Z" />
    <path
      fillRule="evenodd"
      d="M12.553 1.105A1 1 0 0 1 14 2v3.5a2 2 0 1 1 0 4V13a1 1 0 0 1-1.474.88l-.012-.006-.037-.02-.138-.074a173.09 173.09 0 0 0-2.173-1.141C8.954 12.013 7.607 11.342 6.798 11H6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.036A3.5 3.5 0 0 1 3.5 4h3.264l5.789-2.894ZM4 14h1v-3H4v3Zm3-9v5c1.667.667 6 3 6 3V2L7 5ZM3.5 5a2.5 2.5 0 0 0 0 5H6V5H3.5ZM14 8.5a1 1 0 1 0 0-2v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconMegaphone;
