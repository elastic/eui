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

const EuiIconAppAdvancedSettings = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M2.909 26.182h1.939v4.848H2.909z"
    />
    <path d="M4.848 16.62V0H2.91v16.62a3.879 3.879 0 101.94 0zm-.97 5.683a1.94 1.94 0 110-3.879 1.94 1.94 0 010 3.879z" />
    <path
      className="euiIcon__fillSecondary"
      d="M14.545 16.485h1.939V31.03h-1.939z"
    />
    <path d="M16.485 6.924V0h-1.94v6.924a3.879 3.879 0 101.94 0zm-.97 5.682a1.94 1.94 0 110-3.879 1.94 1.94 0 010 3.88z" />
    <path
      className="euiIcon__fillSecondary"
      d="M26.182 26.182h1.939v4.848h-1.939z"
    />
    <path d="M28.121 16.62V0h-1.94v16.62a3.879 3.879 0 101.94 0zm-.97 5.683a1.94 1.94 0 110-3.879 1.94 1.94 0 010 3.879z" />
  </svg>
);

export const icon = EuiIconAppAdvancedSettings;
