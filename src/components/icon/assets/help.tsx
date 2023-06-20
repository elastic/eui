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
const EuiIconHelp = ({
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
      d="m13.6 12.186-1.357-1.358c-.025-.025-.058-.034-.084-.056.53-.794.84-1.746.84-2.773a4.977 4.977 0 0 0-.84-2.772c.026-.02.059-.03.084-.056L13.6 3.813a6.96 6.96 0 0 1 0 8.373ZM8 15A6.956 6.956 0 0 1 3.814 13.6l1.358-1.358c.025-.025.034-.057.055-.084C6.02 12.688 6.974 13 8 13a4.978 4.978 0 0 0 2.773-.84c.02.026.03.058.056.083l1.357 1.358A6.956 6.956 0 0 1 8 15Zm-5.601-2.813a6.963 6.963 0 0 1 0-8.373l1.359 1.358c.024.025.057.035.084.056A4.97 4.97 0 0 0 3 8c0 1.027.31 1.98.842 2.773-.027.022-.06.031-.084.056l-1.36 1.358Zm5.6-.187A4 4 0 1 1 8 4a4 4 0 0 1 0 8ZM8 1c1.573 0 3.019.525 4.187 1.4l-1.357 1.358c-.025.025-.035.057-.056.084A4.979 4.979 0 0 0 8 3a4.979 4.979 0 0 0-2.773.842c-.021-.027-.03-.059-.055-.084L3.814 2.4A6.957 6.957 0 0 1 8 1Zm0-1a8.001 8.001 0 1 0 .003 16.002A8.001 8.001 0 0 0 8 0Z"
    />
  </svg>
);
export const icon = EuiIconHelp;
