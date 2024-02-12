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
const EuiIconOffline = ({
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
    <path d="m6.517 12.271 1.254-1.254a1.5 1.5 0 1 1-1.254 1.254Zm2.945-2.944.74-.74c.361.208.694.467.987.772a.5.5 0 0 1-.721.693 3.424 3.424 0 0 0-1.006-.725Zm2.162-2.163.716-.715c.308.232.599.49.87.772a.5.5 0 1 1-.722.692 6.26 6.26 0 0 0-.864-.749ZM7.061 6.07A6.198 6.198 0 0 0 3.54 7.885a.5.5 0 0 1-.717-.697 7.199 7.199 0 0 1 5.309-2.187l-1.07 1.07Zm6.672-1.014.71-.71c.274.23.536.476.786.736a.5.5 0 0 1-.721.692 9.1 9.1 0 0 0-.775-.718Zm-3.807-1.85A9.06 9.06 0 0 0 8 3a8.99 8.99 0 0 0-6.469 2.734.5.5 0 1 1-.717-.697A9.99 9.99 0 0 1 8 2c.944 0 1.868.131 2.75.382l-.824.824ZM8 13a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-5.424 1a.5.5 0 0 1-.707-.707L14.146 1.146a.5.5 0 0 1 .708.708L2.576 14Z" />
  </svg>
);
export const icon = EuiIconOffline;
