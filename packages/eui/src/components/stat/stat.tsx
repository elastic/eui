/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Fragment,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  createElement,
} from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle, EuiTitleSize } from '../title/title';
import { useEuiI18n } from '../i18n';

import { useEuiTheme } from '../../services';
import { euiStatStyles, euiStatTitleStyles } from './stat.styles';

export const COLORS = [
  'default',
  'subdued',
  'primary',
  'success',
  'danger',
  'accent',
] as const;
type TitleColor = (typeof COLORS)[number];

export const ALIGNMENTS = ['left', 'center', 'right'] as const;

export interface EuiStatProps {
  /**
   * Set the description (label) text
   */
  description: ReactNode;
  /**
   * Will hide the title with an animation until false
   */
  isLoading?: boolean;
  /**
   * Flips the order of the description and title
   */
  reverse?: boolean;
  textAlign?: (typeof ALIGNMENTS)[number];
  /**
   * The (value) text
   */
  title: ReactNode;
  /**
   * The color of the title text
   */
  titleColor?: TitleColor | string;
  /**
   * Size of the title. See EuiTitle for options ('s', 'm', 'l'... etc)
   */
  titleSize?: EuiTitleSize;
  /**
   * HTML Element to be used for title
   */
  titleElement?: string;
  /**
   * HTML Element to be used for description
   */
  descriptionElement?: string;
}

export const EuiStat: FunctionComponent<
  CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'> & EuiStatProps
> = ({
  children,
  className,
  description,
  isLoading = false,
  reverse = false,
  textAlign = 'left',
  title,
  titleColor = 'default',
  titleSize = 'l',
  titleElement = 'p',
  descriptionElement = 'p',
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiStatStyles();
  const cssStyles = [styles.euiStat, styles[textAlign]];
  const classes = classNames('euiStat', className);

  const loadingStatsAriaLabel = useEuiI18n(
    'euiStat.loadingText',
    'Statistic is loading'
  );

  const descriptionDisplay = (
    <EuiText size="s" className="euiStat__description">
      {createElement(descriptionElement, {}, description)}
    </EuiText>
  );

  const isNamedTitleColor = COLORS.includes(titleColor as TitleColor);
  const titleStyles = euiStatTitleStyles(euiTheme);
  const titleCssStyles = [
    titleStyles.euiStat__title,
    isNamedTitleColor && titleStyles[titleColor as TitleColor],
    isLoading && titleStyles.isLoading,
  ];

  const titleDisplay = (
    <EuiTitle
      size={titleSize}
      className="euiStat__title"
      css={titleCssStyles}
      aria-label={isLoading ? loadingStatsAriaLabel : undefined}
    >
      {createElement(
        titleElement,
        isNamedTitleColor ? {} : { style: { color: titleColor } },
        isLoading ? '--' : title
      )}
    </EuiTitle>
  );

  const statDisplay = (
    <Fragment>
      {!reverse && descriptionDisplay}
      {titleDisplay}
      {reverse && descriptionDisplay}
    </Fragment>
  );

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {statDisplay}
      {children}
    </div>
  );
};
