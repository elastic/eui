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

import React, {
  Fragment,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  createElement,
} from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle, EuiTitleSize } from '../title/title';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

const colorToClassNameMap = {
  default: null,
  subdued: 'euiStat__title--subdued',
  primary: 'euiStat__title--primary',
  secondary: 'euiStat__title--secondary',
  success: 'euiStat__title--success',
  danger: 'euiStat__title--danger',
  accent: 'euiStat__title--accent',
};

export const COLORS = keysOf(colorToClassNameMap);

const textAlignToClassNameMap = {
  left: 'euiStat--leftAligned',
  center: 'euiStat--centerAligned',
  right: 'euiStat--rightAligned',
};

export const isColorClass = (
  input: string
): input is keyof typeof colorToClassNameMap => {
  return colorToClassNameMap.hasOwnProperty(input);
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

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
  textAlign?: keyof typeof textAlignToClassNameMap;
  /**
   * The (value) text
   */
  title: ReactNode;
  /**
   * The color of the title text
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  titleColor?: keyof typeof colorToClassNameMap | string;
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
  const classes = classNames(
    'euiStat',
    textAlignToClassNameMap[textAlign],
    className
  );

  const titleClasses = classNames(
    'euiStat__title',
    isColorClass(titleColor) ? colorToClassNameMap[titleColor] : null,
    {
      'euiStat__title-isLoading': isLoading,
    }
  );

  const commonProps = {
    'aria-hidden': true,
  };

  const descriptionDisplay = (
    <EuiText size="s" className="euiStat__description">
      {createElement(descriptionElement, commonProps, description)}
    </EuiText>
  );

  const titlePropsWithColor = {
    'aria-hidden': true,
    style: {
      color: `${titleColor}`,
    },
  };

  const titleChildren = isLoading ? '--' : title;

  const titleDisplay = isColorClass(titleColor) ? (
    <EuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, commonProps, titleChildren)}
    </EuiTitle>
  ) : (
    <EuiTitle size={titleSize} className={titleClasses}>
      {createElement(titleElement, titlePropsWithColor, titleChildren)}
    </EuiTitle>
  );

  const screenReader = (
    <EuiScreenReaderOnly>
      <p>
        {isLoading ? (
          <EuiI18n token="euiStat.loadingText" default="Statistic is loading" />
        ) : (
          <Fragment>
            {reverse ? `${title} ${description}` : `${description} ${title}`}
          </Fragment>
        )}
      </p>
    </EuiScreenReaderOnly>
  );

  const statDisplay = (
    <Fragment>
      {!reverse && descriptionDisplay}
      {titleDisplay}
      {reverse && descriptionDisplay}
      {typeof title === 'string' &&
        typeof description === 'string' &&
        screenReader}
    </Fragment>
  );

  return (
    <div className={classes} {...rest}>
      {statDisplay}
      {children}
    </div>
  );
};
