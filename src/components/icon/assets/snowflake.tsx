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
const EuiIconSnowflake = ({
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
      d="M7.007.5a.5.5 0 0 1 1 0v2.024a.999.999 0 0 0 .268-.227l1.027-1.233a.5.5 0 0 1 .769.64L8.275 3.86a.999.999 0 0 1-.268.227v2.548l2.207-1.274c0-.114.02-.231.062-.346l.968-2.632a.5.5 0 1 1 .938.345l-.554 1.506a.998.998 0 0 0-.062.346l1.753-1.012a.5.5 0 1 1 .5.866l-1.753 1.012c.1.057.21.098.33.119l1.582.273a.5.5 0 1 1-.17.986l-2.764-.478a1 1 0 0 1-.33-.12L8.506 7.5l2.207 1.274a1 1 0 0 1 .33-.119l2.764-.478a.5.5 0 1 1 .17.986l-1.582.273a.999.999 0 0 0-.33.12l1.753 1.011a.5.5 0 1 1-.5.866l-1.753-1.012c0 .115.02.231.062.346l.554 1.506a.5.5 0 0 1-.938.345l-.968-2.632a.999.999 0 0 1-.062-.346L8.007 8.366v2.548c.098.058.19.133.268.227l1.796 2.155a.5.5 0 0 1-.769.64l-1.027-1.233a.999.999 0 0 0-.268-.226V14.5a.5.5 0 0 1-1 0v-2.024a.999.999 0 0 0-.269.227l-1.027 1.233a.5.5 0 0 1-.768-.64l1.795-2.155a.999.999 0 0 1 .269-.227V8.366L4.8 9.64c0 .114-.02.231-.062.346l-.969 2.632a.5.5 0 1 1-.938-.345l.554-1.506a1 1 0 0 0 .062-.346l-1.753 1.012a.5.5 0 0 1-.5-.866l1.753-1.012a.999.999 0 0 0-.33-.119l-1.582-.273a.5.5 0 0 1 .17-.986l2.764.478c.12.02.232.062.33.12L6.508 7.5 4.3 6.226a.999.999 0 0 1-.33.119l-2.765.478a.5.5 0 1 1-.17-.986l1.582-.273a.999.999 0 0 0 .33-.12L1.194 4.434a.5.5 0 1 1 .5-.866l1.753 1.012c0-.114-.02-.231-.062-.346L2.83 2.727a.5.5 0 1 1 .938-.345l.969 2.632a.999.999 0 0 1 .062.346l2.207 1.274V4.086a1 1 0 0 1-.269-.227L4.943 1.704a.5.5 0 0 1 .768-.64l1.027 1.233c.079.094.17.17.269.227V.5Z"
    />
  </svg>
);
export const icon = EuiIconSnowflake;
