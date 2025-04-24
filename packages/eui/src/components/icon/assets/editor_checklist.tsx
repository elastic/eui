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
const EuiIconEditorChecklist = ({
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
    <path d="M5.354 2.354 2.5 5.207.646 3.354l.708-.708L2.5 3.793l2.146-2.147.708.708ZM6 4h9V3H6v1Zm0 4.5h9v-1H6v1Zm9 4.5H6v-1h9v1ZM2.5 14.207l2.854-2.853-.708-.707L2.5 12.793l-1.146-1.146-.708.707L2.5 14.207Zm0-4.5 2.854-2.853-.708-.708L2.5 8.293 1.354 7.146l-.708.708L2.5 9.707Z" />
  </svg>
);
export const icon = EuiIconEditorChecklist;
