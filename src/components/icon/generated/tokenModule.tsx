/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconTokenModule = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 2l5.196 3v.178l-.866.468V5.5L8 3 3.67 5.5v5L8 13l4.33-2.5V5.77l.866-.474V11L8 14l-5.196-3V5L8 2z" />
    <path d="M5.243 4.429L9.597 7.04 8 7.928 3.743 5.563a.5.5 0 10-.486.874L7.5 8.794V13.5h1V8.794l4.243-2.357a.508.508 0 00.06-.04l.392-.202V5.047l-.917.505a.573.573 0 00-.02.01l-.106.06-.191.105-1.355.753-4.849-2.909-.514.858z" />
  </svg>
);

export const icon = EuiIconTokenModule;
