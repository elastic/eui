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
  ReactElement,
  useEffect,
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
import { EuiBreakpointSize, BREAKPOINTS } from '../../../services/breakpoint';
import { throttle } from '../../color_picker/utils';
import { EuiSpacer } from '../../spacer';

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
  /**
   * Optionally provide a separate button for toggling the display of the mobile version.
   * If this is not provided, a mobile version will not be displayed.
   */
  mobileToggle?: ReactElement;
  /**
   * Change the default max breakpoint at which to switch from the mobile to desktop version
   */
  mobileBreakpointMax?: EuiBreakpointSize;
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
  mobileToggle,
  mobileBreakpointMax = 's',
  ...rest
}) => {
  /**
   * Breakpoint management
   */
  const [windowIsMobileSize, setWindowIsMobileSize] = useState(
    typeof window !== 'undefined' &&
      window.innerWidth <= BREAKPOINTS[mobileBreakpointMax]
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newWidthIsMobile =
      window.innerWidth <= BREAKPOINTS[mobileBreakpointMax];
    if (newWidthIsMobile !== windowIsMobileSize) {
      setWindowIsMobileSize(newWidthIsMobile);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [mobileToggle, mobileBreakpointMax, functionToCallOnWindowResize]);

  /**
   * i18n text
   */
  const [searchPlaceholder] = useEuiI18n(
    ['euiSelectableTemplateSitewide.searchPlaceholder'],
    ['Search for anything...']
  );

  /**
   * Popover helpers
   */
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { closePopover: _closePopover, panelRef, width, ...popoverRest } = {
    ...popoverProps,
  };

  const closePopover = () => {
    setPopoverIsOpen(false);
    _closePopover && _closePopover();
  };

  const togglePopover = () => {
    setPopoverIsOpen(!popoverIsOpen);
  };

  // Width applied to the internal div
  const popoverWidth: CSSProperties['width'] = width || 600;
  const setPanelRef = useCombinedRefs([setPopoverRef, panelRef]);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onFocus && searchProps.onFocus(e);
    setPopoverIsOpen(true);
  };

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    searchProps && searchProps.onInput && searchProps.onInput(e);
    setPopoverIsOpen(true);
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onBlur && searchProps.onBlur(e);
    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      setPopoverIsOpen(false);
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

  /**
   * Mobile specific elements and prop changes.
   * The mobile version basically moves the search input into the popover
   * and uses the passed `mobileToggle` as the popover button.
   */
  let popoverButton: ReactElement;
  if (mobileToggle && windowIsMobileSize) {
    popoverButton = React.cloneElement(mobileToggle, {
      ...mobileToggle.props,
      onClick: togglePopover,
    });
  }

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
          isOpen={popoverIsOpen}
          ownFocus={!!popoverButton}
          {...popoverRest}
          panelRef={setPanelRef}
          button={popoverButton ? popoverButton : search}
          closePopover={closePopover}>
          <div style={{ width: popoverWidth, maxWidth: '100%' }}>
            {popoverTitle || popoverButton ? (
              <EuiPopoverTitle>
                {popoverTitle}
                {popoverTitle && search && <EuiSpacer />}
                {search}
              </EuiPopoverTitle>
            ) : (
              undefined
            )}
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
