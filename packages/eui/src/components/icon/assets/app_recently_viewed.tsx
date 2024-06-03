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
const EuiIconAppRecentlyViewed = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16a16 16 0 0 1-16 16Zm0-30C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14A14 14 0 0 0 16 2Z" />
    <path
      d="M15 4h2v9.17A3.009 3.009 0 0 1 18.83 15H26v2h-7.17A3.001 3.001 0 1 1 15 13.17V4Zm1 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      className="euiIcon__fillSecondary"
    />
  </svg>
);
export const icon = EuiIconAppRecentlyViewed;
