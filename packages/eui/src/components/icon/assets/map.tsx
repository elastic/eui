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
const EuiIconMap = ({
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
    <path d="M12 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    <path
      fillRule="evenodd"
      d="M12 7c.084 0 .166.004.248.01l.02.002c.157.014.31.043.459.08l.056.014A2.999 2.999 0 0 1 15 10c0 1.411-.7 2.644-1.354 3.492a9.415 9.415 0 0 1-1.21 1.294l-.087.075c-.01.01-.02.016-.026.02l-.007.007-.003.002-.313.25-.313-.25-.003-.002-.007-.006-.026-.02-.086-.076a9.51 9.51 0 0 1-1.456-1.63c-.036-.05-.068-.103-.103-.156C9.476 12.196 9 11.159 9 10a3 3 0 0 1 3-3Zm0 1a2 2 0 0 0-2 2c0 1.089.55 2.106 1.146 2.883.295.382.59.692.811.906.014.014.03.026.043.04l.043-.04c.221-.214.516-.524.81-.906C13.452 12.106 14 11.089 14 10a2 2 0 0 0-2-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12 2a1 1 0 0 1 1 1v3.126A4.007 4.007 0 0 0 12 6V3h-.293l-7 7 3 3h1.128c.209.376.435.711.651 1H2a1 1 0 0 1-.995-.898L1 13V3a1 1 0 0 1 1-1h10ZM2 13h4.293L2 8.707V13Zm0-5.707 2 2L6.793 6.5 3.293 3H2v4.293Zm5.5-1.5L10.293 3H4.707L7.5 5.793Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconMap;
