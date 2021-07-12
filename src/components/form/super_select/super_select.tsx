/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { EuiScreenReaderOnly } from '../../accessibility';
import {
  EuiSuperSelectControl,
  EuiSuperSelectControlProps,
  EuiSuperSelectOption,
} from './super_select_control';
import { EuiInputPopover } from '../../popover';
import {
  EuiContextMenuItem,
  EuiContextMenuItemLayoutAlignment,
} from '../../context_menu';
import { keys } from '../../../services';
import { EuiI18n } from '../../i18n';

enum ShiftDirection {
  BACK = 'back',
  FORWARD = 'forward',
}

export type EuiSuperSelectProps<T extends string> = CommonProps &
  Omit<
    EuiSuperSelectControlProps<T>,
    'onChange' | 'onClick' | 'options' | 'value'
  > & {
    /**
     * Pass an array of options that must at least include:
     * `value`: storing unique value of item,
     * `inputDisplay`: what shows inside the form input when selected
     * `dropdownDisplay` (optional): what shows for the item in the dropdown
     */
    options: Array<EuiSuperSelectOption<T>>;

    valueOfSelected?: T;

    /**
     * Classes for the context menu item
     */
    itemClassName?: string;

    /**
     * You must pass an `onChange` function to handle the update of the value
     */
    onChange?: (value: T) => void;

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
     * Applied to the outermost wrapper (popover)
     */
    popoverClassName?: string;

    /**
     * Controls whether the options are shown. Default: false
     */
    isOpen?: boolean;
  };

export class EuiSuperSelect<T extends string> extends Component<
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

        if (this.props.valueOfSelected != null) {
          if (indexOfSelected != null) {
            this.focusItemAt(indexOfSelected);
          } else {
            focusSelected();
          }
        }
      });
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  itemClicked = (value: T) => {
    this.setState({
      isPopoverOpen: false,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  onSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === keys.ARROW_UP || event.key === keys.ARROW_DOWN) {
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
        // no-op
        event.preventDefault();
        event.stopPropagation();
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
    const targetElement = this.itemNodes[index];
    if (targetElement != null) {
      targetElement.focus();
    }
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
      if (direction === ShiftDirection.BACK) {
        targetElementIndex =
          currentIndex === 0 ? this.itemNodes.length - 1 : currentIndex - 1;
      } else {
        targetElementIndex =
          currentIndex === this.itemNodes.length - 1 ? 0 : currentIndex + 1;
      }
    }

    this.focusItemAt(targetElementIndex);
  }

  render() {
    const {
      className,
      options,
      valueOfSelected,
      onChange,
      isOpen,
      isInvalid,
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      fullWidth,
      popoverClassName,
      compressed,
      ...rest
    } = this.props;

    const popoverClasses = classNames('euiSuperSelect', popoverClassName);

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
        onClick={
          this.state.isPopoverOpen ? this.closePopover : this.openPopover
        }
        onKeyDown={this.onSelectKeyDown}
        className={buttonClasses}
        fullWidth={fullWidth}
        isInvalid={isInvalid}
        compressed={compressed}
        {...rest}
      />
    );

    const items = options.map((option, index) => {
      const { value, dropdownDisplay, inputDisplay, ...optionRest } = option;

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
          id={value}
          aria-selected={valueOfSelected === value}
          {...optionRest}>
          {dropdownDisplay || inputDisplay}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiInputPopover
        className={popoverClasses}
        input={button}
        isOpen={isOpen || this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        fullWidth={fullWidth}>
        <EuiScreenReaderOnly>
          <p role="alert">
            <EuiI18n
              token="euiSuperSelect.screenReaderAnnouncement"
              default="You are in a form selector of {optionsCount} items and must select a single option.
              Use the up and down keys to navigate or escape to close."
              values={{ optionsCount: options.length }}
            />
          </p>
        </EuiScreenReaderOnly>
        <div
          className="euiSuperSelect__listbox"
          role="listbox"
          aria-activedescendant={valueOfSelected}
          tabIndex={0}>
          {items}
        </div>
      </EuiInputPopover>
    );
  }
}
