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
const EuiIconProductLens = ({
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
    <path d="M5 9H4V8h1zm2 0H6V6h1zm2 0H8V4h1z" />
    <path d="M6.5 1a5.5 5.5 0 0 1 4.729 8.308l3.421 2.933a1 1 0 0 1 .057 1.466l-1 1a1 1 0 0 1-1.466-.057l-2.933-3.42A5.5 5.5 0 1 1 6.5 1m4.139 9.12a6 6 0 0 1-.52.519L13 14l1-1zM6.5 2a4.5 4.5 0 1 0 .314 8.987q.036-.002.07-.006.311-.026.607-.092l.066-.016q.302-.072.588-.185l.039-.015q.292-.119.562-.275l.03-.017a4.5 4.5 0 0 0 1.605-1.605l.017-.03q.156-.27.275-.562l.018-.048q.11-.281.182-.58l.016-.065a4.5 4.5 0 0 0 .093-.61l.005-.067a5 5 0 0 0 .007-.545A4.5 4.5 0 0 0 6.5 2" />
  </svg>
);
export const icon = EuiIconProductLens;
