/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, FocusEvent, ReactNode, createRef } from 'react';
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
     * Optional props to pass to the underlying [EuiInputPopover](/#/layout/popover#popover-attached-to-input-element).
     * Allows fine-grained control of the popover dropdown menu, including
     * `repositionOnScroll` for EuiSuperSelects used within scrollable containers,
     * and customizing popover panel styling.
     *
     * Does not accept a nested `popoverProps.isOpen` property - use the top level
     * `isOpen` API instead.
     */
    popoverProps?: Partial<CommonProps & Omit<EuiInputPopoverProps, 'isOpen'>>;
  };

export class EuiSuperSelect<T = string> extends Component<
  EuiSuperSelectProps<T>
> {
  static defaultProps = {
    fullWidth: false,
    compressed: false,
    isInvalid: false,
    isLoading: false,
  };

  private itemNodes: Array<HTMLButtonElement | null> = [];
  private _isMounted: boolean = false;
  private controlButtonRef = createRef<HTMLButtonElement>();

  describedById = htmlIdGenerator('euiSuperSelect_')('_screenreaderDescribeId');

  state = {
    isPopoverOpen: this.props.isOpen || false,
    currentIndex: 0,
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.isOpen) {
      this.openPopover();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItemNode = (node: HTMLButtonElement | null, index: number) => {
    this.itemNodes[index] = node;
  };

  openPopover = () => {
    const { options, valueOfSelected } = this.props;

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

    this.setState({
      isPopoverOpen: options.length > 0,
      currentIndex: initialIndex,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!this._isMounted) {
          return;
        }

        this.focusItemAt(initialIndex);

        if (this.props.onFocus) {
          this.props.onFocus();
        }
      });
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
      currentIndex: -1,
    });

    // Refocus back to the toggling control button on popover close
    requestAnimationFrame(() => {
      this.controlButtonRef.current?.focus();
    });

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  itemClicked = (value: T) => {
    this.closePopover();

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  onSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Mimic the ways native `<select>`s can be opened via keypress
    if (
      event.key === keys.ARROW_UP ||
      event.key === keys.ARROW_DOWN ||
      event.key === keys.SPACE
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.openPopover();
    }
  };

  onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        // close the popover and prevent ancestors from handling
        event.preventDefault();
        event.stopPropagation();
        this.closePopover();
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
        this.shiftFocus(ShiftDirection.BACK);
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        this.shiftFocus(ShiftDirection.FORWARD);
        break;
    }
  };

  focusItemAt(index: number) {
    this.itemNodes[index]?.focus();
  }

  shiftFocus(direction: ShiftDirection) {
    const { options } = this.props;
    const { currentIndex } = this.state;

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      this.focusItemAt(0);
      this.setState({ currentIndex: 0 });
      return;
    }

    // Note: this component purposely does not cycle arrow key navigation
    // to match native <select> elements
    const step = direction === ShiftDirection.BACK ? -1 : 1;
    let nextIndex = currentIndex + step;
    while (nextIndex >= 0 && nextIndex < options.length) {
      if (!options[nextIndex]?.disabled) {
        this.focusItemAt(nextIndex);
        this.setState({ currentIndex: nextIndex });
        return;
      }
      nextIndex += step;
    }
  }

  render() {
    const {
      className,
      options,
      valueOfSelected,
      placeholder,
      onChange,
      isOpen,
      isInvalid,
      itemClassName,
      fullWidth,
      popoverProps,
      compressed,
      ...rest
    } = this.props;

    const popoverClasses = classNames(
      'euiSuperSelect',
      popoverProps?.className
    );

    const button = (
      <EuiSuperSelectControl
        options={options}
        value={valueOfSelected}
        placeholder={placeholder}
        onClick={
          this.state.isPopoverOpen ? this.closePopover : this.openPopover
        }
        onKeyDown={this.onSelectKeyDown}
        className={className}
        fullWidth={fullWidth}
        isInvalid={isInvalid}
        compressed={compressed}
        {...rest}
        buttonRef={this.controlButtonRef}
        isDropdownOpen={this.state.isPopoverOpen}
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
          isFocused={this.state.currentIndex === index}
          isSingleSelection
          isDisabled={disabled}
          textWrap="wrap"
          onClick={() => this.itemClicked(value)}
          onKeyDown={this.onItemKeyDown}
          ref={(node: HTMLButtonElement | null) =>
            this.setItemNode(node, index)
          }
          aria-selected={valueOfSelected === value}
          {...optionRest}
        >
          {dropdownDisplay || inputDisplay}
        </EuiSuperSelectItem>
      );
    });

    const ariaActiveDescendant =
      options[this.state.currentIndex]?.value != null
        ? String(options[this.state.currentIndex].value)
        : undefined;

    return (
      <RenderWithEuiStylesMemoizer>
        {(stylesMemoizer) => {
          const styles = stylesMemoizer(euiSuperSelectStyles);

          return (
            <EuiInputPopover
              closePopover={this.closePopover}
              panelPaddingSize="none"
              {...popoverProps}
              className={popoverClasses}
              isOpen={isOpen || this.state.isPopoverOpen}
              input={button}
              fullWidth={fullWidth}
              disableFocusTrap // This component handles its own focus manually
            >
              <EuiScreenReaderOnly>
                <p id={this.describedById}>
                  <EuiI18n
                    token="euiSuperSelect.screenReaderAnnouncement"
                    default="You are in a form selector and must select a single option.
              Use the Up and Down arrow keys to navigate or Escape to close."
                  />
                </p>
              </EuiScreenReaderOnly>
              <EuiI18n
                token="euiSuperSelect.ariaLabel"
                default="Select listbox"
              >
                {(ariaLabel: string) => (
                  <div
                    aria-label={ariaLabel}
                    aria-describedby={this.describedById}
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
  }
}
