import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiSuperSelectControl } from './super_select_control';
import { EuiPopover } from '../../popover';
import { EuiContextMenuItem } from '../../context_menu';

export class EuiSuperSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: props.isOpen || false,
    };
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  itemClicked = (value) => {
    this.setState({
      isPopoverOpen: false,
    });
    this.props.onChange(value);
  };

  render() {
    const {
      className,
      options,
      valueOfSelected,
      onChange,
      isOpen,
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      ...rest
    } = this.props;

    const buttonClasses = classNames(
      {
        'euiSuperSelect--isOpen__button': this.state.isPopoverOpen,
      },
      className,
    );

    const itemClasses = classNames(
      'euiSuperSelect__item',
      {
        'euiSuperSelect__item--hasDividers': hasDividers,
      },
      itemClassName,
    );

    const button = (
      <EuiSuperSelectControl
        options={options}
        value={valueOfSelected}
        onChange={onChange}
        onClick={this.onButtonClick}
        className={buttonClasses}
        {...rest}
      />
    );

    const items = options.map((option, index) => {
      return (
        <EuiContextMenuItem
          key={index}
          className={itemClasses}
          icon={valueOfSelected === option.value ? "check" : "empty"}
          onClick={() => this.itemClicked(option.value)}
          layoutAlign={itemLayoutAlign}
        >
          {option.dropdownDisplay || option.inputDisplay}
        </EuiContextMenuItem>
      );
    });

    return (
      <EuiPopover
        className="euiSuperSelect"
        panelClassName="euiSuperSelect__popoverPanel"
        button={button}
        isOpen={isOpen || this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="downCenter"
      >
        {items}
      </EuiPopover>
    );
  }
}

EuiSuperSelect.propTypes = {
  /**
   * Classes (and `...rest`) will be applied to the control
   */
  className: PropTypes.string,
  /**
   * Classes for the context menu item
   */
  itemClassName: PropTypes.string,
  /**
   * You must pass an `onChange` function to handle the update of the value
   */
  onChange: PropTypes.func,
  /**
   * Pass an array of options that must at least include:
   * `value`: storing unique value of item,
   * `inputDisplay`: what shows inside the form input when selected
   * `dropdownDisplay` (optional): what shows for the item in the dropdown
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      inputDisplay: PropTypes.node,
      dropdownDisplay: PropTypes.node,
    }),
  ).isRequired,
  valueOfSelected: PropTypes.string,
  /**
   * Change to `true` if you want horizontal lines between options.
   * This is best used when options are multi-line.
   */
  hasDividers: PropTypes.bool,
  /**
   * Change `EuiContextMenuItem` layout position of icon
   */
  itemLayoutAlign: PropTypes.string,
};

EuiSuperSelect.defaultProps = {
  options: [],
};
