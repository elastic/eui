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
import { BACKSPACE, LEFT, RIGHT, TAB, ESCAPE } from '../../services/key_codes';
import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexOption } from '../flex';
import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiHighlight } from '../highlight';
import { EuiPanel } from '../panel';
import { EuiText, EuiTextColor } from '../text';
import { EuiComboBoxPill } from './combo_box_pill';
import { EuiComboBoxOption } from './combo_box_option';

export class EuiComboBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    searchValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onCreateOption: PropTypes.func.isRequired,
  }

  static defaultProps = {
    options: [],
    selectedOptions: [],
  }

  constructor(props) {
    super(props);

    this.options = [];
    this.state = {
      isListOpen: this.props.isListOpen,
      focusedOptionIndex: undefined,
      matchingOptions: [],
    };
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
        // Delete pill
        break;

      case ESCAPE:
        // Move focus from options list to input
        if (this.state.focusedOptionIndex !== undefined) {
          this.setState({
            focusedOptionIndex: undefined,
          });
          this.searchInput.focus();
        }
        break;

      case comboBoxKeyCodes.ENTER:
        if (this.state.focusedOptionIndex !== undefined) {
          // Add new custom pill.
          this.props.onCreateOption();
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
    });
    this.searchInput.focus();
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
  };

  getMatchingOptions(options, selectedOptions, searchValue) {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    return options.filter(option => {
      // Only show options which haven't yet been selected
      if (selectedOptions.includes(option)) {
        return false;
      }
      const normalizedOption = option.label.trim().toLowerCase();
      return normalizedOption.includes(normalizedSearchValue);
    });
  }

  areAllOptionsSelected = ({ options, selectedOptions } = this.props) => {
    return options.length === selectedOptions.length;
  }

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
    this.props.onSearchChange(e.target.value);
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

    const { options, selectedOptions, searchValue } = this.props;
    const matchingOptions = this.getMatchingOptions(options, selectedOptions, searchValue);

    this.setState({
      matchingOptions,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { options, selectedOptions, searchValue } = nextProps;

    if (
      options !== this.props.options
      || selectedOptions !== this.props.selectedOptions
      || searchValue !== this.props.searchValue
    ) {
      // Clear refs to options if the ones we can display changes.
      this.options = [];
      const matchingOptions = this.getMatchingOptions(options, selectedOptions, searchValue);

      this.setState({
        matchingOptions,
      });

      if (!matchingOptions.length) {
        this.setState({
          focusedOptionIndex: undefined,
        });
      } else {
        // Use prevState because using the ENTER key to select an ption will set focusedOptionIndex
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
    return this.props.selectedOptions.map((option, index) => {
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
    let listContent;
    const { options, searchValue } = this.props;
    const { matchingOptions } = this.state;

    if (!options.length) {
      listContent = (
        <div className="euiComoboBox__empty">
          There aren&rsquo;t any options available
        </div>
      );
    } else if (this.areAllOptionsSelected()) {
      listContent = (
        <div className="euiComoboBox__empty">
          You&rsquo;ve selected all available options
        </div>
      );
    } else if (matchingOptions.length === 0) {
      listContent = (
        <div className="euiComoboBox__empty">
          Nothing matches your search
        </div>
      );
    } else {
      listContent = matchingOptions.map((option, index) => {
        const {
          value, // eslint-disable-line no-unused-vars
          label,
          ...rest
        } = option;

        return (
          <EuiComboBoxOption
            option={option}
            key={index}
            onClick={this.onOptionClick}
            onEnterKey={this.onOptionEnterKey}
            optionRef={this.optionRef.bind(this, index)}
            {...rest}
          >
            <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          </EuiComboBoxOption>
        )
      });
    }

    return (
      <EuiPanel
        paddingSize="none"
        className="euiComboBox__panel"
        data-test-subj="comboBoxOptionsList"
      >
        <div className="euiComboBox__rowWrap">
          {listContent}
        </div>
      </EuiPanel>
    );
  }

  render() {
    const {
      className,
      searchValue,
      options, // eslint-disable-line no-unused-vars
      selectedOptions, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onCreateOption, // eslint-disable-line no-unused-vars
      onSearchChange, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

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
