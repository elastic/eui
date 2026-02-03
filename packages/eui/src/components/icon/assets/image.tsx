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
const EuiIconImage = ({
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
      d="M6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M14.102 2.005A1 1 0 0 1 15 3v10a.962.962 0 0 1-.012.143l-.008.058a.993.993 0 0 1-.077.226l-.012.028-.03.05-.022.038-.023.032a.997.997 0 0 1-.1.121l-.02.022a.979.979 0 0 1-.075.064l-.04.03-.033.023a1.013 1.013 0 0 1-.057.034l-.021.013a.952.952 0 0 1-.052.025c-.012.006-.024.013-.037.018a.998.998 0 0 1-.07.025l-.015.005A.997.997 0 0 1 14 14H2a1 1 0 0 1-.128-.01l-.037-.005a1.007 1.007 0 0 1-.122-.028l-.02-.007a.98.98 0 0 1-.111-.043l-.018-.008a1.02 1.02 0 0 1-.116-.066l-.01-.006a1.002 1.002 0 0 1-.292-.306l-.01-.017a.992.992 0 0 1-.131-.402L1 13V3a1 1 0 0 1 1-1h12l.102.005Zm-6.395 9.288L9.414 13H14v-2l-3-3-3.293 3.293ZM2 13h6l-3-3-3 3Zm0-1.414 2.293-2.293a1 1 0 0 1 1.414 0L7 10.586l3.293-3.293a1 1 0 0 1 1.414 0L14 9.586V3H2v8.586Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = EuiIconImage;
