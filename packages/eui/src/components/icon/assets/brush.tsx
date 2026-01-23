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
const EuiIconBrush = ({
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
      d="M8 1a2 2 0 0 1 2 2v2h2a1 1 0 0 1 1 1v6.5c0 .663-.326 1.283-.771 1.729-.446.445-1.066.771-1.729.771H1v-1h.5c.337 0 .717-.174 1.021-.479.305-.304.479-.684.479-1.021V6a1 1 0 0 1 1-1h2V3a2 2 0 0 1 2-2ZM4 12.5c0 .556-.231 1.082-.568 1.5H4.5c.337 0 .717-.174 1.021-.479.305-.304.479-.684.479-1.021V11h1v1.5c0 .556-.231 1.082-.568 1.5H7.5c.337 0 .717-.174 1.021-.479.305-.304.479-.684.479-1.021V11h1v1.5c0 .556-.231 1.082-.568 1.5H10.5c.337 0 .717-.174 1.021-.479.305-.304.479-.684.479-1.021V10H4v2.5ZM4 9h8V8H4v1Zm4-7a1 1 0 0 0-1 1v3H4v1h8V6H9V3a1 1 0 0 0-1-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconBrush;
