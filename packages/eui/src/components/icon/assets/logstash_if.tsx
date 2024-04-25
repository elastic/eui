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
const EuiIconLogstashIf = ({
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
    <path d="m6.918 9.799-4.82 4.819 2.88-.43.148.987L0 15.943l.768-5.126.988.148-.453 3.033 4.936-4.935a2.003 2.003 0 0 1 1.265-2.885V0h1v6.178a2.003 2.003 0 0 1 1.263 2.884l4.865 4.866-.443-2.963.988-.147.768 5.126-5.127-.769.15-.988 2.95.441-4.83-4.83c-.312.203-.685.32-1.085.32-.4 0-.773-.117-1.085-.32Z" />
  </svg>
);
export const icon = EuiIconLogstashIf;
