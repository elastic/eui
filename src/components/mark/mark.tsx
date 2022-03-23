/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { useEuiI18n } from '../i18n';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiMarkStyles } from './mark.styles';
export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * Set to `false` to remove the CSS :before and :after
     * screen reader helper text
     */
    hasHighlightText?: boolean;
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  hasHighlightText = true,
  ...rest
}) => {
  const useTheme = useEuiTheme();
  const classes = classNames('euiMark', className);
  const highlightStart = useEuiI18n(
    'euiMark.highlightStart',
    'highlight start'
  );
  const highlightEnd = useEuiI18n('euiMark.highlightEnd', 'highlight end');
  const styles = euiMarkStyles({
    euiTheme: useTheme.euiTheme,
    colorMode: useTheme.colorMode,
    modifications: {},
    hasHighlightText: hasHighlightText,
    highlightStart: highlightStart,
    highlightEnd: highlightEnd,
  });

  return (
    <mark css={[styles]} className={classes} {...rest}>
      {children}
    </mark>
  );
};
