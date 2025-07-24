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
  useContext,
} from 'react';
import classNames from 'classnames';

import {
  COLOR_MODES_STANDARD,
  EuiNestedThemeContext,
  EuiThemeColorMode,
  EuiThemeColorModeStandard,
  EuiThemeProvider,
  useCombinedRefs,
  useCurrentEuiBreakpoint,
  useEuiMemoizedStyles,
  useEuiTheme,
  useEuiThemeRefreshVariant,
} from '../../../services';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { ENTER } from '../../../services/keys';
import { useEuiI18n, EuiI18n } from '../../i18n';
import { Props as PopoverProps } from '../../popover/popover';
import { EuiLoadingSpinner } from '../../loading';

import { EuiSelectable, EuiSelectableProps } from '../selectable';
import { EuiSelectableMessage } from '../selectable_message';
import {
  EuiSelectableTemplateSitewideOption,
  euiSelectableTemplateSitewideFormatOptions,
  euiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';
import { euiSelectableTemplateSitewideStyles } from './selectable_template_sitewide.styles';
import { EuiSelectableTemplateSitewidePopover } from './selectable_template_sitewide_popover';

export type EuiSelectableTemplateSitewideTheme =
  | 'default'
  | 'global'
  | EuiThemeColorMode;

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

  /**
   * Manually sets the color mode for the search input and popover. It supports the common `colorMode`
   * values: `light`, `dark`, `inverse` and additionally `default` and `global`.
   *
   * `default` applies the local (nearest) context `colorMode`.
   * `global` applies the global context `colorMode`
   */
  colorModes?: {
    search: EuiSelectableTemplateSitewideTheme;
    popover: EuiSelectableTemplateSitewideTheme;
  };
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
  colorModes = { search: 'default', popover: 'default' },
  ...rest
}) => {
  const { colorMode } = useEuiTheme();
  const isRefreshVariant = useEuiThemeRefreshVariant('formVariant');

  const { hasDifferentColorFromGlobalTheme } = useContext(
    EuiNestedThemeContext
  );

  const _searchColorMode = colorModes?.search?.toLowerCase();
  const _popoverColorMode = colorModes?.popover?.toLowerCase();

  const searchColorMode = useMemo(() => {
    const isStaticTheme = [
      COLOR_MODES_STANDARD.light.toLowerCase(),
      COLOR_MODES_STANDARD.dark.toLowerCase(),
    ].includes(_searchColorMode);

    return isStaticTheme
      ? (_searchColorMode as EuiThemeColorModeStandard)
      : _searchColorMode === 'inverse'
      ? colorMode === COLOR_MODES_STANDARD.dark
        ? COLOR_MODES_STANDARD.light
        : COLOR_MODES_STANDARD.dark
      : colorMode;
  }, [colorMode, _searchColorMode]);

  const popoverColorMode = useMemo(() => {
    const isStaticTheme = [
      COLOR_MODES_STANDARD.light.toLowerCase(),
      COLOR_MODES_STANDARD.dark.toLowerCase(),
    ].includes(_popoverColorMode);
    const inverseColorMode =
      colorMode === COLOR_MODES_STANDARD.dark
        ? COLOR_MODES_STANDARD.light
        : COLOR_MODES_STANDARD.dark;
    const globalColorMode = hasDifferentColorFromGlobalTheme
      ? colorMode === COLOR_MODES_STANDARD.dark
        ? COLOR_MODES_STANDARD.light
        : COLOR_MODES_STANDARD.dark
      : colorMode;

    return isStaticTheme
      ? (_popoverColorMode as EuiThemeColorModeStandard)
      : _popoverColorMode === 'inverse'
      ? inverseColorMode
      : _popoverColorMode === 'global'
      ? globalColorMode
      : colorMode;
  }, [hasDifferentColorFromGlobalTheme, colorMode, _popoverColorMode]);

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
      {(list, search) => {
        const _search =
          isRefreshVariant && !popoverTrigger ? (
            <EuiThemeProvider colorMode={searchColorMode}>
              {search}
            </EuiThemeProvider>
          ) : (
            search
          );

        // uses standalone subcomponent to ensure scoped style/theme context
        const popover = (
          <EuiSelectableTemplateSitewidePopover
            isOpen={popoverIsOpen}
            trigger={popoverTrigger}
            search={_search}
            list={list}
            title={popoverTitle}
            footer={popoverFooter}
            width={popoverWidth}
            panelRef={setPanelRef}
            closePopover={closePopover}
            {...popoverRest}
          />
        );

        return isRefreshVariant ? (
          <EuiThemeProvider
            wrapperProps={{ cloneElement: true }}
            colorMode={popoverColorMode}
          >
            {popover}
          </EuiThemeProvider>
        ) : (
          popover
        );
      }}
    </EuiSelectable>
  );
};
