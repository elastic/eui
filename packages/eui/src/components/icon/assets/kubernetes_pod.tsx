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
const EuiIconKubernetesPod = ({
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
    <path d="m2.5 11.213 5 2.916V8.286l-5-2.916v5.843Zm6-2.927v5.843l5-2.916V5.37l-5 2.916ZM2.991 4.5 8 7.42l5.008-2.92L8 1.578 2.991 4.5Zm11.509 7a.5.5 0 0 1-.248.432L8.5 15.286v.214h-1v-.214l-5.752-3.354A.5.5 0 0 1 1.5 11.5v-7a.5.5 0 0 1 .248-.432l6-3.5a.5.5 0 0 1 .504 0l6 3.5a.5.5 0 0 1 .248.432v7Z" />
  </svg>
);
export const icon = EuiIconKubernetesPod;
