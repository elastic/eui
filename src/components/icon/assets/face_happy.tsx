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

const EuiIconFaceHappy = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 16A8 8 0 118 0a8 8 0 010 16zm0-1.067A6.933 6.933 0 108 1.067a6.933 6.933 0 000 13.866zM5.333 6.4a1.067 1.067 0 110-2.133 1.067 1.067 0 010 2.133zm5.334 0a1.067 1.067 0 110-2.133 1.067 1.067 0 010 2.133zM2.739 8.802a.533.533 0 01.922-.537C4.815 10.245 6.249 11.2 8 11.2c1.75 0 3.185-.956 4.34-2.935a.533.533 0 01.92.537c-1.333 2.287-3.1 3.465-5.26 3.465-2.16 0-3.927-1.178-5.26-3.465z" />
  </svg>
);

export const icon = EuiIconFaceHappy;
