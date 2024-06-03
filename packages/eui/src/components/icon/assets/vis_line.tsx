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
const EuiIconVisLine = ({
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
    <path d="M12.654 3.48c.248.225.552.389.888.467L11.24 9.43a1.99 1.99 0 0 0-.915-.404l2.33-5.547ZM9.146 9.19a2.008 2.008 0 0 0-.769.64l-1.572-2c.311-.136.581-.35.785-.618l1.556 1.978ZM5.581 7.956l-2.134 4.268a.5.5 0 0 1-.894-.448l2.134-4.268c.25.22.557.376.894.448ZM1 15h13.5a.5.5 0 1 1 0 1H.5a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 1 0V15Zm5-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);
export const icon = EuiIconVisLine;
