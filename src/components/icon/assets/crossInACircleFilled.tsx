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

const EuiIconCrossInACircleFilled = ({
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
    <path d="M8.746 8l3.1-3.1a.527.527 0 10-.746-.746L8 7.254l-3.1-3.1a.527.527 0 10-.746.746l3.1 3.1-3.1 3.1a.527.527 0 10.746.746l3.1-3.1 3.1 3.1a.527.527 0 10.746-.746L8.746 8zM8 16A8 8 0 118 0a8 8 0 010 16z" />
  </svg>
);

export const icon = EuiIconCrossInACircleFilled;
