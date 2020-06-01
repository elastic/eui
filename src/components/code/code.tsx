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

import { CommonProps } from '../common';

import React, { FunctionComponent, HTMLAttributes } from 'react';

import { EuiCodeBlockImpl } from './_code_block';

export type FontSize = 's' | 'm' | 'l';
export type PaddingSize = 'none' | 's' | 'm' | 'l';

export interface EuiCodeSharedProps {
  paddingSize?: PaddingSize;

  /**
   * Sets the syntax highlighting for a specific language
   * @see http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
   * for options
   */
  language?: string;
  overflowHeight?: number;
  fontSize?: FontSize;
  transparentBackground?: boolean;
  isCopyable?: boolean;
}

interface Props extends EuiCodeSharedProps {
  inline?: true;
}

export type EuiCodeProps = CommonProps & Props & HTMLAttributes<HTMLElement>;

export const EuiCode: FunctionComponent<EuiCodeProps> = ({
  inline,
  ...rest
}) => {
  return <EuiCodeBlockImpl inline={true} {...rest} />;
};
