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
import { euiMarkStyle, euiMarkAmsterdamStyle } from './mark_style';

export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    children: string;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  ...rest
}) => {
  // Is there any way to make this more effecient without having to pull them out first?
  const [themeName, colors, sizes, borders] = usePropagate([
    'name',
    'colors',
    'sizes',
    'borders',
  ]);

  const classes = classNames('euiMark', className);

  // Trying to get this second out to auto-spit out the const name onto the class list
  // Not working when importing the `css()`
  const euiMarkAmsterdam =
    themeName.includes('amsterdam') && euiMarkAmsterdamStyle(borders);

  return (
    <mark
      css={[euiMarkStyle(sizes, colors), euiMarkAmsterdam]}
      className={classes}
      {...rest}>
      {children}
    </mark>
  );
};
