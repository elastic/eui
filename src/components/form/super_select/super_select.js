import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiSuperSelectControl } from './super_select_control';
import { EuiPopover } from '../../popover';

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

  itemClicked = () => {
    this.setState({
      isPopoverOpen: false,
    });

    this.props.onChange();
  };

  render() {
    const {
      children,
      className,
      options,
      value,
      onChange,
      isOpen,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSuperSelect',
      className
    );

    const buttonClasses = classNames(
      {
        'euiSuperSelect--isOpen__button': this.state.isPopoverOpen,
      },
    );

    const button = (
      <EuiSuperSelectControl
        options={options}
        value={value}
        onChange={onChange}
        onClick={this.onButtonClick}
        className={buttonClasses}
        {...rest}
      />
    );

    return (
      <div className={classes}>
        <EuiPopover
          style={{ width: '100%', maxWidth: '400px' }}
          panelClassName="euiSuperSelect__popoverPanel"
          id="singlePanel"
          button={button}
          isOpen={isOpen || this.state.isPopoverOpen}
          closePopover={this.closePopover}
          panelPaddingSize="none"
          anchorPosition="downCenter"
        >
          {children}
        </EuiPopover>
      </div>
    );
  }
}

EuiSuperSelect.propTypes = {
  name: PropTypes.string,
  /**
   * You must pass an onChange function to hande the update of the value
   */
  onChange: PropTypes.func,
};

EuiSuperSelect.defaultProps = {
};
