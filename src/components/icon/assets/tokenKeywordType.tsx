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

const EuiIconTokenKeywordType = ({
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
    <path d="M6.615 5.116h.001L5.5 11.437h1.492l.26-1.502.7-.114c.006.034.017.093.03.177.077.445.282.807.616 1.085.34.278.782.417 1.325.417l.198-1.147c-.417 0-.657-.181-.72-.543l-.083-.521c.73-.445 1.095-1.047 1.095-1.805a.923.923 0 00-.292-.71c-.195-.187-.466-.28-.814-.28-.292 0-.573.058-.845.176-.27.119-.448.216-.532.292-.083.07-.146.13-.187.178L8.296 4H6.81l-.195 1.116zm2.192 2.608a.245.245 0 01.052.188.912.912 0 01-.209.427 1.58 1.58 0 01-.354.303 2.46 2.46 0 01-.407.188 4.4 4.4 0 01-.324.094c-.055.006-.1.013-.135.02l.135-.323c.09-.216.237-.431.438-.647.202-.215.41-.323.626-.323a.22.22 0 01.178.073z" />
  </svg>
);

export const icon = EuiIconTokenKeywordType;
