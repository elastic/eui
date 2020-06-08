/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CSSProperties } from 'react';

export const WARNING_MESSAGE =
  'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.';

export const resolveWidthAsStyle = (
  style: CSSProperties = {},
  width?: string | number
) => {
  const { width: styleWidth, ...styleRest } = style;
  let attrWidth = width;
  if (
    attrWidth != null &&
    (typeof attrWidth === 'number' || !isNaN(Number(attrWidth))) // transform {number} or unitless 'number' to px string
  ) {
    attrWidth = `${attrWidth}px`;
  }
  if (styleWidth && attrWidth) {
    console.warn(WARNING_MESSAGE);
  }
  return { ...styleRest, width: attrWidth || styleWidth };
};
