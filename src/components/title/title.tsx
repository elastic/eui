/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { useEuiTheme, cloneElementWithCss } from '../../services';
import { euiTitleStyles } from './title.styles';
import { CommonProps } from '../common';

export const TITLE_SIZES = ['xxxs', 'xxs', 'xs', 's', 'm', 'l'] as const;
export type EuiTitleSize = (typeof TITLE_SIZES)[number];

export const TEXT_TRANSFORM = ['uppercase'] as const;
export type EuiTitleTextTransform = (typeof TEXT_TRANSFORM)[number];

export type EuiTitleProps = CommonProps & {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement<any>;
  size?: EuiTitleSize;
  textTransform?: EuiTitleTextTransform;
  id?: string;
};

export const EuiTitle: FunctionComponent<EuiTitleProps> = ({
  size = 'm',
  children,
  className,
  textTransform,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiTitleStyles(euiTheme);
  const cssStyles = [
    styles.euiTitle,
    textTransform ? styles[textTransform] : undefined,
    styles[size],
  ];
  const classes = classNames('euiTitle', className, children.props.className);

  const props = {
    css: cssStyles,
    className: classes,
    ...rest,
  };

  return cloneElementWithCss(children, props);
};
