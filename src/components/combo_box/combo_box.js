/**
 * Elements within EuiComboBox which would normally be tabbable (inputs, buttons) have been removed
 * from the tab order with tabindex="-1" so that we can control the keyboard navigation interface.
 */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { comboBoxKeyCodes } from '../../services';
import { BACKSPACE, LEFT, RIGHT } from '../../services/key_codes';
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
  }

  static defaultProps = {
    options: [],
    selectedOptions: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      isListOpen: this.props.isListOpen,
      value: '',
    };
  }

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  closeList = () => {
    this.setState({
      isListOpen: false,
    });
  };

  onComboBoxClick = () => {
    // When the user clicks anywhere on the box, enter the interaction state.
    this.searchInput.focus();
  };

  onInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case comboBoxKeyCodes.DOWN:
        break;
      case comboBoxKeyCodes.UP:
        break;
      case BACKSPACE:
        break;
      case comboBoxKeyCodes.ENTER:
        break;
    }
  };

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.concat(addedOption));
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
  };

  getMatchingOptions() {
    const { options, selectedOptions } = this.props;
    const normalizedSearchValue = this.state.value.trim().toLowerCase();
    return options.filter(option => {
      // Only show options which haven't yet been selected
      if (selectedOptions.includes(option)) {
        return false;
      }
      const normalizedOption = option.label.trim().toLowerCase();
      return normalizedOption.includes(normalizedSearchValue);
    });
  }

  onComboBoxFocus = (e) => {
    // If the user has tabbed to the combo box, open it.
    if (e.target === this.comboBox) {
      this.searchInput.focus();
      this.setState({
        hasFocus: true,
      });
    }
  };

  onComboBoxBlur = () => {
    // Wait for the DOM to update.
    requestAnimationFrame(() => {
      // If the user has tabbed away, close the combo box.
      const hasFocus = this.comboBox.contains(document.activeElement);
      if (!hasFocus) {
        this.closeList();

        this.setState({
          hasFocus: false,
        });
      }
    });
  };

  comboBoxRef = node => {
    this.comboBox = node;
  };

  searchInputRef = node => {
    this.searchInput = node;
  };

  renderPills() {
    return this.props.selectedOptions.map((option, index) => (
      <EuiComboBoxPill
        option={option}
        onClose={this.onRemoveOption}
        key={option.value}
      >
        {option.label}
      </EuiComboBoxPill>
    ));
  }

  renderList() {
    let listContent;
    const matchingOptions = this.getMatchingOptions();

    if (matchingOptions.length === 0) {
      listContent = (
        <div className="euiComoboBox__empty">
          Nothing matches your search.
        </div>
      );
    } else {
      listContent = matchingOptions.map((option, index) => (
        <EuiComboBoxOption
          option={option}
          key={index}
          onClick={this.onAddOption}
        >
          {option.label}
        </EuiComboBoxOption>
      ));
    }

    return (
      <EuiPanel paddingSize="none" className="euiComboBox__panel">
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
      ...rest,
    } = this.props;

    const classes = classNames('euiComboBox', className, {
      'euiComboBox-isOpen': this.state.isListOpen,
    });

    // If we already have focus, then allow the user to shift-tab out of the combo box.
    const isFocusable = this.state.hasFocus ? '-1' : '0';

    return (
      <div
        className={classes}
        onBlur={this.onComboBoxBlur}
        onFocus={this.onComboBoxFocus}
        ref={this.comboBoxRef}
        tabIndex={isFocusable}
        role="button"
        {...rest}
      >
        <EuiFormControlLayout
          icon="arrowDown"
          iconSide="right"
        >
          <div
            className="euiComboBox__inputWrap"
            onClick={this.onComboBoxClick}
          >
            {this.renderPills()}

            <EuiValidatableControl isInvalid={false}>
              <input
                type="search"
                className="euiComboBox__input"
                onFocus={this.openList}
                value={this.state.value}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
                ref={this.searchInputRef}
                tabIndex="-1"
              />
            </EuiValidatableControl>
          </div>
        </EuiFormControlLayout>

        {this.renderList()}
      </div>
    );
  }
}
