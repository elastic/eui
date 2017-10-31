import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextColor,
  EuiPanel,
  EuiComboBoxPill,
  EuiComboBoxRow,
  EuiFormControlLayout,
  EuiValidatableControl,
  EuiOutsideClickDetector,
} from '../../../components';

export class EuiComboBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: this.props.isPopoverOpen,
      value: '',
      matches: this.props.options,
      focusedRow: -1,
    };

    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
    this.handleShowPopover = this.handleShowPopover.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPopoverOpen !== this.state.isPopoverOpen) {
      this.setState({ isPopoverOpen: nextProps.isPopoverOpen });
    }
  }

  handleSearchInputFocus() {
    this.searchInput.focus();
  }

  handleShowPopover() {
    this.setState({
      isPopoverOpen: true,
    });
  }

  filterItems(query) {
    return this.props.options.filter(function(option) {
      return option.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleClosePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  handleKeyDown(e) {
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
  }

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

  render() {
    const {
      children,
      options,
      isInvalid,
      isPopoverOpen,
      className,
      closePopover,
      selectedOptions,
      optionTypeName,
      ...rest,
    } = this.props;

    const searchString = this.state.value.toLowerCase();

    const matches =
      this.props.options.filter(option => (
        option.text.toLowerCase().indexOf(searchString) !== -1
      )).map((option, index) => {
        return (
          <EuiComboBoxRow value={option.value} key={index}>{option.text}</EuiComboBoxRow>
        );
      });

    const exactMatches = this.props.options.filter(function (option) {
      return (option.text.toLowerCase() === searchString);
    });

    let matchesOrEmpty = null;
    if (matches.length === 0) {
      matchesOrEmpty = (
        <div className="euiComoboBox__empty">
          No {optionTypeName} matches your search.
        </div>
      );
    } else {
      matchesOrEmpty = matches;
    }

    const classes = classNames(
      'euiComboBox',
      {
        'euiComboBox-isOpen': this.state.isPopoverOpen,
      },
      className
    );

    const panelClasses = classNames(
      'euiComboBox__panel',
    );

    let footer = null;

    if ((exactMatches.length === 0) && (searchString !== '')) {
      footer = (
        <div className="euiComboBox__footer">
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText size="small">
                <EuiTextColor color="subdued">
                  Not listed?
                </EuiTextColor>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton size="small">Add {this.state.value}</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      );
    } else if (searchString === '') {
      footer = (
        <div className="euiComboBox__footer">
          <EuiText size="small">
            <EuiTextColor color="subdued">
              Start typing to add a new {optionTypeName}.
            </EuiTextColor>
          </EuiText>
        </div>
      );
    }

    return (
      <EuiOutsideClickDetector onOutsideClick={closePopover}>
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
              onClick={this.handleSearchInputFocus}
            >
              {selectedOptions.map((option, index) => {
                return <EuiComboBoxPill key={index}>{option.text}</EuiComboBoxPill>;
              })}

              <EuiValidatableControl isInvalid={isInvalid}>
                <input
                  type="search"
                  className="euiComboBox__input"
                  onFocus={this.handleShowPopover}
                  value={this.state.value}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  ref={(input) => { this.searchInput = input; }}
                />
              </EuiValidatableControl>
            </div>
          </EuiFormControlLayout>
          <EuiPanel paddingSize="none" className={panelClasses}>
            <div className="euiComboBox__rowWrap">
              {matchesOrEmpty}
            </div>
            {footer}
          </EuiPanel>
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiComboBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  // options: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  // selectedOptions: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isInvalid: PropTypes.bool,
  isPopoverOpen: PropTypes.bool,
};

EuiComboBox.defaultProps = {
  options: [],
  selectedOptions: [],
};
