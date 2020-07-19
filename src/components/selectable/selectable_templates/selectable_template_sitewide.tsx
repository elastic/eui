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
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useState,
  CSSProperties,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiAvatarProps } from '../../avatar/avatar';
import { EuiIconProps } from '../../icon';
import { EuiSelectable, EuiSelectableProps } from '../selectable';
import { EuiSelectableOption } from '../selectable_option';
import { EuiPopoverTitle, EuiPopoverFooter } from '../../popover';
import { EuiPopover, Props as PopoverProps } from '../../popover/popover';
import { useEuiI18n } from '../../i18n';
import { EuiText } from '../../text';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiLink } from '../../link';
import { EuiBadge } from '../../badge';
import { EuiSelectableListItemProps } from '../selectable_list/selectable_list_item';

interface MetaData {
  text: ReactNode;
  type: 'app' | 'deployment' | 'article' | 'case' | 'platform' | 'other';
  color?: string;
  fontWeight?: 'normal' | 'medium' | 'bold';
}

export type EuiSelectableTemplateSitewideSchema = EuiSelectableOption & {
  label: ReactNode;
  icon?: EuiIconProps;
  avatar?: EuiAvatarProps;
  meta?: MetaData[];
  [key: string]: any;
};

export type EuiSelectableTemplateSitewideProps = Omit<
  EuiSelectableProps,
  'options'
> & {
  options: EuiSelectableTemplateSitewideSchema[];
  /**
   * Override some of the EuiPopover props housing the list.
   * The default width is `600`
   */
  popoverProps?: PopoverProps & { width?: CSSProperties['width'] };
  /**
   * Optionally provide a title for the popover
   */
  popoverTitle?: ReactNode;
  /**
   * Optionally provide a footer for the popover
   */
  popoverFooter?: ReactNode;
};

export const EuiSelectableTemplateSitewide: FunctionComponent<
  EuiSelectableTemplateSitewideProps
> = ({
  children,
  className,
  options,
  popoverProps,
  popoverTitle,
  popoverFooter,
  searchProps,
  listProps,
  ...rest
}) => {
  /**
   * i18n text
   */
  const [searchPlaceholder] = useEuiI18n(
    ['euiSelectableTemplateSitewide.searchPlaceholder'],
    ['Search for anything...']
  );

  /**
   * Internal states
   */
  const [inputHasFocus, setInputHasFocus] = useState(false);

  /**
   * Popover helpers
   */
  const closePopover = () => {
    setInputHasFocus(false);
    popoverProps && popoverProps.closePopover && popoverProps.closePopover();
  };
  // Width applied to the internal div
  let popoverWidth: CSSProperties['width'] = 600;
  if (popoverProps) {
    // So it also needs to be removed from the spread
    const { width, ...popoverRest } = popoverProps;
    popoverWidth = popoverProps.width;
    popoverProps = popoverRest;
  }

  /**
   * Classes
   */
  const classes = classNames('euiSelectableTemplateSitewide', className);
  const searchClasses = classNames(
    'euiSelectableTemplateSitewide__search',
    searchProps && searchProps.className
  );
  const listClasses = classNames(
    'euiSelectableTemplateSitewide__list',
    listProps && listProps.className
  );

  return (
    <EuiSelectable
      options={options}
      // renderOption={renderOption}
      height={300}
      singleSelection={true}
      searchProps={{
        placeholder: searchPlaceholder,
        onFocus: () => setInputHasFocus(true),
        isClearable: true,
        ...searchProps,
        className: searchClasses,
      }}
      listProps={{
        rowHeight: 68,
        showIcons: false,
        ...listProps,
        className: listClasses,
        onFocusBadgeContent: (
          <>
            <small>↩</small> Go to
          </>
        ),
      }}
      {...rest}
      className={classes}
      searchable>
      {(list, search) => (
        <EuiPopover
          panelPaddingSize="none"
          display="block"
          isOpen={inputHasFocus}
          {...popoverProps}
          button={search}
          closePopover={closePopover}>
          <div style={{ width: popoverWidth }}>
            {popoverTitle && <EuiPopoverTitle>{popoverTitle}</EuiPopoverTitle>}
            {list}
            {popoverFooter && (
              <EuiPopoverFooter>{popoverFooter}</EuiPopoverFooter>
            )}
          </div>
        </EuiPopover>
      )}
    </EuiSelectable>
  );
};
