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
const EuiIconPinFilled = ({
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
    <path d="M9.618 1.076a1 1 0 0 1 1.09.217l4 4A1 1 0 0 1 14 7h-1.46l-.029.055a59.78 59.78 0 0 1-1.098 1.966c-.783 1.338-1.784 2.912-2.72 3.966l.66.66-.707.707-.996-.996-.005-.004L5.5 11.207 1.708 15H1v-.707L4.792 10.5 2.646 8.354l-.004-.005-.995-.995.707-.707.714.714L9 3.547V2a1 1 0 0 1 .618-.924Z" />
  </svg>
);
export const icon = EuiIconPinFilled;
