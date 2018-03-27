/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex="-1" so that we can control the keyboard navigation interface.
 */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tabbable from 'tabbable';
import AutosizeInput from 'react-input-autosize';

import { comboBoxKeyCodes } from '../../services';
import { BACKSPACE, TAB, ESCAPE } from '../../services/key_codes';
import { EuiCode } from '../code';
import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiHighlight } from '../highlight';
import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { EuiComboBoxPill } from './combo_box_pill';
import { EuiComboBoxOption } from './combo_box_option';
import { EuiComboBoxTitle } from './combo_box_title';

const flattenOptionGroups = optionsOrGroups => {
  return optionsOrGroups.reduce((options, optionOrGroup) => {
    if (optionOrGroup.options) {
      options.push(...optionOrGroup.options);
    } else {
      options.push(optionOrGroup);
    }
    return options;
  }, []);
};

const getSelectedOptionForSearchValue = (searchValue, selectedOptions) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(option => option.label.toLowerCase() === normalizedSearchValue);
};

const collectMatchingOption = (accumulator, option, selectedOptions, normalizedSearchValue) => {
  // Only show options which haven't yet been selected.
  const selectedOption = getSelectedOptionForSearchValue(option.label, selectedOptions);
  if (selectedOption) {
    return false;
  }

  if (!normalizedSearchValue) {
    accumulator.push(option);
    return;
  }

  const normalizedOption = option.label.trim().toLowerCase();
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

const getMatchingOptions = (options, selectedOptions, searchValue) => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const optionToGroupMap = new Map();
  const matchingOptions = [];

  options.forEach(option => {
    if (option.options) {
      option.options.forEach(groupOption => {
        optionToGroupMap.set(groupOption, option)
        collectMatchingOption(matchingOptions, groupOption, selectedOptions, normalizedSearchValue);
      })
    } else {
      collectMatchingOption(matchingOptions, option, selectedOptions, normalizedSearchValue);
    }
  });

  return { optionToGroupMap, matchingOptions };
};

export class EuiComboBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func,
    onCreateOption: PropTypes.func,
  }

  static defaultProps = {
    options: [],
    selectedOptions: [],
  }

  constructor(props) {
    super(props);

    const initialSearchValue = '';
    const { options, selectedOptions } = props;
    const { matchingOptions, optionToGroupMap } = getMatchingOptions(options, selectedOptions, initialSearchValue);

    this.state = {
      searchValue: initialSearchValue,
      isListOpen: this.props.isListOpen,
    };

    // Cached derived state.
    this.matchingOptions = matchingOptions;
    this.optionToGroupMap = optionToGroupMap;
    this.activeOptionIndex = undefined;
    this.options = [];
  }

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  closeList = () => {
    this.clearActiveOption();
    this.setState({
      isListOpen: false,
    });
  };

  tabAway = amount => {
    const tabbableItems = tabbable(document);
    const comboBoxIndex = tabbableItems.indexOf(this.searchInput);

    // Wrap to last tabbable if tabbing backwards.
    if (amount < 0) {
      if (comboBoxIndex === 0) {
        tabbableItems[tabbableItems.length - 1].focus();
        return;
      }
    }

    // Wrap to first tabbable if tabbing forwards.
    if (amount > 0) {
      if (comboBoxIndex === tabbableItems.length - 1) {
        tabbableItems[0].focus();
        return;
      }
    }

    tabbableItems[comboBoxIndex + amount].focus();
  };

  incrementActiveOptionIndex = amount => {
    // If there are no options available, reset the focus.
    if (!this.matchingOptions.length) {
      this.clearActiveOption();
      return;
    }

    let nextActiveOptionIndex;

    if (!this.hasActiveOption()) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextActiveOptionIndex = amount < 0 ? this.options.length - 1 : 0;
    } else {
      nextActiveOptionIndex = this.activeOptionIndex + amount;

      if (nextActiveOptionIndex < 0) {
        nextActiveOptionIndex = this.options.length - 1;
      } else if (nextActiveOptionIndex === this.options.length) {
        nextActiveOptionIndex = 0;
      }
    }

    this.activeOptionIndex = nextActiveOptionIndex;
    this.focusActiveOption();
  };

  hasActiveOption = () => {
    return this.activeOptionIndex !== undefined;
  };

  clearActiveOption = () => {
    this.activeOptionIndex = undefined;
  };

  focusActiveOption = () => {
    // If an item is focused, focus it.
    if (this.hasActiveOption()) {
      this.options[this.activeOptionIndex].focus();
    }
  };

  doesSearchMatchOnlyOption = () => {
    const { searchValue } = this.state;
    if (this.matchingOptions.length !== 1) {
      return false;
    }
    return this.matchingOptions[0].value.toLowerCase() === searchValue.toLowerCase();
  };

  areAllOptionsSelected = () => {
    const { options, selectedOptions } = this.props;
    return flattenOptionGroups(options).length === selectedOptions.length;
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        this.incrementActiveOptionIndex(-1);
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        this.incrementActiveOptionIndex(1);
        break;

      case BACKSPACE:
        // Delete last pill.
        if (this.props.selectedOptions.length) {
          // Backspace will be used to delete the input, not a pill.
          if (!this.state.searchValue.length) {
            this.onRemoveOption(this.props.selectedOptions[this.props.selectedOptions.length - 1]);
          }
        }
        break;

      case ESCAPE:
        // Move focus from options list to input.
        if (this.hasActiveOption()) {
          this.clearActiveOption();
          this.searchInput.focus();
        }
        break;

      case comboBoxKeyCodes.ENTER:
        if (this.doesSearchMatchOnlyOption()) {
          this.options[0].click();
          return;
        }

        if (!this.props.onCreateOption) {
          return;
        }

        // Don't create the value if it's already been selected.
        if (getSelectedOptionForSearchValue(this.state.searchValue, this.props.selectedOptions)) {
          return;
        }

        // Add new custom pill if this is custom input.
        const isCustomInput = !this.hasActiveOption() && !this.matchingOptions.length;
        if (isCustomInput || this.doesSearchMatchOnlyOption()) {
          this.props.onCreateOption(this.state.searchValue, flattenOptionGroups(this.props.options));
          this.setState({ searchValue: '' });
        }
        break;

      case TAB:
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
          this.tabAway(-1);
        } else {
          this.tabAway(1);
        }
        break;
    }
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInput.focus();
  };

  onOptionEnterKey = (option) => {
    this.onAddOption(option);
  }

  onOptionClick = (option) => {
    this.onAddOption(option);
  }

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.concat(addedOption));
    this.clearActiveOption();
    const searchValue = '';
    this.setState({ searchValue });
    this.searchInput.focus();
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
  };

  onComboBoxFocus = (e) => {
    // If the user has tabbed to the combo box, open it.
    if (e.target === this.searchInputRef) {
      this.searchInput.focus();
      return;
    }

    // If a user clicks on an option without selecting it, then it will take focus
    // and we need to update the index.
    const optionIndex = this.options.indexOf(e.target);
    if (optionIndex !== -1) {
      this.activeOptionIndex = optionIndex;
    }
  };

  onComboBoxBlur = () => {
    // This callback generally handles cases when the user has taken focus away by clicking outside
    // of the combo box.

    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      // If the user has placed focus somewhere outside of the combo box, close it.
      const hasFocus = this.comboBox.contains(document.activeElement);
      if (!hasFocus) {
        this.closeList();
      }
    });
  };

  onSearchChange = (e) => {
    if (this.props.onSearchChange) {
      this.props.onSearchChange();
    }

    this.setState({ searchValue: e.target.value })
  };

  comboBoxRef = node => {
    this.comboBox = node;
  };

  autoSizeInputRef = node => {
    this.autoSizeInput = node;
  };

  searchInputRef = node => {
    this.searchInput = node;
  };

  optionRef = (index, node) => {
    // Sometimes the node is null.
    if (node) {
      // Store all options.
      this.options[index] = node;
    }
  };

  componentDidMount() {
    // TODO: This will need to be called once the actual stylesheet loads.
    setTimeout(() => {
      this.autoSizeInput.copyInputStyles();
    }, 100);
  }

  componentWillUpdate(nextProps, nextState) {
    const { options, selectedOptions } = nextProps;
    const { searchValue } = nextState;

    if (
      options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
      || searchValue !== this.props.searchValue
    ) {
      // Clear refs to options if the ones we can display changes.
      this.options = [];
    }

    // Calculate and cache the options which match the searchValue, because we use this information
    // in multiple places and it would be expensive to calculate repeatedly.
    const { matchingOptions, optionToGroupMap } = getMatchingOptions(options, selectedOptions, nextState.searchValue);
    this.matchingOptions = matchingOptions;
    this.optionToGroupMap = optionToGroupMap;

    if (!matchingOptions.length) {
      this.clearActiveOption();
    }
  }

  componentDidUpdate() {
    this.focusActiveOption();
  }

  renderPills() {
    return this.props.selectedOptions.map((option) => {
      const {
        value,
        label,
        ...rest
      } = option;

      return (
        <EuiComboBoxPill
          option={option}
          onClose={this.onRemoveOption}
          key={value}
          {...rest}
        >
          {label}
        </EuiComboBoxPill>
      )
    });
  }

  renderList() {
    const { options, onCreateOption } = this.props;
    const { searchValue } = this.state;

    let emptyStateContent;

    if (!options.length) {
      emptyStateContent = <p>There aren&rsquo;t any options available</p>;
    } else if (this.areAllOptionsSelected()) {
      emptyStateContent = <p>You&rsquo;ve selected all available options</p>;
    } else if (this.matchingOptions.length === 0) {
      if (searchValue) {
        if (onCreateOption) {
          const selectedOptionForValue = getSelectedOptionForSearchValue(searchValue, this.props.selectedOptions);
          if (selectedOptionForValue) {
            // Disallow duplicate custom options.
            emptyStateContent = (
              <p><strong>{selectedOptionForValue.value}</strong> has already been added</p>
            );
          } else {
            emptyStateContent = (
              <p>Hit <EuiCode>ENTER</EuiCode> to add <strong>{searchValue}</strong> as a custom option</p>
            );
          }
        } else {
          emptyStateContent = (
            <p><strong>{searchValue}</strong> doesn&rsquo;t match any options</p>
          );
        }
      }
    }

    const emptyState = emptyStateContent ? (
      <EuiText size="xs" className="euiComoboBox__empty">
        {emptyStateContent}
      </EuiText>
    ) : undefined;

    const groupLabelToGroupMap = {};
    const optionsList = [];

    this.matchingOptions.forEach((option, index) => {
      const {
        value, // eslint-disable-line no-unused-vars
        label,
        ...rest
      } = option;

      const group = this.optionToGroupMap.get(option);

      if (group && !groupLabelToGroupMap[group.label]) {
        groupLabelToGroupMap[group.label] = true;
        optionsList.push(
          <EuiComboBoxTitle key={`group-${group.label}`}>
            {group.label}
          </EuiComboBoxTitle>
        );
      }

      const renderedOption = (
        <EuiComboBoxOption
          option={option}
          key={option.value}
          onClick={this.onOptionClick}
          onEnterKey={this.onOptionEnterKey}
          optionRef={this.optionRef.bind(this, index)}
          {...rest}
        >
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
        </EuiComboBoxOption>
      );

      optionsList.push(renderedOption);
    });

    return (
      <EuiPanel
        paddingSize="none"
        className="euiComboBox__panel"
        data-test-subj="comboBoxOptionsList"
      >
        <div className="euiComboBox__rowWrap">
          {emptyState || optionsList}
        </div>
      </EuiPanel>
    );
  }

  render() {
    const {
      className,
      options, // eslint-disable-line no-unused-vars
      selectedOptions, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onCreateOption, // eslint-disable-line no-unused-vars
      onSearchChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const { searchValue } = this.state;

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isOpen': this.state.isListOpen,
    });

    return (
      <div
        className={classes}
        onBlur={this.onComboBoxBlur}
        onFocus={this.onComboBoxFocus}
        onKeyDown={this.onKeyDown}
        ref={this.comboBoxRef}
        {...rest}
      >
        <EuiFormControlLayout
          icon="arrowDown"
          iconSide="right"
        >
          <div
            className="euiComboBox__inputWrap"
            onClick={this.onComboBoxClick}
            data-test-subj="comboBoxInput"
          >
            {this.renderPills()}

            <EuiValidatableControl isInvalid={false}>
              <AutosizeInput
                role="combobox"
                style={{ fontSize: 14 }}
                className="euiComboBox__input"
                onFocus={this.openList}
                onChange={this.onSearchChange}
                value={searchValue}
                ref={this.autoSizeInputRef}
                inputRef={this.searchInputRef}
              />
            </EuiValidatableControl>
          </div>
        </EuiFormControlLayout>

        {this.renderList()}
      </div>
    );
  }
}
