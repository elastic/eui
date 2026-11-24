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
  MouseEvent,
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
import { EuiBadge } from '../../badge';
import { EuiI18n } from '../../i18n';
import { EuiPopover } from '../../popover';
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
  selectionDisplay?: 'wrap' | 'collapse';
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
  /** Number of pills that fit when `selectionDisplay="collapse"`. `undefined` renders all pills. */
  visibleCount?: number;
  isCollapsedPopoverOpen: boolean;
}

// Space always kept free for the text input and the "+N" badge when collapsing
const COLLAPSE_INPUT_MIN_WIDTH = 12;
const COLLAPSE_BADGE_WIDTH = 40;
const COLLAPSE_BADGE_COMPRESSED_WIDTH = 36;
// A lone pill may shrink (truncate) to fit, but not below this width
const COLLAPSE_PILL_MIN_WIDTH = 64;
const COLLAPSED_SINGLE_PILL_CLASS = 'euiComboBoxInputWrap--collapsedSinglePill';

export class EuiComboBoxInput<T> extends Component<
  EuiComboBoxInputProps<T>,
  EuiComboBoxInputState
> {
  state: EuiComboBoxInputState = {
    inputWidth: 2,
    hasFocus: false,
    isCollapsedPopoverOpen: false,
  };

  private widthUtils?: CanvasTextUtils;
  private wrapRef = React.createRef<HTMLDivElement>();
  private searchInputRef: HTMLInputElement | null = null;
  private resizeObserver?: ResizeObserver;

  componentDidMount() {
    if (typeof ResizeObserver !== 'undefined' && this.wrapRef.current) {
      this.resizeObserver = new ResizeObserver(this.updateVisibleCount);
      this.resizeObserver.observe(this.wrapRef.current);
    }
    this.updateVisibleCount();
  }

  componentWillUnmount() {
    this.resizeObserver?.disconnect();
  }

  get isCollapsed() {
    const { selectionDisplay, singleSelection } = this.props;
    return selectionDisplay === 'collapse' && !singleSelection;
  }

  /**
   * Measures the (always rendered) pills and works out how many fit on a
   * single row, leaving room for the input and the "+N" badge
   */
  updateVisibleCount = () => {
    const wrap = this.wrapRef.current;
    let visibleCount: number | undefined;

    if (this.isCollapsed && wrap) {
      const pills = Array.from(wrap.children).filter((el) =>
        el.classList.contains('euiComboBoxPill')
      ) as HTMLElement[];
      const style = window.getComputedStyle(wrap);
      const gap = parseFloat(style.columnGap) || 0;
      const available =
        wrap.clientWidth -
        (parseFloat(style.paddingLeft) || 0) -
        (parseFloat(style.paddingRight) || 0);
      const badge = wrap.querySelector<HTMLElement>(
        '.euiComboBoxCollapsedBadge .euiBadge'
      );
      const measuredBadgeWidth =
        badge &&
        Math.max(badge.offsetWidth, badge.getBoundingClientRect().width);
      const badgeWidth =
        measuredBadgeWidth ||
        (this.props.compressed
          ? COLLAPSE_BADGE_COMPRESSED_WIDTH
          : COLLAPSE_BADGE_WIDTH);
      const input = wrap.querySelector<HTMLInputElement>('.euiComboBox__input');
      const inputWidthFromStyle = parseFloat(input?.style.inlineSize ?? '');
      const inputWidth = Number.isFinite(inputWidthFromStyle)
        ? Math.max(COLLAPSE_INPUT_MIN_WIDTH, inputWidthFromStyle)
        : COLLAPSE_INPUT_MIN_WIDTH;

      // Skip when not laid out (e.g. hidden or unit tests) to avoid hiding everything
      if (available > 0 && pills.length) {
        const hasShrinkingPill = wrap.classList.contains(
          COLLAPSED_SINGLE_PILL_CLASS
        );
        if (hasShrinkingPill) {
          wrap.classList.remove(COLLAPSED_SINGLE_PILL_CLASS);
        }

        let widths: number[];
        try {
          widths = pills.map((pill) =>
            Math.max(pill.offsetWidth, pill.getBoundingClientRect().width)
          );
        } finally {
          if (hasShrinkingPill) {
            wrap.classList.add(COLLAPSED_SINGLE_PILL_CLASS);
          }
        }

        const total = widths.length;
        const prefixWidths = [0];
        widths.forEach((width) => {
          prefixWidths.push(prefixWidths[prefixWidths.length - 1] + width);
        });
        visibleCount = 0;

        for (let count = total; count >= 0; count--) {
          const hasHiddenOptions = count < total;
          const precedingItems = count + Number(hasHiddenOptions);
          const needed =
            prefixWidths[count] +
            (hasHiddenOptions ? badgeWidth : 0) +
            gap * precedingItems +
            inputWidth;

          if (needed <= available) {
            visibleCount = count;
            break;
          }
          // Even a single pill doesn't fit: it can shrink to fit if that
          // leaves it a usable width, otherwise only the badge is shown
          if (
            count === 1 &&
            available -
              (hasHiddenOptions ? badgeWidth : 0) -
              inputWidth -
              gap * precedingItems >=
              COLLAPSE_PILL_MIN_WIDTH
          ) {
            visibleCount = 1;
            break;
          }
        }
      }
    }

    const hasHiddenOptions =
      this.isCollapsed &&
      visibleCount != null &&
      visibleCount < this.props.selectedOptions.length;
    const shouldClosePopover =
      this.state.isCollapsedPopoverOpen && !hasHiddenOptions;

    if (visibleCount !== this.state.visibleCount || shouldClosePopover) {
      const stateUpdate: Pick<
        EuiComboBoxInputState,
        'visibleCount' | 'isCollapsedPopoverOpen'
      > = {
        visibleCount,
        isCollapsedPopoverOpen: this.state.isCollapsedPopoverOpen,
      };
      if (shouldClosePopover) {
        stateUpdate.isCollapsedPopoverOpen = false;
      }

      this.setState(stateUpdate, () => {
        if (shouldClosePopover) this.searchInputRef?.focus();
      });
    }
  };

  inputRefCallback = (el: HTMLInputElement) => {
    this.searchInputRef = el;
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
    this.updateVisibleCount();
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

    const { selectedOptions } = this.props;
    if (!selectedOptions || !selectedOptions.length) return null;

    const { visibleCount } = this.state;
    const isCollapsed = this.isCollapsed;

    const pills = selectedOptions.map((option, index) =>
      this.renderPill(
        option,
        isCollapsed && visibleCount != null && index >= visibleCount
      )
    );

    if (!isCollapsed || visibleCount == null) return pills;

    const hiddenOptions = selectedOptions.slice(visibleCount);
    if (!hiddenOptions.length) return pills;

    return [...pills, this.renderCollapsedBadge(hiddenOptions)];
  };

  closeCollapsedPopover = () => {
    this.setState({ isCollapsedPopoverOpen: false });
  };

  toggleCollapsedPopover = (event: MouseEvent<HTMLButtonElement>) => {
    // Don't let the click bubble to the control, which would open the options list
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ isCollapsedPopoverOpen }) => ({
      isCollapsedPopoverOpen: !isCollapsedPopoverOpen,
    }));
  };

  renderPill = (option: EuiComboBoxOptionOption<T>, isCollapsed = false) => {
    const {
      key,
      label,
      color,
      onClick,
      className,
      append,
      prepend,
      truncationProps,
      toolTipContent,
      toolTipProps,
      ...rest
    } = option;
    const { isDisabled, onRemoveOption, singleSelection } = this.props;

    return (
      <EuiComboBoxPill
        option={option}
        onClose={
          isDisabled || singleSelection || onClick ? undefined : onRemoveOption
        }
        key={key ?? label.toLowerCase()}
        className={classNames(
          className,
          isCollapsed && 'euiComboBoxPill--collapsed'
        )}
        color={color}
        onClick={onClick}
        onClickAriaLabel={onClick ? 'Change' : undefined}
        {...rest}
      >
        {label}
      </EuiComboBoxPill>
    );
  };

  renderCollapsedBadge = (hiddenOptions: Array<EuiComboBoxOptionOption<T>>) => {
    const labels = hiddenOptions.map((option) => option.label);

    const badge = (
      <EuiI18n
        token="euiComboBoxInput.collapsedSelections"
        default="{count} more selected: {labels}"
        values={{ count: hiddenOptions.length, labels: labels.join(', ') }}
      >
        {(collapsedSelections: string) => (
          <EuiBadge
            color="default"
            data-test-subj="comboBoxCollapsedBadge"
            onClick={this.toggleCollapsedPopover}
            onClickAriaLabel={collapsedSelections}
            aria-haspopup="dialog"
            aria-expanded={this.state.isCollapsedPopoverOpen}
          >
            +{hiddenOptions.length}
          </EuiBadge>
        )}
      </EuiI18n>
    );

    return (
      <EuiI18n
        key="euiComboBoxCollapsedSelectionsDialog"
        token="euiComboBoxInput.collapsedSelectionsDialog"
        default="Hidden selections"
      >
        {(collapsedSelectionsDialog: string) => (
          <EuiPopover
            key="euiComboBoxCollapsedBadge"
            className="euiComboBoxCollapsedBadge"
            aria-label={collapsedSelectionsDialog}
            button={badge}
            isOpen={this.state.isCollapsedPopoverOpen}
            closePopover={this.closeCollapsedPopover}
            anchorPosition="downLeft"
            panelPaddingSize="s"
            panelProps={{ 'data-test-subj': 'comboBoxCollapsedPopover' }}
          >
            <RenderWithEuiStylesMemoizer>
              {(stylesMemoizer) => (
                // Clicks in the popover (rendered in a portal) bubble through the React
                // tree to the control - stop them so they don't open the options list
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                <div
                  css={stylesMemoizer(euiComboBoxInputStyles).collapsedList}
                  className="euiComboBoxCollapsedList"
                  onClick={(event) => event.stopPropagation()}
                >
                  {hiddenOptions.map((option) => this.renderPill(option))}
                </div>
              )}
            </RenderWithEuiStylesMemoizer>
          </EuiPopover>
        )}
      </EuiI18n>
    );
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

    const isInGroup = !!(prepend || append);
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
        type: 'chevronSingleDown',
      };
    }

    const wrapClasses = classNames('euiComboBox__inputWrap', {
      'euiComboBox__inputWrap--plainText': this.asPlainText,
      [COLLAPSED_SINGLE_PILL_CLASS]:
        this.isCollapsed && this.state.visibleCount === 1,
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
            this.isCollapsed && styles.collapsed,
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
            !singleSelection &&
              compressed &&
              styles.formLayout.multiSelectCompressed,
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
                ref={this.wrapRef}
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
