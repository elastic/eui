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
const EuiIconEditorChecklist = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4.597 3a.411.411 0 0 0-.299.132l-1.85 1.993-.756-.7a.412.412 0 0 0-.28-.124.42.42 0 0 0-.292.098.333.333 0 0 0-.12.257.335.335 0 0 0 .127.254l1.064.982A.418.418 0 0 0 2.488 6a.411.411 0 0 0 .288-.126L4.904 3.58a.328.328 0 0 0 .095-.25.337.337 0 0 0-.126-.238A.421.421 0 0 0 4.597 3zm-.299 4.132A.411.411 0 0 1 4.597 7a.421.421 0 0 1 .276.093c.076.062.12.147.126.238a.328.328 0 0 1-.095.25L2.776 9.874a.411.411 0 0 1-.288.126.418.418 0 0 1-.297-.108L1.127 8.91A.335.335 0 0 1 1 8.656a.333.333 0 0 1 .12-.257.42.42 0 0 1 .292-.098c.108.005.21.05.28.123l.757.701 1.849-1.993zM4.597 11a.411.411 0 0 0-.299.132l-1.85 1.993-.756-.7a.412.412 0 0 0-.28-.124.421.421 0 0 0-.292.098.333.333 0 0 0-.12.257.335.335 0 0 0 .127.254l1.064.982a.418.418 0 0 0 .297.108.411.411 0 0 0 .288-.126l2.128-2.293a.328.328 0 0 0 .095-.25.337.337 0 0 0-.126-.238.421.421 0 0 0-.276-.093zM6.5 4a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM6 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 3.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
  </svg>
);
export const icon = EuiIconEditorChecklist;
