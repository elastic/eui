/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, FocusEvent, ReactNode, createRef } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { EuiScreenReaderOnly } from '../../accessibility';
import { htmlIdGenerator, keys } from '../../../services';
import {
  EuiSuperSelectControl,
  EuiSuperSelectControlProps,
  EuiSuperSelectOption,
} from './super_select_control';
import { EuiInputPopover, EuiInputPopoverProps } from '../../popover';
import {
  EuiContextMenuItem,
  EuiContextMenuItemLayoutAlignment,
} from '../../context_menu';

import { EuiI18n } from '../../i18n';

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
     * Change to `true` if you want horizontal lines between options.
     * This is best used when options are multi-line.
     */
    hasDividers?: boolean;

    /**
     * Change `EuiContextMenuItem` layout position of icon
     */
    itemLayoutAlign?: EuiContextMenuItemLayoutAlignment;

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
    hasDividers: false,
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
    this.setState({
      isPopoverOpen: true,
    });

    const focusSelected = () => {
      const indexOfSelected = this.props.options.reduce<number | null>(
        (indexOfSelected, option, index) => {
          if (indexOfSelected != null) return indexOfSelected;
          if (option == null) return null;
          return option.value === this.props.valueOfSelected ? index : null;
        },
        null
      );

      requestAnimationFrame(() => {
        if (!this._isMounted) {
          return;
        }

        if (this.props.valueOfSelected != null && indexOfSelected != null) {
          this.focusItemAt(indexOfSelected);
        } else {
          this.focusItemAt(0);
        }

        if (this.props.onFocus) {
          this.props.onFocus();
        }
      });
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
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

  focusItemAt(index: number, direction?: ShiftDirection) {
    let targetElement = this.itemNodes[index];
    // If the current index is disabled, find the next non-disabled element
    while (targetElement && targetElement.disabled) {
      direction === ShiftDirection.BACK ? index-- : index++;
      targetElement = this.itemNodes[index];
    }
    targetElement?.focus();
  }

  shiftFocus(direction: ShiftDirection) {
    const currentIndex = this.itemNodes.indexOf(
      document.activeElement as HTMLButtonElement
    );
    let targetElementIndex: number;

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      targetElementIndex = 0;
    } else {
      // Note: this component purposely does not cycle arrow key navigation
      // to match native <select> elements
      if (direction === ShiftDirection.BACK) {
        targetElementIndex = currentIndex - 1;
      } else {
        targetElementIndex = currentIndex + 1;
      }
    }

    this.focusItemAt(targetElementIndex, direction);
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
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      fullWidth,
      popoverProps,
      compressed,
      ...rest
    } = this.props;

    const popoverClasses = classNames(
      'euiSuperSelect',
      popoverProps?.className
    );

    const buttonClasses = classNames(
      {
        'euiSuperSelect--isOpen__button': this.state.isPopoverOpen,
      },
      className
    );

    const itemClasses = classNames(
      'euiSuperSelect__item',
      {
        'euiSuperSelect__item--hasDividers': hasDividers,
      },
      itemClassName
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
        className={buttonClasses}
        fullWidth={fullWidth}
        isInvalid={isInvalid}
        compressed={compressed}
        {...rest}
        buttonRef={this.controlButtonRef}
      />
    );

    const items = options.map((option, index) => {
      const { value, dropdownDisplay, inputDisplay, ...optionRest } = option;
      if (value == null) return;

      return (
        <EuiContextMenuItem
          key={index}
          className={itemClasses}
          icon={valueOfSelected === value ? 'check' : 'empty'}
          onClick={() => this.itemClicked(value)}
          onKeyDown={this.onItemKeyDown}
          layoutAlign={itemLayoutAlign}
          buttonRef={(node) => this.setItemNode(node, index)}
          role="option"
          id={String(value)}
          aria-selected={valueOfSelected === value}
          {...optionRest}
        >
          {dropdownDisplay || inputDisplay}
        </EuiContextMenuItem>
      );
    });

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
        <EuiI18n token="euiSuperSelect.ariaLabel" default="Select listbox">
          {(ariaLabel: string) => (
            <div
              aria-label={ariaLabel}
              aria-describedby={this.describedById}
              className="euiSuperSelect__listbox"
              role="listbox"
              aria-activedescendant={
                valueOfSelected != null ? String(valueOfSelected) : undefined
              }
              tabIndex={0}
            >
              {items}
            </div>
          )}
        </EuiI18n>
      </EuiInputPopover>
    );
  }
}
