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
import { PrismAsyncLight } from 'react-syntax-highlighter';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { FontSize, PaddingSize } from './code_block';

const fontSizeToClassNameMap = {
  s: 'euiCodeBlock--fontSmall',
  m: 'euiCodeBlock--fontMedium',
  l: 'euiCodeBlock--fontLarge',
};

export const FONT_SIZES = keysOf(fontSizeToClassNameMap);

const paddingSizeToClassNameMap: { [paddingSize in PaddingSize]: string } = {
  none: '',
  s: 'euiCodeBlock--paddingSmall',
  m: 'euiCodeBlock--paddingMedium',
  l: 'euiCodeBlock--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type EuiCodeBlockPrismProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    language?: string;
    startingLineNumber?: number;
    overflowHeight?: number;
    isCopyable?: number;
    fontSize?: FontSize;
    paddingSize?: PaddingSize;
    transparentBackground?: boolean;
    inline?: boolean;
  };

export const EuiCodeBlockPrism: FunctionComponent<EuiCodeBlockPrismProps> = ({
  children,
  language,
  className,
  startingLineNumber = 1,
  transparentBackground = false,
  inline = false,
  paddingSize = 'l',
  fontSize = 's',
  isCopyable = false,
  overflowHeight,
  ...rest
}) => {
  const classes = classNames(
    'euiCodeBlock',
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiCodeBlock--transparentBackground': transparentBackground,
      'euiCodeBlock--inline': inline,
      'euiCodeBlock--hasControls': isCopyable || overflowHeight,
    },
    className
  );

  return (
    <PrismAsyncLight
      language={language}
      startingLineNumber={startingLineNumber}
      useInlineStyles={false}
      {...rest}
      className={classes}>
      {children}
    </PrismAsyncLight>
  );
};
