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
import { EuiText, EuiTextColor } from '../text';
import { EuiPanel } from '../panel';
import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiComboBoxPill } from './combo_box_pill';
import { EuiComboBoxOption } from './combo_box_option';

export class EuiComboBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selectedOptions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
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
      focusedItemIndex: undefined,
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
      focusedItemIndex: undefined,
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

  incrementFocusedItemIndex = amount => {
    // If there are no options available, reset the focus.
    if (!this.state.matchingOptions.length) {
      this.setState({
        focusedItemIndex: undefined,
      });
      return;
    }

    let nextFocusedItemIndex;

    if (this.state.focusedItemIndex === undefined) {
      // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
      // either the first or last item.
      nextFocusedItemIndex = amount < 0 ? this.options.length - 1 : 0;
    } else {
      nextFocusedItemIndex = this.state.focusedItemIndex + amount;

      if (nextFocusedItemIndex < 0) {
        nextFocusedItemIndex = this.options.length - 1;
      } else if (nextFocusedItemIndex === this.options.length) {
        nextFocusedItemIndex = 0;
      }
    }

    this.setState({
      focusedItemIndex: nextFocusedItemIndex,
    });
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.UP:
        e.preventDefault();
        this.incrementFocusedItemIndex(-1);
        break;

      case comboBoxKeyCodes.DOWN:
        e.preventDefault();
        this.incrementFocusedItemIndex(1);
        break;

      case BACKSPACE:
        // Delete pill
        break;

      case ESCAPE:
        // Move focus from options list to input
        break;

      case comboBoxKeyCodes.ENTER:
        // Select option or add new custom pill
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

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.concat(addedOption));
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
      this.searchInput.copyInputStyles();
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
          focusedItemIndex: undefined,
        });
      } else if (this.state.focusedItemIndex >= matchingOptions.length) {
        // Clip focusedItemIndex if it's now out of bounds.
        this.setState({
          focusedItemIndex: matchingOptions.length - 1,
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
    if (this.state.focusedItemIndex !== undefined) {
      this.options[this.state.focusedItemIndex].focus();
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
    const { options } = this.props;
    const { matchingOptions } = this.state;

    if (!options.length) {
      listContent = (
        <div className="euiComoboBox__empty">
          There aren&rsquo;t any options available.
        </div>
      );
    } else if (this.areAllOptionsSelected()) {
      listContent = (
        <div className="euiComoboBox__empty">
          You&rsquo;ve selected all available options.
        </div>
      );
    } else if (matchingOptions.length === 0) {
      listContent = (
        <div className="euiComoboBox__empty">
          Nothing matches your search.
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
            onClick={this.onAddOption}
            optionRef={this.optionRef.bind(this, index)}
            {...rest}
          >
            {label}
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
      options, // eslint-disable-line no-unused-vars
      selectedOptions, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      searchValue,
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
                ref={this.searchInputRef}
              />
            </EuiValidatableControl>
          </div>
        </EuiFormControlLayout>

        {this.renderList()}
      </div>
    );
  }
}
