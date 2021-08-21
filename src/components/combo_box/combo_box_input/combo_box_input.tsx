/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import { EuiScreenReaderOnly } from '../../accessibility';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../../form/form_control_layout';
import { EuiComboBoxPill } from './combo_box_pill';
import { htmlIdGenerator } from '../../../services';
import { EuiFormControlLayoutIconsProps } from '../../form/form_control_layout/form_control_layout_icons';
import {
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
  UpdatePositionHandler,
} from '../types';
import { CommonProps } from '../../common';

export interface EuiComboBoxInputProps<T> extends CommonProps {
  autoSizeInputRef?: RefCallback<AutosizeInput & HTMLInputElement>;
  compressed: boolean;
  focusedOptionId?: string;
  fullWidth?: boolean;
  hasSelectedOptions: boolean;
  id?: string;
  inputRef?: RefCallback<HTMLInputElement>;
  isDisabled?: boolean;
  isListOpen: boolean;
  noIcon: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (searchValue: string) => void;
  onClear?: () => void;
  onClick?: () => void;
  onCloseListClick: () => void;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onOpenListClick: () => void;
  onRemoveOption?: OptionHandler<T>;
  placeholder?: string;
  rootId: ReturnType<typeof htmlIdGenerator>;
  searchValue: string;
  selectedOptions?: Array<EuiComboBoxOptionOption<T>>;
  singleSelection?: boolean | EuiComboBoxSingleSelectionShape;
  toggleButtonRef?: RefCallback<HTMLButtonElement | HTMLSpanElement>;
  updatePosition: UpdatePositionHandler;
  value?: string;
  prepend?: EuiFormControlLayoutProps['prepend'];
  append?: EuiFormControlLayoutProps['append'];
  isLoading?: boolean;
  autoFocus?: boolean;
}

interface EuiComboBoxInputState {
  hasFocus: boolean;
}

export class EuiComboBoxInput<T> extends Component<
  EuiComboBoxInputProps<T>,
  EuiComboBoxInputState
> {
  state: EuiComboBoxInputState = {
    hasFocus: false,
  };

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition();
    });
  };

  onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    this.props.onFocus(event);
    this.setState({
      hasFocus: true,
    });
  };

  onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      hasFocus: false,
    });
  };

  componentDidUpdate(prevProps: EuiComboBoxInputProps<T>) {
    const { searchValue } = prevProps;

    // We need to update the position of everything if the user enters enough input to change
    // the size of the input.
    if (searchValue !== this.props.searchValue) {
      this.updatePosition();
    }
  }

  inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { onChange, searchValue } = this.props;
    if (onChange) {
      onChange(event.target.value as typeof searchValue);
    }
  };

  inputRefCallback = (ref: HTMLInputElement & AutosizeInput) => {
    const { autoSizeInputRef } = this.props;
    if (autoSizeInputRef) {
      autoSizeInputRef(ref);
    }
  };

  render() {
    const {
      compressed,
      focusedOptionId,
      fullWidth,
      hasSelectedOptions,
      id,
      inputRef,
      isDisabled,
      isListOpen,
      noIcon,
      onClear,
      onClick,
      onCloseListClick,
      onOpenListClick,
      onRemoveOption,
      placeholder,
      rootId,
      searchValue,
      selectedOptions,
      singleSelection: singleSelectionProp,
      toggleButtonRef,
      value,
      prepend,
      append,
      isLoading,
      autoFocus,
    } = this.props;

    const singleSelection = Boolean(singleSelectionProp);
    const asPlainText =
      (singleSelectionProp &&
        typeof singleSelectionProp === 'object' &&
        singleSelectionProp.asPlainText) ||
      false;

    const pills = selectedOptions
      ? selectedOptions.map((option) => {
          const { key, label, color, onClick, ...rest } = option;
          const pillOnClose =
            isDisabled || singleSelection || onClick
              ? undefined
              : onRemoveOption;
          return (
            <EuiComboBoxPill
              option={option}
              onClose={pillOnClose}
              key={key ?? label.toLowerCase()}
              color={color}
              onClick={onClick}
              onClickAriaLabel={onClick ? 'Change' : undefined}
              asPlainText={asPlainText}
              {...rest}
            >
              {label}
            </EuiComboBoxPill>
          );
        })
      : null;

    let removeOptionMessage;
    let removeOptionMessageId;

    if (this.state.hasFocus) {
      const readPlaceholder = placeholder ? `${placeholder}.` : '';
      const removeOptionMessageContent =
        `Combo box. Selected. ${
          searchValue ? `${searchValue}. Selected. ` : ''
        }${
          selectedOptions && selectedOptions.length > 0
            ? `${value}. Press Backspace to delete ${
                selectedOptions[selectedOptions.length - 1].label
              }. `
            : ''
        }Combo box input. ${readPlaceholder} Type some text or, to display a list of choices, press Down Arrow. ` +
        'To exit the list of choices, press Escape.';

      removeOptionMessageId = htmlIdGenerator()();

      // aria-live="assertive" will read this message aloud immediately once it enters the DOM.
      // We'll render to the DOM when the input gains focus and remove it when the input loses focus.
      // We'll use aria-hidden to prevent default aria information from being read by the screen
      // reader.
      removeOptionMessage = (
        <EuiScreenReaderOnly>
          <span aria-live="assertive" id={removeOptionMessageId}>
            {removeOptionMessageContent}
          </span>
        </EuiScreenReaderOnly>
      );
    }

    let placeholderMessage;

    if (
      placeholder &&
      selectedOptions &&
      !selectedOptions.length &&
      !searchValue
    ) {
      placeholderMessage = (
        <p className="euiComboBoxPlaceholder">{placeholder}</p>
      );
    }

    const clickProps: EuiFormControlLayoutIconsProps = {};
    if (!isDisabled && onClear && hasSelectedOptions) {
      clickProps.clear = {
        'data-test-subj': 'comboBoxClearButton',
        onClick: onClear,
      };
    }

    let icon: EuiFormControlLayoutIconsProps['icon'];
    if (!noIcon) {
      icon = {
        'aria-label': isListOpen
          ? 'Close list of options'
          : 'Open list of options',
        'data-test-subj': 'comboBoxToggleListButton',
        disabled: isDisabled,
        onClick: isListOpen && !isDisabled ? onCloseListClick : onOpenListClick,
        ref: toggleButtonRef,
        side: 'right',
        type: 'arrowDown',
      };
    }

    const wrapClasses = classNames('euiComboBox__inputWrap', {
      'euiComboBox__inputWrap--compressed': compressed,
      'euiComboBox__inputWrap--fullWidth': fullWidth,
      'euiComboBox__inputWrap--noWrap': singleSelection,
      'euiComboBox__inputWrap-isLoading': isLoading,
      'euiComboBox__inputWrap-isClearable': onClear,
      'euiComboBox__inputWrap--inGroup': prepend || append,
    });

    return (
      <EuiFormControlLayout
        icon={icon}
        {...clickProps}
        isLoading={isLoading}
        compressed={compressed}
        fullWidth={fullWidth}
        prepend={prepend}
        append={append}
      >
        <div
          className={wrapClasses}
          data-test-subj="comboBoxInput"
          onClick={onClick}
          tabIndex={-1} // becomes onBlur event's relatedTarget, otherwise relatedTarget is null when clicking on this div
        >
          {!singleSelection || !searchValue ? pills : null}
          {placeholderMessage}
          <AutosizeInput
            aria-activedescendant={focusedOptionId}
            aria-controls={isListOpen ? rootId('listbox') : ''}
            className="euiComboBox__input"
            data-test-subj="comboBoxSearchInput"
            disabled={isDisabled}
            id={id}
            inputRef={inputRef}
            onBlur={this.onBlur}
            onChange={this.inputOnChange}
            onFocus={this.onFocus}
            ref={this.inputRefCallback}
            role="textbox"
            style={{ fontSize: 14 }}
            value={searchValue}
            autoFocus={autoFocus}
          />
          {removeOptionMessage}
        </div>
      </EuiFormControlLayout>
    );
  }
}
