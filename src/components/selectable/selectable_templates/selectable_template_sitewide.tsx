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
  FunctionComponent,
  ReactNode,
  useState,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../..//common';
import { EuiAvatarProps, EuiAvatar } from '../../avatar/avatar';
import { EuiIconProps, EuiIcon } from '../../icon';
import { EuiSelectable, EuiSelectableProps } from '../selectable';
import { EuiSelectableOption } from '../selectable_option';
import { EuiPopoverTitle, EuiPopoverFooter } from '../../popover';
import { EuiPopover, Props as PopoverProps } from '../../popover/popover';
import { EuiHighlight } from '../../highlight';
import { useEuiI18n, EuiI18n } from '../../i18n';
import { EuiSelectableMessage } from '../selectable_message';
import { EuiLoadingSpinner } from '../../loading';

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

export type EuiSelectableTemplateSitewideSchema = {
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

export type EuiSelectableTemplateSitewideProps = Partial<EuiSelectableProps> & {
  /**
   * Extends the typical EuiSelectable #Options with the addition of pre-composed elements
   * such as `icon`, `avatar`and `meta`
   */
  options: EuiSelectableTemplateSitewideSchema[];
  /**
   * Override some of the EuiPopover props housing the list.
   * The default width is `600`
   */
  popoverProps?: Partial<PopoverProps> & { width?: CSSProperties['width'] };
  /**
   * Optionally provide a title for the popover
   */
  popoverTitle?: ReactNode;
  /**
   * Optionally provide a footer for the popover
   */
  popoverFooter?: ReactNode;
};

export const EuiSelectableTemplateSitewide: FunctionComponent<EuiSelectableTemplateSitewideProps> = ({
  children,
  className,
  options,
  popoverProps,
  popoverTitle,
  popoverFooter,
  searchProps,
  listProps,
  isLoading,
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
  if (popoverProps && popoverProps.width) {
    // So it also needs to be removed from the spread
    const { width, ...popoverRest } = popoverProps;
    popoverWidth = popoverProps.width;
    popoverProps = popoverRest;
  }

  /**
   * Search helpers
   */
  const searchOnFocus = (e: any) => {
    setInputHasFocus(true);
    searchProps && searchProps.onFocus && searchProps.onFocus(e);
  };

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

  /**
   * List option renderer
   */
  const formattedOptions = options.map(
    (item: EuiSelectableTemplateSitewideSchema) => {
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
    }
  );

  const renderOption = (option: EuiSelectableOption, searchValue: string) => {
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

  const loadingMessage = (
    <EuiSelectableMessage style={{ minHeight: 300 }}>
      <EuiLoadingSpinner size="l" />
      <br />
      <p>{'Loading results'}</p>
    </EuiSelectableMessage>
  );

  const emptyMessage = (
    <EuiSelectableMessage style={{ minHeight: 300 }}>
      <p>{'No results available'}</p>
    </EuiSelectableMessage>
  );

  return (
    <EuiSelectable
      isLoading={isLoading}
      options={formattedOptions}
      renderOption={renderOption}
      singleSelection={true}
      searchProps={{
        placeholder: searchPlaceholder,
        isClearable: true,
        ...searchProps,
        onFocus: searchOnFocus,
        className: searchClasses,
      }}
      listProps={{
        rowHeight: 68,
        showIcons: false,
        onFocusBadge: {
          iconSide: 'right',
          children: (
            <EuiI18n
              token="euiSelectableTemplateSitewide.onFocusBadgeGoTo"
              default="Go to"
            />
          ),
        },
        ...listProps,
        className: listClasses,
      }}
      loadingMessage={loadingMessage}
      emptyMessage={emptyMessage}
      noMatchesMessage={emptyMessage}
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
          <div style={{ width: popoverWidth, maxWidth: '100%' }}>
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
