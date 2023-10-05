/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  FocusEventHandler,
  KeyboardEventHandler,
  RefCallback,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { htmlIdGenerator, keys, CanvasTextUtils } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../../form/form_control_layout';
import { EuiFormControlLayoutIconsProps } from '../../form/form_control_layout/form_control_layout_icons';
import { getFormControlClassNameForIconCount } from '../../form/form_control_layout/_num_icons';

import { EuiComboBoxPill } from './combo_box_pill';
import {
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
} from '../types';

export interface EuiComboBoxInputProps<T> extends CommonProps {
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
  onChange: (searchValue: string) => void;
  onClear?: () => void;
  onClick: () => void;
  onCloseListClick: () => void;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onOpenListClick: () => void;
  onRemoveOption: OptionHandler<T>;
  placeholder?: string;
  rootId: ReturnType<typeof htmlIdGenerator>;
  searchValue: string;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  singleSelection?: boolean | EuiComboBoxSingleSelectionShape;
  toggleButtonRef?: RefCallback<HTMLButtonElement | HTMLSpanElement>;
  value?: string;
  prepend?: EuiFormControlLayoutProps['prepend'];
  append?: EuiFormControlLayoutProps['append'];
  isLoading?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface EuiComboBoxInputState {
  inputWidth: number;
  hasFocus: boolean;
}

export class EuiComboBoxInput<T> extends Component<
  EuiComboBoxInputProps<T>,
  EuiComboBoxInputState
> {
  state: EuiComboBoxInputState = {
    inputWidth: 2,
    hasFocus: false,
  };

  private widthUtils?: CanvasTextUtils;

  inputRefCallback = (el: HTMLInputElement) => {
    this.widthUtils = new CanvasTextUtils({ container: el });
    this.props.inputRef?.(el);
  };

  updateInputSize = (inputValue: string) => {
    if (!this.widthUtils) return;

    this.widthUtils.setTextToCheck(inputValue);
    // Canvas has minute subpixel differences in rendering compared to DOM
    // We'll buffer the input by ~2px just to ensure sufficient width
    const inputWidth = Math.ceil(this.widthUtils.textWidth) + 2;

    this.setState({ inputWidth });
  };

  componentDidUpdate(prevProps: EuiComboBoxInputProps<T>) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.updateInputSize(this.props.searchValue);
    }
  }

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

  onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const {
      searchValue,
      selectedOptions,
      onRemoveOption,
      singleSelection,
      isListOpen,
      onOpenListClick,
    } = this.props;

    // When backspacing from an empty input, delete the last pill option in the list
    const searchIsEmpty = !searchValue.length;
    const hasPills = selectedOptions.length;

    if (event.key === keys.BACKSPACE && searchIsEmpty && hasPills) {
      onRemoveOption(selectedOptions[selectedOptions.length - 1]);

      if (!!singleSelection && !isListOpen) {
        onOpenListClick();
      }
    }
  };

  render() {
    const {
      compressed,
      focusedOptionId,
      fullWidth,
      hasSelectedOptions,
      id,
      isDisabled,
      isListOpen,
      noIcon,
      onChange,
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
      value,
      prepend,
      append,
      isLoading,
      isInvalid,
      autoFocus,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    } = this.props;

    const singleSelection = Boolean(singleSelectionProp);
    const asPlainText =
      (singleSelectionProp &&
        typeof singleSelectionProp === 'object' &&
        singleSelectionProp.asPlainText) ||
      false;

    const pills = selectedOptions
      ? selectedOptions.map((option) => {
          const {
            key,
            label,
            color,
            onClick,
            append,
            prepend,
            truncationProps,
            ...rest
          } = option;
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

      removeOptionMessageId = rootId('removeOptionMessage');

      // aria-live="assertive" will read this message aloud immediately once it enters the DOM.
      // We'll render to the DOM when the input gains focus and remove it when the input loses focus.
      // We'll use aria-hidden to prevent default aria information from being read by the screen
      // reader.
      removeOptionMessage = (
        <EuiScreenReaderOnly>
          <span aria-live="polite" id={removeOptionMessageId}>
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
    if (!noIcon && !isDisabled) {
      icon = {
        'aria-label': isListOpen
          ? 'Close list of options'
          : 'Open list of options',
        'data-test-subj': 'comboBoxToggleListButton',
        disabled: isDisabled,
        onClick: isListOpen && !isDisabled ? onCloseListClick : onOpenListClick,
        side: 'right',
        tabIndex: -1,
        type: 'arrowDown',
      };
    }

    const numIconsClass = getFormControlClassNameForIconCount({
      isDropdown: !noIcon,
      clear: !!clickProps.clear,
      isInvalid,
      isLoading,
    });

    const wrapClasses = classNames('euiComboBox__inputWrap', numIconsClass, {
      'euiComboBox__inputWrap--compressed': compressed,
      'euiComboBox__inputWrap--fullWidth': fullWidth,
      'euiComboBox__inputWrap--noWrap': singleSelection,
      'euiComboBox__inputWrap--inGroup': prepend || append,
    });

    return (
      <EuiFormControlLayout
        icon={icon}
        {...clickProps}
        inputId={id}
        isLoading={isLoading}
        isInvalid={isInvalid}
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
          <input
            aria-activedescendant={focusedOptionId}
            aria-autocomplete="list"
            aria-controls={isListOpen ? rootId('listbox') : ''}
            aria-expanded={isListOpen}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-invalid={isInvalid}
            className="euiComboBox__input"
            data-test-subj="comboBoxSearchInput"
            disabled={isDisabled}
            id={id}
            onBlur={this.onBlur}
            onChange={(event) => onChange(event.target.value)}
            onFocus={this.onFocus}
            onKeyDown={this.onKeyDown}
            ref={this.inputRefCallback}
            role="combobox"
            style={{ inlineSize: this.state.inputWidth }}
            value={searchValue}
            autoFocus={autoFocus}
          />
          {removeOptionMessage}
        </div>
      </EuiFormControlLayout>
    );
  }
}
