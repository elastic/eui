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
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import {
  htmlIdGenerator,
  keys,
  CanvasTextUtils,
  RenderWithEuiStylesMemoizer,
} from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../../form/form_control_layout';
import { EuiFormControlLayoutIconsProps } from '../../form/form_control_layout/form_control_layout_icons';

import {
  EuiComboBoxOptionOption,
  EuiComboBoxSingleSelectionShape,
  OptionHandler,
} from '../types';
import { EuiComboBoxOptionAppendPrepend } from '../utils';
import { EuiComboBoxPill } from './combo_box_pill';
import { euiComboBoxInputStyles } from './combo_box_input.styles';

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
  'aria-describedby'?: string;
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
    if (this.asPlainText) return;

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
      hasSelectedOptions,
      selectedOptions,
      onRemoveOption,
      singleSelection,
      isListOpen,
      onOpenListClick,
      onChange,
    } = this.props;

    const searchIsEmpty = !searchValue.length;

    if (event.key === keys.BACKSPACE) {
      // When backspacing in a plain text combobox, change normally and remove the selection
      if (this.asPlainText) {
        onChange(event.currentTarget.value);

        if (hasSelectedOptions) {
          onRemoveOption(selectedOptions[selectedOptions.length - 1]);
        }
      }
      // When backspacing from an empty input, delete the last pill option in the list
      else if (searchIsEmpty && hasSelectedOptions) {
        onRemoveOption(selectedOptions[selectedOptions.length - 1]);

        if (!!singleSelection && !isListOpen) {
          onOpenListClick();
        }
      }
    }
  };

  get asPlainText() {
    const { singleSelection } = this.props;
    const isSingleSelectionConfig =
      singleSelection && typeof singleSelection === 'object';

    return !!(isSingleSelectionConfig && singleSelection.asPlainText);
  }

  get searchValue() {
    const { searchValue, selectedOptions } = this.props;
    if (this.asPlainText) {
      return searchValue || selectedOptions?.[0]?.label || '';
    } else {
      return searchValue;
    }
  }

  renderPills = () => {
    // Don't render a pill for plain text comboboxes - use the input instead
    if (this.asPlainText) return null;
    // Don't render the single pill selection while searching
    if (this.props.singleSelection && this.props.searchValue) return null;

    const { selectedOptions, isDisabled, onRemoveOption } = this.props;
    if (!selectedOptions || !selectedOptions.length) return null;

    return selectedOptions.map((option) => {
      const {
        key,
        label,
        color,
        onClick,
        append,
        prepend,
        truncationProps,
        toolTipContent,
        toolTipProps,
        ...rest
      } = option;
      const pillOnClose =
        isDisabled || this.props.singleSelection || onClick
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
          {...rest}
        >
          {label}
        </EuiComboBoxPill>
      );
    });
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
      onFocus,
      onCloseListClick,
      onOpenListClick,
      placeholder,
      rootId,
      searchValue,
      selectedOptions,
      singleSelection,
      value,
      prepend,
      append,
      isLoading,
      isInvalid,
      autoFocus,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    } = this.props;

    let removeOptionMessage: ReactNode;
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

    const isInGroup = singleSelection && (prepend || append);
    const showPlaceholder =
      placeholder && !selectedOptions?.length && !searchValue;

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

    const wrapClasses = classNames('euiComboBox__inputWrap', {
      'euiComboBox__inputWrap--plainText': this.asPlainText,
    });

    return (
      <RenderWithEuiStylesMemoizer>
        {(stylesMemoizer) => {
          const styles = stylesMemoizer(euiComboBoxInputStyles);

          const stateCss = isListOpen
            ? styles.open
            : isInvalid
            ? styles.invalid
            : undefined;

          const cssStyles = [
            styles.euiComboBoxInputWrapper,
            !singleSelection && styles.multiSelect,
            compressed ? styles.compressed : styles.uncompressed,
            ...(this.asPlainText || showPlaceholder
              ? [
                  styles.plainText.plainText,
                  compressed
                    ? styles.plainText.compressed
                    : styles.plainText.uncompressed,
                ]
              : []),
            isDisabled ? styles.disabled : stateCss,
            isInGroup && styles.inGroup,
          ];
          const formLayoutStyles = [
            styles.formLayout.euiComboBox__formControlLayout,
            !singleSelection && styles.formLayout.multiSelect,
          ];

          return (
            <EuiFormControlLayout
              icon={icon}
              {...clickProps}
              inputId={id}
              isLoading={isLoading}
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              compressed={compressed}
              fullWidth={fullWidth}
              prepend={prepend}
              append={append}
              css={formLayoutStyles}
            >
              <div
                css={cssStyles}
                className={wrapClasses}
                data-test-subj="comboBoxInput"
                onClick={onClick}
                tabIndex={-1} // becomes onBlur event's relatedTarget, otherwise relatedTarget is null when clicking on this div
              >
                {this.renderPills()}
                <EuiComboBoxOptionAppendPrepend
                  option={this.asPlainText ? selectedOptions?.[0] : undefined}
                  classNamePrefix="euiComboBoxPlainTextSelection"
                  marginSize="xxs"
                >
                  <input
                    aria-activedescendant={focusedOptionId}
                    aria-autocomplete="list"
                    aria-controls={isListOpen ? rootId('listbox') : ''}
                    aria-expanded={isListOpen}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    aria-describedby={ariaDescribedby}
                    aria-invalid={isInvalid}
                    aria-haspopup="listbox"
                    css={styles.euiComboBoxInput}
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
                    style={{
                      inlineSize:
                        this.asPlainText || showPlaceholder
                          ? '100%'
                          : this.state.inputWidth,
                    }}
                    placeholder={showPlaceholder ? placeholder : undefined}
                    value={this.searchValue}
                    autoFocus={autoFocus}
                    autoComplete="off"
                    // Force the menu to re-open on every input click - only necessary when plain text
                    onClick={this.asPlainText ? (onFocus as any) : undefined} // Type shenanigans - event should be mostly the same
                  />
                </EuiComboBoxOptionAppendPrepend>
                {removeOptionMessage}
              </div>
            </EuiFormControlLayout>
          );
        }}
      </RenderWithEuiStylesMemoizer>
    );
  }
}
