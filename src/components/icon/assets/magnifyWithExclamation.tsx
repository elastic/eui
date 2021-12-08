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

const EuiIconMagnifyWithExclamation = ({
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
    <path d="M11.271 11.978l3.872 3.873a.502.502 0 00.708 0 .502.502 0 000-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532-2.73-2.73-7.17-2.73-9.898 0-2.728 2.729-2.728 7.17 0 9.9a6.955 6.955 0 004.949 2.05.5.5 0 000-1 5.96 5.96 0 01-4.242-1.757 6.01 6.01 0 010-8.486 6.004 6.004 0 018.484 0 6.01 6.01 0 010 8.486.5.5 0 00.034.738z" />
    <path d="M6.476 10.778A.727.727 0 007.01 11a.717.717 0 00.52-.22.715.715 0 00.225-.53.716.716 0 00-.222-.533.724.724 0 00-.523-.217.731.731 0 00-.533.22.719.719 0 00-.222.53c0 .204.074.38.222.528zM6.254 3l.277 5.7h.935L7.754 3h-1.5z" />
  </svg>
);

export const icon = EuiIconMagnifyWithExclamation;
