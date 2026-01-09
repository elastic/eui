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
const EuiIconPartial = ({
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
      d="M9 15H8A7 7 0 1 1 8 1h1v14ZM8 2a6 6 0 1 0 0 12V2Z"
      clipRule="evenodd"
    />
    <path d="M12.262 13.554a6.994 6.994 0 0 1-1.582.915l-.383-.924a5.99 5.99 0 0 0 1.355-.784l.61.793Zm2.207-2.874a7.008 7.008 0 0 1-.915 1.582l-.793-.61a5.99 5.99 0 0 0 .784-1.355l.924.383Zm.471-3.594a7.056 7.056 0 0 1 0 1.828l-.495-.065-.496-.065a6.051 6.051 0 0 0 0-1.568l.496-.065.495-.065Zm-1.386-3.348c.37.482.679 1.013.915 1.582l-.924.383a5.992 5.992 0 0 0-.784-1.355l.793-.61ZM10.68 1.531c.569.236 1.1.545 1.582.915l-.61.793a5.991 5.991 0 0 0-1.355-.784l.383-.924Z" />
  </svg>
);
export const icon = EuiIconPartial;
