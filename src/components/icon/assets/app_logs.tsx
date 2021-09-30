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

const EuiIconAppLogs = ({
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
    <path d="M1 8c3.983 0 7.732 1.013 11.001 2.797v2.312A20.887 20.887 0 002 10.023v11.025c4.85.462 9.27 4.183 9.955 8.691l.035.261H12v2h-1.938l-.018-1.236c-.116-4.015-4.336-7.631-8.793-7.76L0 22.986V8h1zm13-8h1c9.28 0 16.825 7.437 16.997 16.677L32 17v15h-2V17c0-7.84-6.014-14.274-13.68-14.943L16 2.033v7.681l-2-1.143V0h1-1z" />
    <path
      className="euiIcon__fillSecondary"
      d="M26.997 30.636L27.009 32H14V11.305l1.483.82c6.994 3.861 11.382 10.735 11.514 18.51zm-2.048-1.04C24.505 23.556 21.205 18.2 16 14.771V30h8.974l-.025-.404z"
    />
  </svg>
);

export const icon = EuiIconAppLogs;
