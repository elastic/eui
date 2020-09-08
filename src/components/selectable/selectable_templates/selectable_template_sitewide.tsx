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
import { useCombinedRefs } from '../../../services';
import { EuiSelectable, EuiSelectableProps } from '../selectable';
import { EuiPopoverTitle, EuiPopoverFooter } from '../../popover';
import { EuiPopover, Props as PopoverProps } from '../../popover/popover';
import { useEuiI18n, EuiI18n } from '../../i18n';
import { EuiSelectableMessage } from '../selectable_message';
import { EuiLoadingSpinner } from '../../loading';
import {
  EuiSelectableTemplateSitewideOption,
  euiSelectableTemplateSitewideFormatOptions,
  euiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';

export type EuiSelectableTemplateSitewideProps = Partial<
  Omit<EuiSelectableProps<{ [key: string]: any }>, 'options'>
> & {
  /**
   * Extends the typical EuiSelectable #Options with the addition of pre-composed elements
   * such as `icon`, `avatar`and `meta`
   */
  options: EuiSelectableTemplateSitewideOption[];
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
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const { closePopover: _closePopover, panelRef, width, ...popoverRest } = {
    ...popoverProps,
  };

  const closePopover = () => {
    setInputHasFocus(false);
    _closePopover && _closePopover();
  };

  // Width applied to the internal div
  const popoverWidth: CSSProperties['width'] = width || 600;
  const setPanelRef = useCombinedRefs([setPopoverRef, panelRef]);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onFocus && searchProps.onFocus(e);
    setInputHasFocus(true);
  };

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    searchProps && searchProps.onInput && searchProps.onInput(e);
    setInputHasFocus(true);
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onBlur && searchProps.onBlur(e);
    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      setInputHasFocus(false);
    }
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
   * List options
   */
  const formattedOptions = euiSelectableTemplateSitewideFormatOptions(options);

  const loadingMessage = (
    <EuiSelectableMessage style={{ minHeight: 300 }}>
      <EuiLoadingSpinner size="l" />
      <br />
      <p>
        <EuiI18n
          token="euiSelectableTemplateSitewide.loadingResults"
          default="Loading results"
        />
      </p>
    </EuiSelectableMessage>
  );

  const emptyMessage = (
    <EuiSelectableMessage style={{ minHeight: 300 }}>
      <p>
        <EuiI18n
          token="euiSelectableTemplateSitewide.noResults"
          default="No results available"
        />
      </p>
    </EuiSelectableMessage>
  );

  return (
    <EuiSelectable
      isLoading={isLoading}
      options={formattedOptions}
      renderOption={euiSelectableTemplateSitewideRenderOptions}
      singleSelection={true}
      searchProps={{
        placeholder: searchPlaceholder,
        isClearable: true,
        ...searchProps,
        onFocus: searchOnFocus,
        onBlur: searchOnBlur,
        onInput: onSearchInput,
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
          {...popoverRest}
          panelRef={setPanelRef}
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
