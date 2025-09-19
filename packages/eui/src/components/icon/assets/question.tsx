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
const EuiIconQuestion = ({
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
    <path d="M8 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-6a2 2 0 0 1 1.237 3.571 3.59 3.59 0 0 0-.548.505c-.137.169-.189.305-.189.424V9h-1v-.5c0-.433.195-.787.413-1.055.216-.265.487-.487.705-.659a1 1 0 1 0-1.562-.453l-.942.334A2 2 0 0 1 8 4Z" />
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" />
  </svg>
);
export const icon = EuiIconQuestion;
