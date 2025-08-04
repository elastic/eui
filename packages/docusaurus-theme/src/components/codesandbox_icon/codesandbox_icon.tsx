/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<SVGElement>;

export const CodeSandboxIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    preserveAspectRatio="xMidYMid"
    viewBox="-20 0 296 296"
    {...props}
  >
    <path d="M115.498 261.088v-106.61L23.814 101.73v60.773l41.996 24.347v45.7l49.688 28.54Zm23.814.627 50.605-29.151V185.78l42.269-24.495v-60.011l-92.874 53.621v106.82Zm80.66-180.887-48.817-28.289-42.863 24.872-43.188-24.897-49.252 28.667 91.914 52.882 92.206-53.235ZM0 222.212V74.495L127.987 0 256 74.182v147.797l-128.016 73.744L0 222.212Z" />
  </svg>
);
