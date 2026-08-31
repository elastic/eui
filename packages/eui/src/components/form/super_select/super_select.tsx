/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FocusEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import {
  htmlIdGenerator,
  keys,
  RenderWithEuiStylesMemoizer,
} from '../../../services';
import { CommonProps } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiInputPopover, type EuiInputPopoverProps } from '../../popover';

import {
  EuiSuperSelectControl,
  type EuiSuperSelectControlProps,
} from './super_select_control';
import {
  EuiSuperSelectItem,
  type EuiSuperSelectOption,
} from './super_select_item';
import { euiSuperSelectStyles } from './super_select.styles';

enum ShiftDirection {
  BACK = 'back',
  FORWARD = 'forward',
}

export type EuiSuperSelectProps<T = string> = CommonProps &
  Omit<
    EuiSuperSelectControlProps<T>,
    'onChange' | 'onClick' | 'onFocus' | 'onBlur' | 'options' | 'value'
  > & {
    /**
     * Pass an array of options that must at least include:
     * `value`: storing unique value of item,
     * `inputDisplay`: what shows inside the form input when selected
     * `dropdownDisplay` (optional): what shows for the item in the dropdown
     */
    options: Array<EuiSuperSelectOption<T>>;

    valueOfSelected?: NonNullable<T>;

    /**
     * Placeholder to display when the current selected value is empty.
     */
    placeholder?: ReactNode;

    /**
     * Classes for the context menu item
     */
    itemClassName?: string;

    /**
     * You must pass an `onChange` function to handle the update of the value
     */
    onChange?: (value: T) => void;
    onFocus?: (event?: FocusEvent) => void;
    onBlur?: (event?: FocusEvent) => void;

    /**
     * Controls whether the options are shown. Default: false
     */
    isOpen?: boolean;

    /**
     * Optional props to pass to the underlying [EuiInputPopover](https://eui.elastic.co/docs/components/containers/popover/).
     * Allows fine-grained control of the popover dropdown menu, including
     * `repositionOnScroll` for EuiSuperSelects used within scrollable containers,
     * and customizing popover panel styling.
     *
     * Does not accept a nested `popoverProps.isOpen` property - use the top level
     * `isOpen` API instead.
     */
    popoverProps?: Partial<CommonProps & Omit<EuiInputPopoverProps, 'isOpen'>>;
  };

export const EuiSuperSelect = <T = string,>({
  className,
  options,
  valueOfSelected,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  isOpen,
  isInvalid = false,
  itemClassName,
  fullWidth = false,
  popoverProps,
  compressed = false,
  isLoading = false,
  ...rest
}: EuiSuperSelectProps<T>) => {
  const itemNodes = useRef<Array<HTMLButtonElement | null>>([]);
  const isMounted = useRef(false);
  const controlButtonRef = useRef<HTMLButtonElement>(null);
  const [describedById] = useState(() =>
    htmlIdGenerator('euiSuperSelect_')('_screenreaderDescribeId')
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(isOpen || false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setItemNode = (node: HTMLButtonElement | null, index: number) => {
    itemNodes.current[index] = node;
  };

  const focusItemAt = (index: number) => {
    itemNodes.current[index]?.focus();
  };

  const openPopover = () => {
    const indexOfSelected = options.findIndex(
      (option) => option?.value === valueOfSelected
    );
    const candidateIndex =
      valueOfSelected != null && indexOfSelected >= 0 ? indexOfSelected : 0;

    let initialIndex = candidateIndex;

    // If the item is disabled, find the first focusable item going forward
    while (initialIndex < options.length && options[initialIndex]?.disabled) {
      initialIndex++;
    }
    if (initialIndex >= options.length) {
      initialIndex = candidateIndex;
    }

    setIsPopoverOpen(options.length > 0);
    setCurrentIndex(initialIndex);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!isMounted.current) {
          return;
        }

        focusItemAt(initialIndex);

        if (onFocus) {
          onFocus();
        }
      });
    });
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setCurrentIndex(-1);

    // Refocus back to the toggling control button on popover close
    requestAnimationFrame(() => {
      controlButtonRef.current?.focus();
    });

    if (onBlur) {
      onBlur();
    }
  };

  const itemClicked = (value: T) => {
    closePopover();

    if (onChange) {
      onChange(value);
    }
  };

  const onSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Mimic the ways native `<select>`s can be opened via keypress
    if (
      event.key === keys.ARROW_UP ||
      event.key === keys.ARROW_DOWN ||
      event.key === keys.SPACE
    ) {
      event.preventDefault();
      event.stopPropagation();
      openPopover();
    }
  };

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        // close the popover and prevent ancestors from handling
        event.preventDefault();
        event.stopPropagation();
        closePopover();
        break;

      case keys.TAB:
        // Mimic native `<select>` behavior, which selects an item on tab press
        event.preventDefault();
        event.stopPropagation();
        (event.target as HTMLButtonElement).click();
        break;

      case keys.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        shiftFocus(ShiftDirection.BACK);
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        shiftFocus(ShiftDirection.FORWARD);
        break;
    }
  };

  const shiftFocus = (direction: ShiftDirection) => {
    if (currentIndex === -1) {
      // somehow the select options has lost focus
      focusItemAt(0);
      setCurrentIndex(0);
      return;
    }

    // Note: this component purposely does not cycle arrow key navigation
    // to match native <select> elements
    const step = direction === ShiftDirection.BACK ? -1 : 1;
    let nextIndex = currentIndex + step;
    while (nextIndex >= 0 && nextIndex < options.length) {
      if (!options[nextIndex]?.disabled) {
        focusItemAt(nextIndex);
        setCurrentIndex(nextIndex);
        return;
      }
      nextIndex += step;
    }
  };

  useEffect(() => {
    isMounted.current = true;
    if (isOpen) {
      openPopover();
    }

    return () => {
      isMounted.current = false;
    };
    // The class lifecycle this replaces only ran when the component mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popoverClasses = classNames('euiSuperSelect', popoverProps?.className);

  const button = (
    <EuiSuperSelectControl
      options={options}
      value={valueOfSelected}
      placeholder={placeholder}
      onClick={isPopoverOpen ? closePopover : openPopover}
      onKeyDown={onSelectKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      fullWidth={fullWidth}
      isInvalid={isInvalid}
      compressed={compressed}
      isLoading={isLoading}
      {...rest}
      buttonRef={controlButtonRef}
      isDropdownOpen={isPopoverOpen}
    />
  );

  const items = options.map((option, index) => {
    const { value, dropdownDisplay, inputDisplay, disabled, ...optionRest } =
      option;
    if (value == null) return;

    return (
      <EuiSuperSelectItem
        key={index}
        /* NOTE: This should rather use "li" to align select-like behavior. But the current
          implementation relies on the interactive and focusable item for the navigation.
          This will require additional refactoring to adjust but we might want to decide first
          if the effort is worth it, considering the unification plans for selection components
          as part of OneSelect (https://github.com/elastic/eui/issues/8808).
          */
        element="button"
        id={String(value)}
        className={itemClassName}
        checked={valueOfSelected === value ? 'on' : undefined}
        isSelected={valueOfSelected === value}
        isFocused={currentIndex === index}
        isSingleSelection
        isDisabled={disabled}
        textWrap="wrap"
        onClick={() => itemClicked(value)}
        onKeyDown={onItemKeyDown}
        ref={(node: HTMLButtonElement | null) => setItemNode(node, index)}
        aria-selected={valueOfSelected === value}
        {...optionRest}
      >
        {dropdownDisplay || inputDisplay}
      </EuiSuperSelectItem>
    );
  });

  const ariaActiveDescendant =
    options[currentIndex]?.value != null
      ? String(options[currentIndex].value)
      : undefined;

  return (
    <RenderWithEuiStylesMemoizer>
      {(stylesMemoizer) => {
        const styles = stylesMemoizer(euiSuperSelectStyles);

        return (
          <EuiInputPopover
            closePopover={closePopover}
            panelPaddingSize="none"
            {...popoverProps}
            className={popoverClasses}
            isOpen={isOpen || isPopoverOpen}
            input={button}
            fullWidth={fullWidth}
            disableFocusTrap // This component handles its own focus manually
          >
            <EuiScreenReaderOnly>
              <p id={describedById}>
                <EuiI18n
                  token="euiSuperSelect.screenReaderAnnouncement"
                  default="You are in a form selector and must select a single option.
              Use the Up and Down arrow keys to navigate or Escape to close."
                />
              </p>
            </EuiScreenReaderOnly>
            <EuiI18n token="euiSuperSelect.ariaLabel" default="Select listbox">
              {(ariaLabel: string) => (
                <div
                  aria-label={ariaLabel}
                  aria-describedby={describedById}
                  css={styles.euiSuperSelect__listbox}
                  className="euiSuperSelect__listbox eui-scrollBar"
                  role="listbox"
                  aria-activedescendant={ariaActiveDescendant}
                  tabIndex={0}
                >
                  {items}
                </div>
              )}
            </EuiI18n>
          </EuiInputPopover>
        );
      }}
    </RenderWithEuiStylesMemoizer>
  );
};
