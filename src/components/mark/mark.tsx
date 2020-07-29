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

import React, { HTMLAttributes, FunctionComponent, CSSProperties } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import usePropagate from '../../services/propagate/use_propagate';
import {
  euiMarkStyle,
  euiMarkAmsterdamStyle,
  styleConfig,
  EuiMarkStyle,
  StyleConfig,
} from './mark_style';
import { css } from '@emotion/core';

export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    children: string;
    size?: 's' | 'm';
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  size = 's',
  ...rest
}) => {
  // Is there any way to make this more effecient without having to pull them out first?
  const myFakePropagate = () => {
    // Returns everything
    const [themeName, colors, sizes, borders] = usePropagate([
      'name',
      'colors',
      'sizes',
      'borders',
    ]);
    return {
      colorMode: themeName,
      themeName,
      colors,
      sizes,
      borders,
    };
  };

  const currentTheme = myFakePropagate();

  // Can we make this generic
  function createStyleFromProps(
    label: string,
    style: ({}) => StyleConfig,
    size: EuiMarkProps['size']
  ): CSSProperties {
    // If generic can it still grab the currentTheme wihtout it being passed in
    const computeStyle = style(currentTheme);
    return css(
      {
        ...computeStyle.baseStyle,
        ...computeStyle.size[size || 's'],
      },
      `label:-${label}` // Creates a consistent class naming structure
    );
  }

  const classes = classNames('euiMark', className);

  // Trying to get this second one to auto-spit out the const name onto the class list
  // Not working when importing the `css()`
  const euiMarkAmsterdam =
    currentTheme.themeName.includes('amsterdam') &&
    euiMarkAmsterdamStyle(currentTheme.borders);

  return (
    <mark
      css={[
        createStyleFromProps('euiMark', EuiMarkStyle, size),
        euiMarkAmsterdam,
      ]}
      className={classes}
      {...rest}>
      {children}
    </mark>
  );
};
