import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButton } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiText, EuiTextColor } from '../text';
import { EuiPanel } from '../panel';
import { EuiFormControlLayout, EuiValidatableControl } from '../form';
import { EuiOutsideClickDetector } from '../outside_click_detector';

import { EuiComboBoxPill } from './combo_box_pill';
import { EuiComboBoxRow } from './combo_box_row';

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
      matches: this.props.options,
      focusedRow: -1,
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

  filterItems(query) {
    return this.props.options.filter(function(option) {
      return option.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  onChange = (event) => {
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
        this.focusRowNext();
        break;
      case 38: // Up
        break;
      case 8: // Backspace
        break;
      case 13: // Enter
        break;
    }
  };

  focusRowNext() {
    let rowIndex;
    if (this.state.focusedRow >= this.props.options.length - 1) {
      rowIndex = this.props.options.length - 1;
    } else {
      rowIndex = this.props.focusedRow + 1;
    }

    this.setState({
      focusedRow: rowIndex,
    });
  }

  getMatchingItems() {
    const { options } = this.props;
    const normalizedSearchValue = this.state.value.trim().toLowerCase();
    return options.filter(option => (
      option.label.trim().toLowerCase().includes(normalizedSearchValue)
    ));
  }

  renderPills() {
    return this.props.selectedOptions.map((option, index) => (
      <EuiComboBoxPill key={option.value}>
        {option.label}
      </EuiComboBoxPill>
    ));
  }

  renderList() {
    let listContent;
    const matchingItems = this.getMatchingItems();

    if (matchingItems.length === 0) {
      listContent = (
        <div className="euiComoboBox__empty">
          Nothing matches your search.
        </div>
      );
    } else {
      listContent = matchingItems.map((option, index) => (
        <EuiComboBoxRow value={option.value} key={index}>{option.label}</EuiComboBoxRow>
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
      options,
      selectedOptions,
      onChange,
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
                  onChange={this.onChange}
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
