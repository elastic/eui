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
const EuiIconAddToChat = ({
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
    <path d="M14 13h2v1h-2v2h-1v-2h-2v-1h2v-2h1z" />
    <path d="M9.389 1c.4 0 .783.116 1.078.328.294.212.533.55.533.972V3h1a3 3 0 0 1 3 3v1h1v2h-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5v1H4a3 3 0 0 1-3-3v-2H0V7h1V6a3 3 0 0 1 3-3h1v-.7c0-.423.239-.76.533-.972A1.85 1.85 0 0 1 6.611 1zM6 10H5V7h1zm5 0h-1V7h1zM6 3h4V2H6z" />
  </svg>
);
export const icon = EuiIconAddToChat;
