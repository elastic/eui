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

import React, { HTMLAttributes, useMemo, ElementType } from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import { CommonProps } from '../common';

interface Props {
  /**
   * The starting string
   */
  beforeText: string;
  /**
   * The string used to compare against `beforeText`
   */
  afterText: string;
  /**
   * HTML element to wrap insertion differences.
   * Defaults to `ins`
   */
  insertComponent?: ElementType;
  /**
   * HTML element to wrap deletion differences.
   * Defaults to `del`
   */
  deleteComponent?: ElementType;
  /**
   * HTML element to wrap text with no differences.
   * Doesn't wrap with anything by default
   */
  sameComponent?: ElementType;
  /**
   * Time in milliseconds. Passing a timeout of value '0' disables the timeout state
   */
  timeout?: number;
}

export type EuiTextDiffProps = CommonProps &
  Props &
  HTMLAttributes<HTMLElement>;

export const useEuiTextDiff = ({
  className,
  insertComponent = 'ins',
  deleteComponent = 'del',
  sameComponent,
  beforeText = '',
  afterText = '',
  timeout = 0.1,
  ...rest
}: EuiTextDiffProps) => {
  const textDiff = useMemo(() => {
    const diff = new Diff({ timeout }); // options may be passed to constructor

    return diff.main(beforeText, afterText);
  }, [beforeText, afterText, timeout]); // produces diff array

  const classes = classNames('euiTextDiff', className);

  const rendereredHtml = useMemo(() => {
    const html = [];
    if (textDiff)
      for (let i = 0; i < textDiff.length; i++) {
        let Element;
        const el = textDiff[i];
        if (el[0] === 1) Element = insertComponent;
        else if (el[0] === -1) Element = deleteComponent;
        else if (sameComponent) Element = sameComponent;
        if (Element) html.push(<Element key={i}>{el[1]}</Element>);
        else html.push(el[1]);
      }

    return html;
  }, [textDiff, deleteComponent, insertComponent, sameComponent]); // produces diff array

  return [
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>,
    textDiff,
  ];
};
