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

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiIconProps, EuiIcon } from '../../../components/icon';
import { EuiAvatarProps, EuiAvatar } from '../../../components/avatar/avatar';
import { EuiSelectableOption } from '../selectable_option';
import { EuiHighlight } from '../../../components/highlight';

export interface EuiSelectableTemplateSitewideMetaData extends CommonProps {
  /**
   * Required to display the metadata
   */
  text: string;
  /**
   * Styles the metadata according to Elastic's schema.
   * Can be one of 'application', 'deployment', 'article', 'case', 'platform',
   * or a custom string to associate with your own schema.
   * Appends the string to the class name as `euiSelectableTemplateSitewide__optionMeta--[type]`
   */
  type?:
    | 'application'
    | 'deployment'
    | 'article'
    | 'case'
    | 'platform'
    | string;
  /**
   * Will wrap the meta tag in EuiHighlight to mark the portions that match the search text
   */
  highlightSearchString?: boolean;
}

export type EuiSelectableTemplateSitewideOptionProps = {
  /**
   * Displayed on the left (`prepend`).
   * Object of `EuiIconProps` for display of the solution/application's logo
   */
  icon?: EuiIconProps;
  /**
   * Displayed on the right (`append`).
   * Object of `EuiAvatarProps` for display of the space (default) or user
   */
  avatar?: EuiAvatarProps;
  /**
   * An array of inline #MetaData displayed beneath the label and separated by bullets.
   */
  meta?: EuiSelectableTemplateSitewideMetaData[];
} & EuiSelectableOption;

export const euiSelectableTemplateSitewideFormatOptions = (
  options: EuiSelectableTemplateSitewideOptionProps[]
) => {
  return options.map((item: EuiSelectableTemplateSitewideOptionProps) => {
    return {
      key: item.label,
      label: item.label,
      title: `${item.label}${item.meta &&
        item.meta.length &&
        ' • '}${renderOptionMeta(item.meta, '', true)}`,
      ...item,
      className: classNames(
        'euiSelectableTemplateSitewide__listItem',
        item.className
      ),
      prepend: item.icon ? (
        <EuiIcon color="subdued" {...item.icon} size="l" />
      ) : (
        item.prepend
      ),
      append: item.avatar ? (
        <EuiAvatar type="space" size="s" {...item.avatar} />
      ) : (
        item.append
      ),
    };
  });
};

export const euiSelectableTemplateSitewideRenderOptions = (
  option: EuiSelectableOption,
  searchValue: string
) => {
  return (
    <>
      <EuiHighlight
        className="euiSelectableTemplateSitewide__listItemTitle"
        search={searchValue}>
        {option.label}
      </EuiHighlight>
      {renderOptionMeta(option.meta, searchValue)}
    </>
  );
};

function renderOptionMeta(
  meta?: EuiSelectableTemplateSitewideMetaData[],
  searchValue: string = '',
  stringsOnly: boolean = false
): ReactNode {
  if (!meta || meta.length < 1) return;
  const metas: ReactNode = meta.map(
    (meta: EuiSelectableTemplateSitewideMetaData) => {
      const { text, highlightSearchString, className, ...rest } = meta;
      if (stringsOnly) {
        return ` ${text}`;
      }

      // Start with the base and custom classes
      let metaClasses = classNames(
        'euiSelectableTemplateSitewide__optionMeta',
        className
      );

      // If they provided a type, create the class and append
      if (meta.type) {
        metaClasses = classNames(
          [`euiSelectableTemplateSitewide__optionMeta--${meta.type}`],
          metaClasses
        );
      }

      return (
        <EuiHighlight
          search={highlightSearchString ? searchValue : ''}
          className={metaClasses}
          key={text}
          {...rest}>
          {text}
        </EuiHighlight>
      );
    }
  );

  return stringsOnly ? (
    metas
  ) : (
    <span className="euiSelectableTemplateSitewide__optionMetasList">
      {metas}
    </span>
  );
}
