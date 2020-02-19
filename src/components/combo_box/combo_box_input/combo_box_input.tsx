import React, { Component, FocusEventHandler, RefObject } from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiFormControlLayout } from '../../form/form_control_layout';
import { EuiComboBoxPill } from './combo_box_pill';
import { htmlIdGenerator } from '../../../services';
import { EuiComboBoxOptionOption, EuiComboBoxSingleSelectionShape } from '..';
import { EuiFormControlLayoutIconsProps } from '../../form/form_control_layout/form_control_layout_icons';

const makeId = htmlIdGenerator();

export interface EuiComboBoxInputProps<T> {
  autoSizeInputRef?: RefObject<HTMLInputElement>;
  compressed: boolean;
  focusedOptionId?: string;
  fullWidth?: boolean;
  hasSelectedOptions: boolean;
  id?: string;
  inputRef?: RefObject<HTMLInputElement>;
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
  onRemoveOption?: (option: EuiComboBoxOptionOption<T>) => void;
  placeholder?: string;
  rootId: ReturnType<typeof htmlIdGenerator>;
  searchValue: string;
  selectedOptions?: Array<EuiComboBoxOptionOption<T>>;
  singleSelection?: boolean | EuiComboBoxSingleSelectionShape;
  toggleButtonRef?: RefObject<HTMLButtonElement | HTMLSpanElement>;
  updatePosition: (listElement?: RefObject<HTMLDivElement> | undefined) => void;
  value?: string;
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

  onFocus: FocusEventHandler<HTMLInputElement> = event => {
    this.props.onFocus(event);
    this.setState({
      hasFocus: true,
    });
  };

  onBlur: FocusEventHandler<HTMLInputElement> = event => {
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

  render() {
    const {
      autoSizeInputRef,
      compressed,
      focusedOptionId,
      fullWidth,
      hasSelectedOptions,
      id,
      inputRef,
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
      toggleButtonRef,
      value,
    } = this.props;

    const singleSelection = Boolean(singleSelectionProp);
    const asPlainText =
      (singleSelectionProp &&
        typeof singleSelectionProp === 'object' &&
        singleSelectionProp.asPlainText) ||
      false;

    const pills = selectedOptions
      ? selectedOptions.map(option => {
          const { label, color, onClick, ...rest } = option;
          const pillOnClose =
            isDisabled || singleSelection || onClick
              ? undefined
              : onRemoveOption;
          const pillOnClick = onClick || (() => {});

          return (
            <EuiComboBoxPill
              option={option}
              onClose={pillOnClose}
              key={label.toLowerCase()}
              color={color}
              onClick={pillOnClick}
              onClickAriaLabel={onClick ? 'Change' : undefined}
              asPlainText={asPlainText}
              {...rest}>
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

      removeOptionMessageId = makeId();

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
      /*
      NOTE_TO_SELF(dimitri): this problem appears to come from an issue with the type of
      EuiFormControlLayoutCustomIconProps['iconRef']:
      ```tsx
      | ((el: HTMLButtonElement | HTMLSpanElement | null) => void);
      ```

      As I understand it, a `RefObject`, which is what `toggleButtonRef` is, should be accepted, as it is with the `ref` property itself.
      */
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
      'euiComboBox__inputWrap-isClearable': onClear,
    });

    return (
      <EuiFormControlLayout
        icon={icon}
        {...clickProps}
        compressed={compressed}
        fullWidth={fullWidth}>
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
            onChange={event => {
              if (onChange) {
                onChange(event.target.value as typeof searchValue);
              }
            }}
            onFocus={this.onFocus}
            ref={autoSizeInputRef}
            role="textbox"
            style={{ fontSize: 14 }}
            value={searchValue}
          />
          {removeOptionMessage}
        </div>
      </EuiFormControlLayout>
    );
  }
}
