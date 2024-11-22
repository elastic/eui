/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  HTMLAttributes,
  ReactNode,
  memo,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import {
  FixedSizeList,
  ListProps,
  ListChildComponentProps as ReactWindowListChildComponentProps,
  areEqual,
} from 'react-window';

import { RenderWithEuiStylesMemoizer } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';
import {
  EuiAutoSizer,
  EuiAutoSize,
  EuiAutoSizeHorizontal,
} from '../../auto_sizer';
import { EuiHighlight } from '../../highlight';
import { EuiMark } from '../../mark';
import { EuiTextTruncate } from '../../text_truncate';

import type { EuiSelectableOption } from '../selectable_option';
import type {
  EuiSelectableOnChangeEvent,
  EuiSelectableProps,
} from '../selectable';
import {
  EuiSelectableListItem,
  EuiSelectableListItemProps,
} from './selectable_list_item';
import { euiSelectableListStyles } from './selectable_list.styles';

interface ListChildComponentProps<T>
  extends Omit<ReactWindowListChildComponentProps, 'style'> {
  data: Array<EuiSelectableOption<T>>;
  style?: CSSProperties;
}

export type EuiSelectableOptionsListVirtualizedProps = ExclusiveUnion<
  {
    /**
     * Use virtualized rendering for list items with `react-window`.
     * Sets each row's height to the value of `rowHeight`.
     */
    isVirtualized?: true;
    /**
     *  The height of each option in pixels. Defaults to `32`.
     *  Has no effect if `isVirtualized=false`.
     */
    rowHeight: number;
  },
  {
    isVirtualized: false;
  }
>;

// Consumer Configurable Props via `EuiSelectable.listProps`
export type EuiSelectableOptionsListProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * The index of the option to be highlighted as pseudo-focused;
     * Good for use when only one selection is allowed and needing to open
     * directly to that option
     */
    activeOptionIndex?: number;
    /**
     * Show the check/cross selection indicator icons
     */
    showIcons?: boolean;
    singleSelection?: 'always' | boolean;
    /**
     * Any props to send specifically to the react-window `FixedSizeList`
     */
    windowProps?: Partial<ListProps>;
    /**
     * Adds a border around the list to indicate the bounds;
     * Useful when the list scrolls, otherwise use your own container
     */
    bordered?: boolean;
    /**
     * When enabled by setting to either `true` or passing custom text,
     * shows a hollow badge as an append (far right) when the item is focused.
     * The default content when `true` is `↩ to select/deselect/include/exclude`
     */
    onFocusBadge?: EuiSelectableListItemProps['onFocusBadge'];
    /**
     * Padding for the list items.
     */
    paddingSize?: EuiSelectableListItemProps['paddingSize'];
    /**
     * How to handle long text within the item.
     * Wrapping only works if virtualization is off.
     */
    textWrap?: EuiSelectableListItemProps['textWrap'];
    /**
     * If textWrap is set to `truncate`, you can pass a custom truncation configuration
     * that accepts any [EuiTextTruncate](/#/utilities/text-truncation) prop except for
     * `text` and `children`.
     *
     * Note: when searching, custom truncation props are ignored. The highlighted search
     * text will always take precedence.
     */
    truncationProps?: EuiSelectableOption['truncationProps'];
  } & EuiSelectableOptionsListVirtualizedProps;

export type EuiSelectableListProps<T> = EuiSelectableOptionsListProps & {
  /**
   * All possible options
   */
  options: Array<EuiSelectableOption<T>>;
  /**
   * Filtered options list (if applicable)
   */
  visibleOptions?: Array<EuiSelectableOption<T>>;
  /**
   * Search value to highlight on the option render
   */
  searchValue: string;
  /**
   * Returns the array of options with altered checked state, the click/keyboard event,
   * and the option that triggered the click/keyboard event
   */
  onOptionClick: (
    options: Array<EuiSelectableOption<T>>,
    event: EuiSelectableOnChangeEvent,
    clickedOption: EuiSelectableOption<T>
  ) => void;
  /**
   * Custom render for the label portion of the option;
   * Takes (option, searchValue), returns ReactNode
   */
  renderOption?: (
    option: EuiSelectableOption<T>,
    searchValue: string
  ) => ReactNode;
  /**
   * Sets the max height in pixels or pass `full` to allow
   * the whole group to fill the height of its container and
   * allows the list grow as well
   */
  height?: number | 'full';
  /**
   * Allow cycling through the on, off and undefined state of option.checked
   * and not just on and undefined
   */
  allowExclusions?: boolean;
  searchable?: boolean;
  isPreFiltered?: EuiSelectableProps['isPreFiltered'];
  makeOptionId: (index: number | undefined) => string;
  listId: string;
  setActiveOptionIndex: (index: number, cb?: () => void) => void;
};

type State<T> = {
  defaultOptionWidth: number;
  optionArray: Array<EuiSelectableOption<T>>;
  itemData: Record<number, EuiSelectableOption<T>>;
  ariaPosInSetMap: Record<number, number>;
  ariaSetSize: number;
};

export class EuiSelectableList<T> extends Component<
  EuiSelectableListProps<T>,
  State<T>
> {
  static defaultProps = {
    rowHeight: 32,
    searchValue: '',
    isVirtualized: true as const,
  };

  private animationFrameId: number | undefined;
  // counter for tracking list renders and ensuring rerenders
  private listRowRerender = 0;

  constructor(props: EuiSelectableListProps<T>) {
    super(props);

    const optionArray = props.visibleOptions || props.options;

    this.state = {
      defaultOptionWidth: 0,
      optionArray: optionArray,
      itemData: { ...optionArray },
      ...this.calculateAriaSetAttrs(optionArray),
    };
  }

  listRef: FixedSizeList | null = null;
  listBoxRef: HTMLUListElement | null = null;

  componentWillUnmount(): void {
    // ensure requestAnimationFrame is canceled on unmount as
    // it could potentially run on a next tick otherwise
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  setListRef = (ref: FixedSizeList | null) => {
    this.listRef = ref;

    if (ref && this.props.activeOptionIndex) {
      ref.scrollToItem(this.props.activeOptionIndex, 'auto');
    }
  };

  removeScrollableTabStop = (ref: HTMLDivElement | null) => {
    // Firefox adds a tab stop for scrollable containers
    // We handle this inside so need to stop firefox from doing its thing
    if (ref) {
      ref.setAttribute('tabindex', '-1');
    }
  };

  setListBoxRef = (ref: HTMLUListElement | null) => {
    this.listBoxRef = ref;
    const {
      listId,
      searchable,
      singleSelection,
      autoFocus,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    } = this.props;

    if (ref) {
      ref.setAttribute('id', listId);
      ref.setAttribute('role', 'listbox');

      if (searchable !== true) {
        ref.setAttribute('tabindex', '0');

        if (singleSelection !== 'always' && singleSelection !== true) {
          ref.setAttribute('aria-multiselectable', 'true');
        }
      }

      if (typeof ariaLabel === 'string') {
        ref.setAttribute('aria-label', ariaLabel);
      } else if (typeof ariaLabelledby === 'string') {
        ref.setAttribute('aria-labelledby', ariaLabelledby);
      }

      if (typeof ariaDescribedby === 'string') {
        ref.setAttribute('aria-describedby', ariaDescribedby);
      }

      if (autoFocus === true) {
        // manually focus listbox once available
        // use last stack execution to prevent potential focus order issues
        setTimeout(() => ref.focus());
      }
    }
  };

  shouldComponentUpdate(
    nextProps: Readonly<EuiSelectableListProps<T>>
  ): boolean {
    const {
      allowExclusions,
      showIcons,
      paddingSize,
      textWrap,
      onFocusBadge,
      searchable,
    } = this.props;

    // using shouldComponentUpdate to determine needed rerender before actual rerender
    // without needing state updates or lagging behind on updates
    if (
      nextProps.allowExclusions !== allowExclusions ||
      nextProps.showIcons !== showIcons ||
      nextProps.paddingSize !== paddingSize ||
      nextProps.textWrap !== textWrap ||
      nextProps.onFocusBadge !== onFocusBadge ||
      nextProps.searchable !== searchable
    ) {
      this.listRowRerender += 1;
    }

    return true;
  }

  componentDidUpdate(prevProps: EuiSelectableListProps<T>) {
    const {
      isVirtualized,
      activeOptionIndex,
      visibleOptions,
      options,
      allowExclusions,
      showIcons,
      paddingSize,
      textWrap,
      onFocusBadge,
      searchable,
    } = this.props;

    if (prevProps.activeOptionIndex !== activeOptionIndex) {
      const { makeOptionId } = this.props;

      if (this.listBoxRef && this.props.searchable !== true) {
        this.listBoxRef.setAttribute(
          'aria-activedescendant',
          makeOptionId(activeOptionIndex)
        );
      }

      if (typeof activeOptionIndex !== 'undefined') {
        if (isVirtualized) {
          this.listRef?.scrollToItem(activeOptionIndex, 'auto');
        } else {
          const activeOptionId = `#${makeOptionId(activeOptionIndex)}`;
          const activeOptionEl = this.listBoxRef?.querySelector(activeOptionId);
          if (activeOptionEl) {
            // TODO: we can remove scrollIntoView's conditional chaining once jsdom stubs it
            // @see https://github.com/jsdom/jsdom/issues/1695
            activeOptionEl.scrollIntoView?.({ block: 'nearest' });
          }
        }
      }
    }

    const optionArray = visibleOptions || options;

    if (
      prevProps.visibleOptions !== visibleOptions ||
      prevProps.options !== options
    ) {
      this.setState({
        optionArray,
        itemData: { ...optionArray },
        ...this.calculateAriaSetAttrs(optionArray),
      });
    } else if (isVirtualized) {
      // ensure that ListRow updates based on item props
      if (
        prevProps.allowExclusions !== allowExclusions ||
        prevProps.showIcons !== showIcons ||
        prevProps.paddingSize !== paddingSize ||
        prevProps.textWrap !== textWrap ||
        prevProps.onFocusBadge !== onFocusBadge ||
        prevProps.searchable !== searchable
      ) {
        this.setState({
          itemData: { ...optionArray },
        });
      }
    }
  }

  // This utility is necessary to exclude group labels from the aria set count
  calculateAriaSetAttrs = (optionArray: State<T>['optionArray']) => {
    const ariaPosInSetMap: State<T>['ariaPosInSetMap'] = {};
    let latestAriaPosIndex = 0;

    optionArray.forEach((option, index) => {
      if (!option.isGroupLabel) {
        latestAriaPosIndex++;
        ariaPosInSetMap[index] = latestAriaPosIndex;
      }
    });

    return { ariaPosInSetMap, ariaSetSize: latestAriaPosIndex };
  };

  ListRow = memo(({ data, index, style }: ListChildComponentProps<T>) => {
    const option = data[index];
    const { data: optionData, ..._option } = option;
    const {
      label,
      isGroupLabel,
      checked,
      disabled,
      prepend,
      append,
      ref,
      key,
      searchableLabel,
      data: _data,
      truncationProps: _truncationProps,
      ...optionRest
    } = option;

    const {
      activeOptionIndex,
      allowExclusions,
      onFocusBadge,
      paddingSize,
      showIcons,
      makeOptionId,
      renderOption,
      setActiveOptionIndex,
      searchable,
      searchValue,
      isPreFiltered,
      isVirtualized,
    } = this.props;

    if (isGroupLabel) {
      return (
        <RenderWithEuiStylesMemoizer>
          {(stylesMemoizer) => {
            const styles = stylesMemoizer(euiSelectableListStyles);
            return (
              <li
                role="presentation"
                css={styles.euiSelectableList__groupLabel}
                className="euiSelectableList__groupLabel"
                style={style}
                {...(optionRest as HTMLAttributes<HTMLLIElement>)}
              >
                {prepend}
                {label}
                {append}
              </li>
            );
          }}
        </RenderWithEuiStylesMemoizer>
      );
    }

    const id = makeOptionId(index);
    const isFocused = activeOptionIndex === index;

    // Search highlighting
    const hasSearch = !!searchValue;
    const highlightSearch =
      hasSearch &&
      (typeof isPreFiltered === 'object'
        ? isPreFiltered.highlightSearch !== false
        : true);

    // Text wrapping
    const canWrap = !isVirtualized;
    const _textWrap = option.textWrap ?? this.props.textWrap;
    const textWrap = canWrap ? _textWrap : 'truncate';

    // Truncation config (if any). If none, CSS truncation is used
    const truncationProps =
      textWrap === 'truncate'
        ? this.getTruncationProps(option, highlightSearch, isFocused)
        : undefined;

    return (
      <EuiSelectableListItem
        key={id}
        id={id}
        style={style}
        onMouseDown={() => {
          setActiveOptionIndex(index);
        }}
        onClick={(event) => {
          event.persist(); // NOTE: This is needed for React v16 backwards compatibility
          this.onAddOrRemoveOption(option, event);
        }}
        isFocused={isFocused}
        title={searchableLabel || label}
        checked={checked}
        disabled={disabled}
        prepend={prepend}
        append={append}
        aria-posinset={this.state.ariaPosInSetMap[index]}
        aria-setsize={this.state.ariaSetSize}
        onFocusBadge={onFocusBadge}
        allowExclusions={allowExclusions}
        showIcons={showIcons}
        paddingSize={paddingSize}
        searchable={searchable}
        textWrap={textWrap}
        // @ts-ignore complex
        {...(optionRest as EuiSelectableListItemProps)}
      >
        {renderOption
          ? renderOption(
              // @ts-ignore complex
              { ..._option, ...optionData },
              searchValue
            )
          : highlightSearch
          ? this.renderSearchedText(label, truncationProps)
          : truncationProps
          ? this.renderTruncatedText(label, truncationProps)
          : label}
      </EuiSelectableListItem>
    );
  }, areEqual);

  renderVirtualizedList = (listClasses: string) => {
    if (!this.props.isVirtualized) return null;

    const { optionArray, itemData } = this.state;
    const { windowProps, height: forcedHeight, rowHeight } = this.props;
    const heightIsFull = forcedHeight === 'full';

    const virtualizationProps = {
      className: listClasses,
      ref: this.setListRef,
      outerRef: this.removeScrollableTabStop,
      innerRef: this.setListBoxRef,
      innerElementType: 'ul',
      itemCount: optionArray.length,
      itemData: itemData,
      itemSize: rowHeight,
      'data-skip-axe': 'scrollable-region-focusable',
      ...windowProps,
    };

    // Calculated height is only used if height is not full
    let calculatedHeight = !heightIsFull ? forcedHeight || 0 : 0;

    // If calculatedHeight is still falsy, then calculate it
    if (!heightIsFull && !calculatedHeight) {
      const maxVisibleOptions = 7;
      const numVisibleOptions = optionArray.length;
      const numVisibleMoreThanMax = optionArray.length > maxVisibleOptions;

      if (numVisibleMoreThanMax) {
        // Show only half of the last one to indicate there's more to scroll to
        calculatedHeight = (maxVisibleOptions - 0.5) * rowHeight;
      } else {
        calculatedHeight = numVisibleOptions * rowHeight;
      }
    }

    return heightIsFull ? (
      <EuiAutoSizer onResize={this.calculateDefaultOptionWidth}>
        {({ width, height }: EuiAutoSize) => (
          <FixedSizeList width={width} height={height} {...virtualizationProps}>
            {this.ListRow}
          </FixedSizeList>
        )}
      </EuiAutoSizer>
    ) : (
      <EuiAutoSizer
        disableHeight={true}
        onResize={this.calculateDefaultOptionWidth}
      >
        {({ width }: EuiAutoSizeHorizontal) => (
          <FixedSizeList
            width={width}
            height={calculatedHeight}
            {...virtualizationProps}
          >
            {this.ListRow}
          </FixedSizeList>
        )}
      </EuiAutoSizer>
    );
  };

  forceVirtualizedListRowRerender = () => {
    this.setState({ itemData: { ...this.state.optionArray } });
  };

  // EuiTextTruncate is expensive perf-wise - we use several utilities here to
  // offset its performance cost

  // and creates a resize observer for
  // each individual item. This logic tries to offset this performance hit by
  // guesstimating a default width for each option
  focusBadgeOffset = 0;

  calculateDefaultOptionWidth = ({
    width: containerWidth,
  }: EuiAutoSizeHorizontal) => {
    const { truncationProps, searchable, searchValue } = this.props;

    // If it's not likely we'll need to use EuiTextTruncate, don't set state/rerender on every panel resize
    const mayTruncate = searchable || truncationProps;
    if (!mayTruncate) return;

    const paddingOffset = this.props.paddingSize === 'none' ? 0 : 24; // Defaults to 's'
    const checkedIconOffset = this.props.showIcons === false ? 0 : 28; // Defaults to true
    this.focusBadgeOffset = this.props.onFocusBadge === false ? 0 : 46;

    // Wait a tick for the listbox ref to update before proceeding
    this.animationFrameId = requestAnimationFrame(() => {
      const scrollbarOffset = this.listBoxRef
        ? containerWidth - this.listBoxRef.offsetWidth
        : 0;

      this.setState({
        defaultOptionWidth:
          containerWidth - scrollbarOffset - paddingOffset - checkedIconOffset,
      });

      // Potentially force list rows to rerender on dynamic resize as well,
      // but try to do it as lightly as possible
      if (truncationProps || (searchable && searchValue)) {
        this.forceVirtualizedListRowRerender();
      }
    });
  };

  getTruncationProps = (
    option: EuiSelectableOption,
    highlightSearch: boolean,
    isFocused: boolean
  ) => {
    // Individual truncation settings should override component-wide settings
    const truncationProps = {
      ...this.props.truncationProps,
      ...option.truncationProps,
    };

    // If we're not actually using EuiTextTruncate, no need to continue
    const hasComplexTruncation =
      highlightSearch || Object.keys(truncationProps).length > 0;
    if (!hasComplexTruncation) return undefined;

    // Determine whether we can use the optimized default option width
    const { defaultOptionWidth } = this.state;
    const useDefaultWidth = !option.append && !option.prepend;
    const defaultWidth =
      useDefaultWidth && defaultOptionWidth
        ? isFocused
          ? defaultOptionWidth - this.focusBadgeOffset
          : defaultOptionWidth
        : undefined;

    return { width: defaultWidth, ...truncationProps };
  };

  renderSearchedText = (
    text: string,
    truncationProps?: EuiSelectableOptionsListProps['truncationProps']
  ) => {
    const { searchValue } = this.props;

    // If truncationProps is undefined, we're using non-virtualized text wrapping
    if (!truncationProps) {
      return <EuiHighlight search={searchValue}>{text}</EuiHighlight>;
    }

    const searchPositionStart = text
      .toLowerCase()
      .indexOf(searchValue.toLowerCase());
    const searchPositionCenter =
      searchPositionStart + Math.floor(searchValue.length / 2);

    return (
      <EuiTextTruncate
        {...truncationProps}
        // When searching, don't allow overriding the truncation settings
        truncation="startEnd"
        truncationPosition={searchPositionCenter}
        text={text}
      >
        {(text) => (
          <>
            {text.length >= searchValue.length ? (
              <EuiHighlight search={searchValue}>{text}</EuiHighlight>
            ) : (
              // If the available truncated text is shorter than the full search string,
              // just highlight the entire truncated text
              <EuiMark>{text}</EuiMark>
            )}
          </>
        )}
      </EuiTextTruncate>
    );
  };

  renderTruncatedText = (
    text: string,
    truncationProps?: EuiSelectableOptionsListProps['truncationProps']
  ) => {
    return (
      // For some bizarre reason, truncation in EuiSelectable is off on initial mount
      // (but not on rerender) for Safari and _some_ truncation types in Firefox :|
      // Waiting a tick before calculating truncation seems to smooth over the issue
      <EuiTextTruncate calculationDelayMs={2} {...truncationProps} text={text}>
        {(text) => text}
      </EuiTextTruncate>
    );
  };

  render() {
    const {
      className,
      options,
      searchValue,
      onOptionClick,
      renderOption,
      height: forcedHeight,
      windowProps,
      rowHeight,
      activeOptionIndex,
      makeOptionId,
      showIcons,
      singleSelection,
      visibleOptions,
      allowExclusions,
      bordered,
      paddingSize,
      searchable,
      onFocusBadge,
      listId,
      setActiveOptionIndex,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      role,
      isPreFiltered,
      isVirtualized,
      textWrap,
      truncationProps,
      autoFocus,
      ...rest
    } = this.props;

    const heightIsFull = forcedHeight === 'full';

    const classes = classNames('euiSelectableList', className);

    return (
      <RenderWithEuiStylesMemoizer>
        {(stylesMemoizer) => {
          const styles = stylesMemoizer(euiSelectableListStyles);
          const cssStyles = [
            styles.euiSelectableList,
            heightIsFull && styles.fullHeight,
            bordered && styles.bordered,
          ];
          const listClasses = classNames(
            'euiSelectableList__list',
            styles.euiSelectableList__list
          );

          return (
            <div css={cssStyles} className={classes} {...rest}>
              {isVirtualized ? (
                this.renderVirtualizedList(listClasses)
              ) : (
                <div
                  className={listClasses}
                  style={
                    !heightIsFull ? { blockSize: forcedHeight } : undefined
                  }
                  ref={this.removeScrollableTabStop}
                >
                  <ul ref={this.setListBoxRef}>
                    {this.state.optionArray.map((_, index) =>
                      React.createElement(
                        this.ListRow,
                        {
                          key: `${index}-${this.listRowRerender}`,
                          data: this.state.optionArray,
                          index,
                        },
                        null
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          );
        }}
      </RenderWithEuiStylesMemoizer>
    );
  }

  onAddOrRemoveOption = (
    option: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    if (option.disabled) {
      return;
    }

    const { allowExclusions, options, visibleOptions = options } = this.props;

    this.props.setActiveOptionIndex(
      visibleOptions.findIndex(({ label }) => label === option.label),
      () => {
        if (option.checked === 'on' && allowExclusions) {
          this.onExcludeOption(option, event);
        } else if (option.checked === 'on' || option.checked === 'off') {
          this.onRemoveOption(option, event);
        } else {
          this.onAddOption(option, event);
        }
      }
    );
  };

  private onAddOption = (
    addedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, options, singleSelection } = this.props;
    let changedOption = { ...addedOption };

    const updatedOptions = options.map((option) => {
      // if singleSelection is enabled, uncheck any selected option(s)
      const updatedOption = { ...option };
      if (singleSelection) {
        delete updatedOption.checked;
      }

      // if this is the now-selected option, check it
      if (option === addedOption) {
        updatedOption.checked = 'on';
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };

  private onRemoveOption = (
    removedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, singleSelection, options } = this.props;
    let changedOption = { ...removedOption };

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === removedOption && singleSelection !== 'always') {
        delete updatedOption.checked;
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };

  private onExcludeOption = (
    excludedOption: EuiSelectableOption<T>,
    event: EuiSelectableOnChangeEvent
  ) => {
    const { onOptionClick, options } = this.props;
    let changedOption = { ...excludedOption };

    const updatedOptions = options.map((option) => {
      const updatedOption = { ...option };

      if (option === excludedOption) {
        updatedOption.checked = 'off';
        changedOption = updatedOption;
      }

      return updatedOption;
    });

    onOptionClick(updatedOptions, event, changedOption);
  };
}
