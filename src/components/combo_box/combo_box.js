import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexOption } from '../flex';
import { EuiText, EuiTextColor } from '../text';
import { EuiPanel } from '../panel';
import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiOutsideClickDetector } from '../outside_click_detector';

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
      isListOpen: this.props.isListOpen,
      value: '',
    };
  }

  onSearchInputFocus = () => {
    this.searchInput.focus();
  };

  openList = () => {
    this.setState({
      isListOpen: true,
    });
  };

  onInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  closeList = () => {
    this.setState({
      isListOpen: false,
    });
  };

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 40: // Down
        break;
      case 38: // Up
        break;
      case 8: // Backspace
        break;
      case 13: // Enter
        break;
    }
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

  onAddOption = (addedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.concat(addedOption));
  };

  onRemoveOption = (removedOption) => {
    const { onChange, selectedOptions } = this.props;
    onChange(selectedOptions.filter(option => option !== removedOption));
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

    return (
      <EuiOutsideClickDetector onOutsideClick={this.closeList}>
        <div
          className={classes}
          {...rest}
        >
          <EuiFormControlLayout
            icon="arrowDown"
            iconSide="right"
          >
            <div
              className="euiComboBox__inputWrap"
              onClick={this.onSearchInputFocus}
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
                  ref={(input) => { this.searchInput = input; }}
                />
              </EuiValidatableControl>
            </div>
          </EuiFormControlLayout>

          {this.renderList()}
        </div>
      </EuiOutsideClickDetector>
    );
  }
}
