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

const EuiIconInfo = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.139 14l-.052-6.007H5V6.28h4.111l.052 6.007h1.915V14h-3.94zM6.712 3.38c0-.396.118-.725.354-.987S7.639 2 8.077 2c.438 0 .777.131 1.016.393.24.262.359.591.359.987 0 .39-.12.714-.359.972s-.578.388-1.016.388c-.438 0-.775-.13-1.011-.388-.236-.258-.354-.582-.354-.972z"
    />
  </svg>
);

export const icon = EuiIconInfo;
