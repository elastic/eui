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

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiDescriptionListTitle } from './description_list_title';

import { EuiDescriptionListDescription } from './description_list_description';
import { CommonProps, keysOf } from '../common';

export type EuiDescriptionListType = keyof typeof typesToClassNameMap;
export type EuiDescriptionListAlignment = keyof typeof alignmentsToClassNameMap;
export type EuiDescriptionListTextStyle = keyof typeof textStylesToClassNameMap;

export interface EuiDescriptionListProps {
  listItems?: Array<{
    title: NonNullable<ReactNode>;
    description: NonNullable<ReactNode>;
  }>;
  /**
   * Text alignment
   */
  align?: EuiDescriptionListAlignment;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: EuiDescriptionListTextStyle;
  /**
   * How each item should be layed out
   */
  type?: EuiDescriptionListType;
  /**
   * Props object to be passed to `EuiDescriptionListTitle`
   */
  titleProps?: HTMLAttributes<HTMLElement>;
  /**
   * Props object to be passed to `EuiDescriptionListDescription`
   */
  descriptionProps?: HTMLAttributes<HTMLElement>;
}

const typesToClassNameMap = {
  row: 'euiDescriptionList--row',
  inline: 'euiDescriptionList--inline',
  column: 'euiDescriptionList--column',
  responsiveColumn: 'euiDescriptionList--responsiveColumn',
};

export const TYPES = keysOf(typesToClassNameMap);

const alignmentsToClassNameMap = {
  center: 'euiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = keysOf(alignmentsToClassNameMap);

const textStylesToClassNameMap = {
  normal: '',
  reverse: 'euiDescriptionList--reverse',
};

export const TEXT_STYLES = keysOf(textStylesToClassNameMap);

export const EuiDescriptionList: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps
> = ({
  align = 'left',
  children,
  className,
  compressed = false,
  descriptionProps,
  listItems,
  textStyle = 'normal',
  titleProps,
  type = 'row',
  ...rest
}) => {
  const classes = classNames(
    'euiDescriptionList',
    type ? typesToClassNameMap[type] : undefined,
    align ? alignmentsToClassNameMap[align] : undefined,
    textStyle ? textStylesToClassNameMap[textStyle] : undefined,
    {
      'euiDescriptionList--compressed': compressed,
    },
    className
  );

  let childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map((item, index) => {
      return [
        <EuiDescriptionListTitle key={`title-${index}`} {...titleProps}>
          {item.title}
        </EuiDescriptionListTitle>,

        <EuiDescriptionListDescription
          key={`description-${index}`}
          {...descriptionProps}>
          {item.description}
        </EuiDescriptionListDescription>,
      ];
    });
  } else {
    childrenOrListItems = children;
  }

  return (
    <dl className={classes} {...rest}>
      {childrenOrListItems}
    </dl>
  );
};
