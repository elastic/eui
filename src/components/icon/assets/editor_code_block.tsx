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

const EuiIconEditorCodeBlock = ({
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
    <path d="M2.414 8.036L4.89 10.51a.5.5 0 01-.707.708L1.354 8.389a.5.5 0 010-.707l2.828-2.828a.5.5 0 11.707.707L2.414 8.036zm8.768 2.474l2.475-2.474-2.475-2.475a.5.5 0 01.707-.707l2.829 2.828a.5.5 0 010 .707l-2.829 2.829a.5.5 0 11-.707-.708zM8.559 2.506a.5.5 0 01.981.19L7.441 13.494a.5.5 0 01-.981-.19L8.559 2.506z" />
  </svg>
);

export const icon = EuiIconEditorCodeBlock;
