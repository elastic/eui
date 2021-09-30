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

const EuiIconEditorComment = ({
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
    <path d="M6.111 10H12a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1h1v1.297L6.111 10zm.46 1L4 14v-3a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H6.571z" />
  </svg>
);

export const icon = EuiIconEditorComment;
