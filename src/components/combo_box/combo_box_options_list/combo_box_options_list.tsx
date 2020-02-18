import React, { Component, ReactNode, RefObject, createRef } from 'react';
import classNames from 'classnames';
import { List, ListProps } from 'react-virtualized';

// https://github.com/elastic/eui/pull/2835
import { EuiCode } from '@elastic/eui'; // eslint-disable-line import/no-unresolved
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHighlight } from '../../highlight';
import { EuiPanel } from '../../panel';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';
import { EuiComboBoxTitle } from './combo_box_title';
import { EuiI18n } from '../../i18n';
import { EuiFilterSelectItem } from '../../filter_group/filter_select_item';
import { EuiComboBoxOptionProps } from './combo_box_option';
import { EuiComboBoxOptionOption, EuiComboBoxOptionsListPosition } from '..';
import { htmlIdGenerator } from '../../../services';
import { RefCallback } from '../../common';
import { EuiComboBoxInputProps } from '../combo_box_input';

const positionToClassNameMap: {
  [position in EuiComboBoxOptionsListPosition]: string
} = {
  top: 'euiComboBoxOptionsList--top',
  bottom: 'euiComboBoxOptionsList--bottom',
};

const OPTION_CONTENT_CLASSNAME = 'euiComboBoxOption__content';

export interface EuiComboBoxOptionsListProps<T> {
  'data-test-subj': string;
  activeOptionIndex?: number;
  areAllOptionsSelected?: boolean;
  fullWidth?: boolean;
  getSelectedOptionForSearchValue?: (
    searchValue: string,
    selectedOptions: any[]
  ) => EuiComboBoxOptionOption<T>;
  isLoading?: boolean;
  listRef: RefObject<HTMLInputElement>;
  matchingOptions: Array<EuiComboBoxOptionOption<T>>;

  onCloseList: EuiComboBoxInputProps<T>['onCloseListClick'];
  onCreateOption?: (
    searchValue: string,
    options: Array<EuiComboBoxOptionOption<T>>
  ) => boolean;
  onOptionClick?: (option: EuiComboBoxOptionOption<T>) => void;
  onOptionEnterKey?: EuiComboBoxOptionProps<T>['onClick'];
  onScroll?: ListProps['onScroll'];
  optionRef?: (index: number, node: RefObject<HTMLDivElement>) => void;
  options: Array<EuiComboBoxOptionOption<T>>;
  position?: EuiComboBoxOptionsListPosition;
  renderOption?: (
    option: EuiComboBoxOptionOption<T>,
    searchValue: string,
    OPTION_CONTENT_CLASSNAME: string
  ) => ReactNode;
  rootId: ReturnType<typeof htmlIdGenerator>;
  rowHeight: number;
  scrollToIndex?: number;
  searchValue: string;
  selectedOptions: Array<EuiComboBoxOptionOption<T>>;
  updatePosition: (listElement?: RefObject<HTMLDivElement> | undefined) => void;
  width: number;
}

export class EuiComboBoxOptionsList<T> extends Component<
  EuiComboBoxOptionsListProps<T>
> {
  list = createRef<HTMLDivElement>();

  static defaultProps = {
    'data-test-subj': '',
    rowHeight: 27, // row height of default option renderer
  };

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      if (this.list.current) {
        this.props.updatePosition(this.list);
      }
    });
  };

  componentDidMount() {
    // Wait a frame, otherwise moving focus from one combo box to another will result in the class
    // being removed from the body.
    requestAnimationFrame(() => {
      document.body.classList.add('euiBody-hasPortalContent');
    });
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition);

    // Firefox will trigger a scroll event in many common situations when the options list div is appended
    // to the DOM; in testing it was always within 100ms, but setting a timeout here for 500ms to be safe
    setTimeout(() => {
      window.addEventListener('scroll', this.closeListOnScroll, {
        passive: true, // for better performance as we won't call preventDefault
        capture: true, // scroll events don't bubble, they must be captured instead
      });
    }, 500);
  }

  componentDidUpdate(prevProps: EuiComboBoxOptionsListProps<T>) {
    const { options, selectedOptions, searchValue } = prevProps;

    // We don't compare matchingOptions because that will result in a loop.
    if (
      searchValue !== this.props.searchValue ||
      options !== this.props.options ||
      selectedOptions !== this.props.selectedOptions
    ) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updatePosition);
    window.removeEventListener('scroll', this.closeListOnScroll, {
      capture: true,
    });
  }

  closeListOnScroll = (event: Event) => {
    // Close the list when a scroll event happens, but not if the scroll happened in the options list.
    // This mirrors Firefox's approach of auto-closing `select` elements onscroll.
    if (
      this.list.current &&
      event.target &&
      this.list.current.contains(event.target) === false
    ) {
      this.props.onCloseList();
    }
  };

  listRefCallback: RefCallback<HTMLDivElement> = node => {
    this.props.listRef(node);
    /*
    NOTE_TO_SELF(dimitri): this is actually fine but the types are written with readonly for pedantic reasons... might need to @ts-ignore, unfortunately
    */
    this.list = node;
  };

  render() {
    const {
      'data-test-subj': dataTestSubj,
      activeOptionIndex,
      areAllOptionsSelected,
      fullWidth,
      getSelectedOptionForSearchValue,
      isLoading,
      listRef,
      matchingOptions,
      onCloseList,
      onCreateOption,
      onOptionClick,
      onOptionEnterKey,
      onScroll,
      optionRef,
      options,
      position,
      renderOption,
      rootId,
      rowHeight,
      scrollToIndex,
      searchValue,
      selectedOptions,
      updatePosition,
      width,
      ...rest
    } = this.props;

    let emptyStateContent;

    if (isLoading) {
      emptyStateContent = (
        <EuiFlexGroup gutterSize="s" justifyContent="center">
          <EuiFlexItem grow={false}>
            <EuiLoadingSpinner size="m" />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiI18n
              token="euiComboBoxOptionsList.loadingOptions"
              default="Loading options"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      );
    } else if (searchValue && matchingOptions && matchingOptions.length === 0) {
      if (onCreateOption && getSelectedOptionForSearchValue) {
        const selectedOptionForValue = getSelectedOptionForSearchValue(
          searchValue,
          selectedOptions
        );
        if (selectedOptionForValue) {
          // Disallow duplicate custom options.
          emptyStateContent = (
            <p>
              <EuiI18n
                token="euiComboBoxOptionsList.alreadyAdded"
                default="{label} has already been added"
                values={{
                  label: <strong>{selectedOptionForValue.label}</strong>,
                }}
              />
            </p>
          );
        } else {
          emptyStateContent = (
            <p>
              <EuiI18n
                token="euiComboBoxOptionsList.createCustomOption"
                default="Hit {key} to add {searchValue} as a custom option"
                values={{
                  key: <EuiCode>ENTER</EuiCode>,
                  searchValue: <strong>{searchValue}</strong>,
                }}
              />
            </p>
          );
        }
      } else {
        emptyStateContent = (
          <p>
            <EuiI18n
              token="euiComboBoxOptionsList.noMatchingOptions"
              default="{searchValue} doesn't match any options"
              values={{ searchValue: <strong>{searchValue}</strong> }}
            />
          </p>
        );
      }
    } else if (!options || options.length === 0) {
      emptyStateContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.noAvailableOptions"
            default="There aren't any options available"
          />
        </p>
      );
    } else if (areAllOptionsSelected) {
      emptyStateContent = (
        <p>
          <EuiI18n
            token="euiComboBoxOptionsList.allOptionsSelected"
            default="You've selected all available options"
          />
        </p>
      );
    }

    const emptyState = emptyStateContent ? (
      <EuiText size="xs" className="euiComboBoxOptionsList__empty">
        {emptyStateContent}
      </EuiText>
    ) : (
      undefined
    );

    const numVisibleOptions =
      matchingOptions.length < 7 ? matchingOptions.length : 7;
    const height = numVisibleOptions * rowHeight;

    const optionsList = (
      <List
        height={height}
        id={rootId('listbox')}
        onScroll={onScroll}
        rowRenderer={({ key, index, style }) => {
          const option = matchingOptions[index];
          const {
            isGroupLabelOption,
            label,
            value, // eslint-disable-line no-unused-vars
            ...rest
          } = option;

          if (isGroupLabelOption) {
            return (
              <div key={key} style={style}>
                <EuiComboBoxTitle>{label}</EuiComboBoxTitle>
              </div>
            );
          }

          return (
            <EuiFilterSelectItem
              style={style}
              key={option.label.toLowerCase()}
              onClick={() => {
                if (onOptionClick) {
                  onOptionClick(option);
                }
              }}
              ref={optionRef.bind(this, index)}
              isFocused={activeOptionIndex === index}
              id={rootId(`_option-${index}`)}
              title={label}
              showIcons={false}
              {...rest}>
              {renderOption ? (
                renderOption(option, searchValue, OPTION_CONTENT_CLASSNAME)
              ) : (
                <EuiHighlight
                  search={searchValue}
                  className={OPTION_CONTENT_CLASSNAME}>
                  {label}
                </EuiHighlight>
              )}
            </EuiFilterSelectItem>
          );
        }}
        role="listbox"
        rowCount={matchingOptions.length}
        rowHeight={rowHeight}
        scrollToIndex={scrollToIndex}
        width={width}
      />
    );

    const classes = classNames(
      'euiComboBoxOptionsList',
      position ? positionToClassNameMap[position] : '',
      {
        'euiComboBoxOptionsList--fullWidth': fullWidth,
      }
    );

    return (
      <EuiPanel
        paddingSize="none"
        className={classes}
        panelRef={this.listRefCallback}
        data-test-subj={`comboBoxOptionsList ${dataTestSubj}`}
        {...rest}>
        <div className="euiComboBoxOptionsList__rowWrap">
          {emptyState || optionsList}
        </div>
      </EuiPanel>
    );
  }
}
