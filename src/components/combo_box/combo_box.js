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

const getMatchingOptions = (options, selectedOptions, searchValue = '') => {
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

    const { options, selectedOptions } = props;
    const { optionToGroupMap, matchingOptions } = getMatchingOptions(options, selectedOptions);

    this.state = {
      searchValue: '',
      isListOpen: this.props.isListOpen,
      focusedOptionIndex: undefined,
      matchingOptions,
      optionToGroupMap,
    };

    this.options = [];
  }

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  closeList = callback => {
    this.setState({
      isListOpen: false,
      focusedOptionIndex: undefined,
    }, callback);
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
  }

  incrementFocusedOptionIndex = amount => {
    // If there are no options available, reset the focus.
    if (!this.state.matchingOptions.length) {
      this.setState({
        focusedOptionIndex: undefined,
      });
      return;
    }

    let nextFocusedOptionIndex;

    if (this.state.focusedOptionIndex === undefined) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextFocusedOptionIndex = amount < 0 ? this.options.length - 1 : 0;
    } else {
      nextFocusedOptionIndex = this.state.focusedOptionIndex + amount;

      if (nextFocusedOptionIndex < 0) {
        nextFocusedOptionIndex = this.options.length - 1;
      } else if (nextFocusedOptionIndex === this.options.length) {
        nextFocusedOptionIndex = 0;
      }
    }

    this.setState({
      focusedOptionIndex: nextFocusedOptionIndex,
    });
  };

  doesSearchMatchOnlyOption = () => {
    const { matchingOptions, searchValue } = this.state;
    if (matchingOptions.length !== 1) {
      return false;
    }
    return matchingOptions[0].value.toLowerCase() === searchValue.toLowerCase();
  };

  areAllOptionsSelected = ({ options, selectedOptions } = this.props) => {
    return flattenOptionGroups(options).length === selectedOptions.length;
  };

  updateOptionsState = (options, selectedOptions, searchValue) => {
    // Clear refs to options if the ones we can display changes.
    this.options = [];
    const { optionToGroupMap, matchingOptions } = getMatchingOptions(options, selectedOptions, searchValue);

    this.setState({
      optionToGroupMap,
      matchingOptions,
    });

    if (!matchingOptions.length) {
      this.setState({
        focusedOptionIndex: undefined,
      });
    } else {
      // Use prevState because using the ENTER key to select an option will set focusedOptionIndex
      // to undefined, and we want to avoid clobbering it here.
      this.setState(prevState => {
        if (prevState.focusedOptionIndex >= matchingOptions.length) {
          // Clip focusedOptionIndex if it's now out of bounds.
          return {
            focusedOptionIndex: matchingOptions.length - 1,
          };
        }
      });
    }
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        this.incrementFocusedOptionIndex(-1);
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        this.incrementFocusedOptionIndex(1);
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
        if (this.state.focusedOptionIndex !== undefined) {
          this.setState({
            focusedOptionIndex: undefined,
          });
          this.searchInput.focus();
        }
        break;

      case comboBoxKeyCodes.ENTER:
        if (this.doesSearchMatchOnlyOption()) {
          this.options[0].click();
          this.setState({
            searchValue: '',
          }, () => this.updateOptionsState(this.props.options, this.props.selectedOptions, this.state.searchValue));
          return;
        }

        if (!this.props.onCreateOption) {
          return;
        }

        // Don't create the value if it's already been selected.
        if (getSelectedOptionForSearchValue(this.state.searchValue, this.props.selectedOptions)) {
          return;
        }

        // Add new custom pill.
        if (
          this.state.focusedOptionIndex === undefined
          || this.doesSearchMatchOnlyOption()
        ) {
          this.props.onCreateOption(this.state.searchValue, flattenOptionGroups(this.props.options));
          this.setState({
            searchValue: '',
          }, () => this.updateOptionsState(this.props.options, this.props.selectedOptions, this.state.searchValue));
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
    this.setState({
      focusedOptionIndex: undefined,
      searchValue: '',
    }, () => this.updateOptionsState(this.props.options, this.props.selectedOptions, this.state.searchValue));
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
      this.setState({
        focusedOptionIndex: optionIndex,
      });
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
    const searchValue = e.target.value;
    if (this.props.onSearchChange) {
      this.props.onSearchChange();
    }
    this.setState({
      searchValue,
    })

    const { options, selectedOptions } = this.props;
    this.updateOptionsState(options, selectedOptions, searchValue);
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

  componentWillReceiveProps(nextProps) {
    const { options, selectedOptions } = nextProps;

    if (
      options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
    ) {
      this.updateOptionsState(options, selectedOptions, this.state.searchValue);
    }
  }

  componentWillUpdate(nextProps) {
    // If the user has just selected the last option, then focus the input.
    if (!this.areAllOptionsSelected() && this.areAllOptionsSelected(nextProps)) {
      this.searchInput.focus();
    }
  }

  componentDidUpdate() {
    // If an item is focused, focus it.
    if (this.state.focusedOptionIndex !== undefined) {
      this.options[this.state.focusedOptionIndex].focus();
    }
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
    const { matchingOptions, optionToGroupMap, searchValue } = this.state;

    let emptyStateContent;

    if (!options.length) {
      emptyStateContent = <p>There aren&rsquo;t any options available</p>;
    } else if (this.areAllOptionsSelected()) {
      emptyStateContent = <p>You&rsquo;ve selected all available options</p>;
    } else if (matchingOptions.length === 0) {
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

    matchingOptions.forEach((option, index) => {
      const {
        value, // eslint-disable-line no-unused-vars
        label,
        ...rest
      } = option;

      const group = optionToGroupMap.get(option);

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
