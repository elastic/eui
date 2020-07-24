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
import {
  EuiSelectableOption,
  EuiSelectableLIOption,
} from '../selectable_option';
import { EuiPopoverTitle, EuiPopoverFooter } from '../../popover';
import { EuiPopover, Props as PopoverProps } from '../../popover/popover';
import { EuiHighlight } from '../../highlight';
import { useEuiI18n, EuiI18n } from '../../i18n';

interface MetaData extends CommonProps {
  /**
   * Required to display the metadata
   */
  text: string;
  /**
   * Required to style the metadata appropriately
   */
  type?: 'app' | 'deployment' | 'article' | 'case' | 'platform';
  /**
   * Override the color provided by the `type`
   */
  color?: string;
  /**
   * Override the font-weight provided by the `type`
   */
  fontWeight?: 'normal' | 'bold';
}

export type EuiSelectableTemplateSitewideSchema = EuiSelectableLIOption & {
  /**
   * Displayed on the left.
   * Object of `EuiIconProps`
   */
  icon?: EuiIconProps;
  /**
   * Displayed on the right
   * Object of `EuiAvatarProps`
   */
  avatar?: EuiAvatarProps;
  /**
   * An array of inline metadata displayed beneath the label and separated by bullets.
   * Each item requires `text` and a `type`
   */
  meta?: MetaData[];
};

export type EuiSelectableTemplateSitewideProps = Partial<EuiSelectableProps> & {
  /**
   * Extend the typical EuiSelectableLiOption with the addition of
   * `icon`: Object of `EuiIconProps` for creating the `prepend`;
   * `avatar`: Object of `EuiAvatarProps` for creating the `append` for Space (default) or User;
   * `meta`: A list of #MetaData items to be displayed beneath the label and separated by bullets;
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
  if (popoverProps && popoverProps.width) {
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

  /**
   * List option renderer
   */
  const formattedOptions = options.map(
    (item: EuiSelectableTemplateSitewideSchema) => {
      return {
        key: item.label,
        label: item.label,
        ...item,
        className: classNames(
          'euiSelectableTemplateSitewide__listItem',
          item.className
        ),
        prepend: item.icon ? (
          <EuiIcon color="subdued" {...item.icon} size="l" />
        ) : (
          undefined
        ),
        append: item.avatar ? (
          <EuiAvatar type="space" size="s" {...item.avatar} />
        ) : (
          undefined
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

  return (
    <EuiSelectable
      options={formattedOptions}
      renderOption={renderOption}
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
        onFocusBadgeContent: (
          <EuiI18n
            token="euiSelectableTemplateSitewide.onFocusBadgeContentGoTo"
            default="Go to {enterSymbol}"
            values={{
              enterSymbol: <small>↩</small>,
            }}
          />
        ),
        ...listProps,
        className: listClasses,
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

// TODO: Any better way to handle Meta types?
function renderOptionMeta(
  meta?: MetaData[],
  searchValue: string = ''
): ReactNode {
  if (!meta || meta.length < 1) return;
  const metas = meta.map((meta: MetaData) => {
    // Start with the base and custom classes provided be `fontWeight` or `className`
    let metaClasses = classNames('euiSelectableTemplateSitewide__optionMeta', [
      meta.fontWeight
        ? `euiSelectableTemplateSitewide__optionMeta--${meta.fontWeight}`
        : undefined,
      meta.className,
    ]);

    // If they provide one of the specified types, create the class and append
    if (meta.type) {
      metaClasses = classNames(
        [`euiSelectableTemplateSitewide__optionMeta--${meta.type}`],
        metaClasses
      );
    }

    return (
      <EuiHighlight
        search={searchValue}
        className={metaClasses}
        key={meta.text}
        style={{ color: meta.color }}>
        {meta.text}
      </EuiHighlight>
    );
  });

  return (
    <>
      <br />
      <span className="euiSelectableTemplateSitewide__optionMetasList">
        {metas}
      </span>
    </>
  );
}
