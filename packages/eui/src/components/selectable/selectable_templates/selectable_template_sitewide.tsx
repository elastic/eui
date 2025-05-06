/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  CSSProperties,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import {
  useCombinedRefs,
  useCurrentEuiBreakpoint,
  useEuiMemoizedStyles,
} from '../../../services';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { ENTER } from '../../../services/keys';
import { useEuiI18n, EuiI18n } from '../../i18n';
import { EuiPopoverTitle, EuiPopoverFooter } from '../../popover';
import { EuiPopover, Props as PopoverProps } from '../../popover/popover';
import { EuiLoadingSpinner } from '../../loading';
import { EuiSpacer } from '../../spacer';

import { EuiSelectable, EuiSelectableProps } from '../selectable';
import { EuiSelectableMessage } from '../selectable_message';
import {
  EuiSelectableTemplateSitewideOption,
  euiSelectableTemplateSitewideFormatOptions,
  euiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';
import { euiSelectableTemplateSitewideStyles } from './selectable_template_sitewide.styles';

export type EuiSelectableTemplateSitewideProps = Partial<
  Omit<EuiSelectableProps<{ [key: string]: any }>, 'options'>
> & {
  /**
   * Extends the typical EuiSelectable {@link EuiSelectableTemplateSitewideOption} with the addition of pre-composed elements
   * such as `icon`, `avatar` and `meta`
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
   * Optionally provide a separate button for toggling the display of the popover.
   */
  popoverButton?: ReactElement;
  /**
   * Pass an array of named breakpoints for which to show the `popoverButton`.
   * If `undefined`, the `popoverButton` will always show (if provided)
   */
  popoverButtonBreakpoints?: EuiBreakpointSize[];
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
  isLoading,
  popoverButton,
  popoverButtonBreakpoints,
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
   * Popover helpers
   */
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const {
    closePopover: _closePopover,
    panelRef,
    width,
    ...popoverRest
  } = {
    ...popoverProps,
  };

  const closePopover = () => {
    setPopoverIsOpen(false);
    _closePopover && _closePopover();
  };

  const togglePopover = useCallback(() => {
    setPopoverIsOpen((isOpen) => !isOpen);
  }, []);

  // Width applied to the internal div
  const popoverWidth: CSSProperties['width'] = width || 600;
  const setPanelRef = useCombinedRefs([setPopoverRef, panelRef]);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps?.onFocus?.(e);
    setPopoverIsOpen(true);
  };

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    searchProps?.onInput?.(e);
    setPopoverIsOpen(true);
  };

  const onSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    searchProps?.onKeyDown?.(e);
    if (e.key === ENTER) {
      setPopoverIsOpen(true);
    }
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps?.onBlur?.(e);
    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      setPopoverIsOpen(false);
    }
  };

  /**
   * Classes & styles
   */
  const styles = useEuiMemoizedStyles(euiSelectableTemplateSitewideStyles);
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
  const formattedOptions = euiSelectableTemplateSitewideFormatOptions(
    options,
    styles
  );

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
   * Changes based on showing the `popoverButton` if provided.
   * This will move the search input into the popover
   * and use the passed `popoverButton` as the popover trigger.
   */
  const currentBreakpoint = useCurrentEuiBreakpoint();
  const canShowPopoverButton = useMemo(() => {
    if (!popoverButtonBreakpoints) return true;
    if (!currentBreakpoint) return false;
    return popoverButtonBreakpoints.includes(currentBreakpoint);
  }, [currentBreakpoint, popoverButtonBreakpoints]);

  const popoverTrigger = useMemo(() => {
    if (!popoverButton || !canShowPopoverButton) return;
    return (
      <span
        className="euiSelectableTemplateSitewide__popoverTrigger"
        onClick={togglePopover}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {popoverButton}
      </span>
    );
  }, [popoverButton, canShowPopoverButton, togglePopover]);

  return (
    <EuiSelectable
      css={styles.euiSelectableTemplateSitewide}
      className={classes}
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
        onKeyDown: onSearchKeydown,
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
      searchable
    >
      {(list, search) => (
        <EuiPopover
          panelPaddingSize="none"
          isOpen={popoverIsOpen}
          ownFocus={!!popoverTrigger}
          display={popoverTrigger ? 'inline-block' : 'block'}
          {...popoverRest}
          panelRef={setPanelRef}
          button={popoverTrigger ? popoverTrigger : search!}
          closePopover={closePopover}
        >
          <div style={{ width: popoverWidth, maxWidth: '100%' }}>
            {popoverTitle || popoverTrigger ? (
              <EuiPopoverTitle paddingSize="s">
                {popoverTitle}
                {popoverTitle && search && <EuiSpacer />}
                {search}
              </EuiPopoverTitle>
            ) : undefined}
            {list}
            {popoverFooter && (
              <EuiPopoverFooter paddingSize="s">
                {popoverFooter}
              </EuiPopoverFooter>
            )}
          </div>
        </EuiPopover>
      )}
    </EuiSelectable>
  );
};
