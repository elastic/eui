import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendar,
  EuiFieldText,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTimeSelector,
  EuiOutsideClickDetector,
} from '../../../components';

export class EuiDateTime extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: this.props.isPopoverOpen,
      value: '12/18/2017 01:02:03 PM',
    };

    this.handleShowPopover = this.handleShowPopover.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPopoverOpen !== this.state.isPopoverOpen) {
      this.setState({ isPopoverOpen: nextProps.isPopoverOpen });
    }
  }

  handleShowPopover() {
    this.setState({
      isPopoverOpen: true,
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const {
      className,
      closePopover,
      isPopoverOpen,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDateTime',
      {
        'euiDateTime-isOpen': this.state.isPopoverOpen,
      },
      className
    );

    return (
      <EuiOutsideClickDetector onOutsideClick={closePopover}>
        <div
          className={classes}
          {...rest}
        >
          <EuiFieldText
            icon="calendar"
            className="euiDateTime__input"
            onFocus={this.handleShowPopover}
            value={this.state.value}
            onChange={this.handleChange}
          />

          <EuiPanel hasShadow paddingSize="none" className="euiDateTime__panel">
            <EuiFlexGroup gutterSize="none">
              <EuiFlexItem grow={false} className="euiDateTime__dateColumn">
                <EuiCalendar />
              </EuiFlexItem>
              <EuiFlexItem className="euiDateTime__timeColumn">
                <EuiTimeSelector />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </div>
      </EuiOutsideClickDetector>
    );
  }
}
