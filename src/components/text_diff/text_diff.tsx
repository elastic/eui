/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
