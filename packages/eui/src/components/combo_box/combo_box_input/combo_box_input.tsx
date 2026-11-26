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
import { EuiResizeObserver } from '../../observer/resize_observer';
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
import { getVisibleCount } from './get_visible_count';
import {
  euiComboBoxInputStyles,
  COLLAPSE_INPUT_MIN_WIDTH,
  COLLAPSE_PILL_MIN_WIDTH,
} from './combo_box_input.styles';

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
  /** Called when the hidden selections popover (`selectionDisplay="collapse"`) opens or closes */
  onCollapsedPopoverToggle?: (isOpen: boolean) => void;
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
  /**
   * Space taken by the "+N" badge and its gap, only set when selections are
   * hidden. Used to calculate the input width to prevent overflow.
   */
  collapsedBadgeSpace?: number;
  isCollapsedPopoverOpen: boolean;
}

/**
 * Width an element would have without being shrunk. Content that is clipped
 * (`overflow: hidden`) still counts towards `scrollWidth`, so this doesn't need
 * the element to be unshrunk while measuring.
 */
const getNaturalWidth = (pill: HTMLElement) => {
  const width = Math.max(pill.offsetWidth, pill.getBoundingClientRect().width);
  const clipped = Math.max(
    0,
    ...Array.from(
      pill.querySelectorAll<HTMLElement>(
        '.euiBadge__content, .eui-textTruncate'
      )
    ).map((el) => el.scrollWidth - el.clientWidth)
  );

  return width + clipped;
};

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
  private wrapRef: { current: HTMLDivElement | null } = { current: null };
  private searchInputRef: HTMLInputElement | null = null;
  private resizeRefSource?: (node: HTMLElement | null) => void;
  private wrapRefCallback?: (node: HTMLDivElement | null) => void;

  componentDidMount() {
    this.updateVisibleCount();
  }

  /**
   * Combines our own ref with the one `EuiResizeObserver` hands out. The callback
   * is only recreated when the observer's ref changes, so React doesn't detach
   * and re-attach the observer on every render.
   *
   * Note: this caches the callback on the instance while rendering. That is a
   * deliberate trade-off: it is a pure memoization (the same input always gives
   * the same callback) and the only way to keep a stable ref in a class component
   * that has to use the `EuiResizeObserver` render prop. It can be replaced with
   * `useCombinedRefs` once this component is converted to a functional component.
   */
  getWrapRef = (resizeRef: (node: HTMLElement | null) => void) => {
    if (!this.wrapRefCallback || this.resizeRefSource !== resizeRef) {
      this.resizeRefSource = resizeRef;
      this.wrapRefCallback = (node) => {
        this.wrapRef.current = node;
        resizeRef(node);
      };
    }
    return this.wrapRefCallback;
  };

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
    let badgeAndGapWidth = 0;

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
      // A hidden badge with the widest possible label is always rendered, so the
      // result doesn't depend on which count is currently shown
      const badge = wrap.querySelector<HTMLElement>(
        '.euiComboBoxCollapsedBadgeMeasure'
      );
      const badgeWidth = badge
        ? Math.max(badge.offsetWidth, badge.getBoundingClientRect().width)
        : 0;
      badgeAndGapWidth = badgeWidth + gap;
      const input = wrap.querySelector<HTMLInputElement>('.euiComboBox__input');
      const inputWidthFromStyle = parseFloat(input?.style.inlineSize ?? '');
      const inputWidth = Number.isFinite(inputWidthFromStyle)
        ? Math.max(COLLAPSE_INPUT_MIN_WIDTH, inputWidthFromStyle)
        : COLLAPSE_INPUT_MIN_WIDTH;

      // Skip when not laid out (e.g. hidden or unit tests) to avoid hiding everything
      if (available > 0 && pills.length) {
        // Read-only: a shrunk pill clips its content, so add the clipped part
        const widths = pills.map(getNaturalWidth);

        visibleCount = getVisibleCount({
          widths,
          available,
          gap,
          badgeWidth,
          inputWidth,
          pillMinWidth: COLLAPSE_PILL_MIN_WIDTH,
        });
      }
    }

    const hasHiddenOptions =
      this.isCollapsed &&
      visibleCount != null &&
      visibleCount < this.props.selectedOptions.length;
    const shouldClosePopover =
      this.state.isCollapsedPopoverOpen && !hasHiddenOptions;

    const collapsedBadgeSpace = hasHiddenOptions ? badgeAndGapWidth : undefined;

    if (
      visibleCount !== this.state.visibleCount ||
      collapsedBadgeSpace !== this.state.collapsedBadgeSpace ||
      shouldClosePopover
    ) {
      const stateUpdate: Pick<
        EuiComboBoxInputState,
        'visibleCount' | 'collapsedBadgeSpace' | 'isCollapsedPopoverOpen'
      > = {
        visibleCount,
        collapsedBadgeSpace,
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

  componentDidUpdate(
    prevProps: EuiComboBoxInputProps<T>,
    prevState: EuiComboBoxInputState
  ) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.updateInputSize(this.props.searchValue);
    }
    if (
      prevState.isCollapsedPopoverOpen !== this.state.isCollapsedPopoverOpen
    ) {
      this.props.onCollapsedPopoverToggle?.(this.state.isCollapsedPopoverOpen);
    }

    // Only re-measure when something that affects the fit changed. Width changes
    // of the control itself are handled by `EuiResizeObserver`.
    const { props } = this;
    if (
      prevProps.selectedOptions !== props.selectedOptions ||
      prevProps.compressed !== props.compressed ||
      prevProps.selectionDisplay !== props.selectionDisplay ||
      prevProps.singleSelection !== props.singleSelection ||
      prevProps.placeholder !== props.placeholder ||
      prevState.inputWidth !== this.state.inputWidth
    ) {
      this.updateVisibleCount();
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

    const { selectedOptions } = this.props;
    if (!selectedOptions || !selectedOptions.length) return null;

    const { visibleCount } = this.state;
    const isCollapsed = this.isCollapsed;

    const pills = selectedOptions.map((option, index) =>
      this.renderPill(
        option,
        isCollapsed && visibleCount != null && index >= visibleCount,
        isCollapsed && visibleCount != null && index === visibleCount - 1
      )
    );

    if (!isCollapsed) return pills;

    // Hidden badge with the widest possible label (every selection hidden), only
    // rendered so that its width can be measured
    const measureBadge = (
      <EuiBadge
        key="euiComboBoxCollapsedBadgeMeasure"
        className="euiComboBoxCollapsedBadgeMeasure"
      >
        +{selectedOptions.length}
      </EuiBadge>
    );

    const hiddenOptions =
      visibleCount == null ? [] : selectedOptions.slice(visibleCount);
    if (!hiddenOptions.length) return [...pills, measureBadge];

    return [...pills, measureBadge, this.renderCollapsedBadge(hiddenOptions)];
  };

  closeCollapsedPopover = () => {
    this.setState({ isCollapsedPopoverOpen: false });
  };

  toggleCollapsedPopover = (event: MouseEvent<HTMLButtonElement>) => {
    // Don't let the click bubble to the control, which would open the options list
    event.preventDefault();
    event.stopPropagation();

    // Close the options list on opening the collapsed pill popover
    if (this.props.isListOpen && !this.state.isCollapsedPopoverOpen) {
      this.props.onCloseListClick();
    }
    this.setState(({ isCollapsedPopoverOpen }) => ({
      isCollapsedPopoverOpen: !isCollapsedPopoverOpen,
    }));
  };

  renderPill = (
    option: EuiComboBoxOptionOption<T>,
    isCollapsed = false,
    isLastVisible = false
  ) => {
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
      id,
      'data-test-subj': dataTestSubj,
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
          isCollapsed && 'euiComboBoxPill--collapsed',
          isLastVisible && 'euiComboBoxPill--shrinkable'
        )}
        color={color}
        onClick={onClick}
        onClickAriaLabel={onClick ? 'Change' : undefined}
        {...rest}
        // Hidden pills are only measured. The interactive copy is in the "+N"
        // popover, so don't duplicate the identity of the option on this one.
        // Only pass the props that are set, as `undefined` would replace the
        // default `data-test-subj` of the pill.
        {...(!isCollapsed && id !== undefined && { id })}
        {...(!isCollapsed &&
          dataTestSubj !== undefined && { 'data-test-subj': dataTestSubj })}
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
              <EuiResizeObserver onResize={this.updateVisibleCount}>
                {(resizeRef) => (
                  <div
                    ref={this.getWrapRef(resizeRef)}
                    css={cssStyles}
                    className={wrapClasses}
                    data-test-subj="comboBoxInput"
                    onClick={onClick}
                    tabIndex={-1} // becomes onBlur event's relatedTarget, otherwise relatedTarget is null when clicking on this div
                  >
                    {this.renderPills()}
                    <EuiComboBoxOptionAppendPrepend
                      option={
                        this.asPlainText ? selectedOptions?.[0] : undefined
                      }
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
                          // A long query can't be wider than what is left of
                          // the row after the "+N" badge
                          ...(this.state.collapsedBadgeSpace
                            ? {
                                maxInlineSize: `calc(100% - ${this.state.collapsedBadgeSpace}px)`,
                              }
                            : {}),
                        }}
                        placeholder={showPlaceholder ? placeholder : undefined}
                        value={this.searchValue}
                        autoFocus={autoFocus}
                        autoComplete="off"
                        // Force the menu to re-open on every input click - only necessary when plain text
                        onClick={
                          this.asPlainText ? (onFocus as any) : undefined
                        } // Type shenanigans - event should be mostly the same
                      />
                    </EuiComboBoxOptionAppendPrepend>
                    {removeOptionMessage}
                  </div>
                )}
              </EuiResizeObserver>
            </EuiFormControlLayout>
          );
        }}
      </RenderWithEuiStylesMemoizer>
    );
  }
}
