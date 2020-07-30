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

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import usePropagate from '../../services/propagate/use_propagate';
import { EuiMarkAmsterdamStyle, EuiMarkStyle, StyleConfig } from './mark_style';
import { css, SerializedStyles } from '@emotion/core';

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
  // Can we make this generic
  function createStyleFromProps(
    /**
     * Required to append a particular label (class name reference) for easy debugging
     */
    label: string,
    /**
     * The actual StyleConfig object
     */
    style: ({}) => StyleConfig | undefined,
    /**
     * The optional props that the StyleConfig relies on/manipulates styles of
     */
    props?: { [key: string]: any }
  ): SerializedStyles | undefined {
    const [themeName, colors, sizes, borders] = usePropagate([
      'name',
      'colors',
      'sizes',
      'borders',
    ]);
    const theme = {
      colorMode: themeName.includes('light') ? 'light' : 'dark',
      theme: themeName,
      colors,
      sizes,
      borders,
    };

    const computedStyle = style(theme);
    if (!computedStyle) return;

    let computedLabel = `label:-${label}`;

    const propStyles = props
      ? Object.keys(props).reduce((styles, propName) => {
          computedLabel += `-${size}`;
          return {
            ...styles,
            ...computedStyle[propName][props[propName]],
          };
        }, {})
      : undefined;

    return css(
      {
        ...computedStyle.base,
        ...propStyles,
      },
      computedLabel // Creates a consistent class naming structure
    );
  }

  const classes = classNames('euiMark', className);

  return (
    <mark
      css={[
        createStyleFromProps('euiMark', EuiMarkStyle, { size }),
        createStyleFromProps('amsterdam', EuiMarkAmsterdamStyle),
      ]}
      className={classes}
      {...rest}>
      {children}
    </mark>
  );
};
