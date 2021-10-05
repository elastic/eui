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

const EuiIconTokenRange = ({
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
    <g fillRule="evenodd">
      <path d="M9.82 5.116a.5.5 0 00-.704.704l.064.064L11.719 8l-2.54 2.116a.5.5 0 00-.114.63l.05.074a.5.5 0 00.63.115l.075-.05 3-2.5a.5.5 0 00.071-.697l-.07-.072-3-2.5zM6.18 5.116a.5.5 0 01.704.704l-.064.064L4.281 8l2.54 2.116a.5.5 0 01.114.63l-.05.074a.5.5 0 01-.63.115l-.075-.05-3-2.5a.5.5 0 01-.071-.697l.07-.072 3-2.5z" />
    </g>
  </svg>
);

export const icon = EuiIconTokenRange;
