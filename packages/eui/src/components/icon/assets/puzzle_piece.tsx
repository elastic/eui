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
const EuiIconPuzzlePiece = ({
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
    <path d="M9 2.5a1.5 1.5 0 1 0-2.8.75l.435.75H3v2.05a2.5 2.5 0 1 1 0 4.9V13h9V9.365l.75.435a1.5 1.5 0 1 0 0-2.6l-.75.435V4H8.365l.435-.75c.127-.22.2-.476.2-.75m1 0q0 .257-.05.5H12a1 1 0 0 1 1 1v2.05a2.5 2.5 0 1 1 0 4.9V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.365l.75.435a1.5 1.5 0 1 0 0-2.6L2 7.635V4a1 1 0 0 1 1-1h2.05A2.5 2.5 0 1 1 10 2.5" />
  </svg>
);
export const icon = EuiIconPuzzlePiece;
