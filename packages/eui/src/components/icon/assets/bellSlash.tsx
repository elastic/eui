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
const EuiIconBellSlash = ({
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
    <path d="m9.5 14-.005.15a2 2 0 0 1-3.972.153l-.018-.154L5.5 14h4Zm5.38-12.825a.5.5 0 0 1 .008.64l-.063.065-14 12a.5.5 0 0 1-.713-.695l.063-.065 14-12a.5.5 0 0 1 .705.055ZM13.036 5.51l.055.353.048.368c.066.554.103.98.145 1.724l.08 1.491c.146 2.371.402 3.053 1.136 3.053a.5.5 0 1 1 0 1c-.603 0-1.031-.146-1.34-.499H4.185l1.182-1h7.317c-.172-.644-.264-1.528-.33-2.708l-.09-1.638c-.033-.514-.066-.87-.118-1.304l-.011-.077.901-.763ZM7.5 0a2 2 0 0 1 1.98 1.717c.476.113.907.27 1.292.472l-.838.71a5.728 5.728 0 0 0-1.591-.36 1 1 0 1 0-1.684 0C4.455 2.75 3.26 3.78 2.95 5.671l-.05.334-.046.347c-.08.676-.115 1.161-.176 2.347l-.014.265-.005.09-1.058.897c.018-.234.035-.488.05-.763l.077-1.427c.038-.626.073-1.025.134-1.528.03-.25.063-.49.102-.724.334-2.04 1.546-3.313 3.555-3.792l.004-.019A2 2 0 0 1 7.5 0Z" />
  </svg>
);
export const icon = EuiIconBellSlash;
