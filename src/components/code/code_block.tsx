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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

import { EuiCodeBlockImpl } from './_code_block';
import { EuiCodeSharedProps } from './code';

export type PaddingSize = 'none' | 's' | 'm' | 'l';
export type FontSize = 's' | 'm' | 'l';

interface OwnProps extends EuiCodeSharedProps {
  inline?: false;
  paddingSize?: PaddingSize;
  fontSize?: FontSize;
  overflowHeight?: number;
  isCopyable?: boolean;
}

export type EuiCodeBlockProps = CommonProps &
  OwnProps &
  HTMLAttributes<HTMLElement>;

export const EuiCodeBlock: FunctionComponent<EuiCodeBlockProps> = ({
  inline,
  ...rest
}) => {
  return <EuiCodeBlockImpl inline={false} {...rest} />;
};
