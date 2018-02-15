import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFieldText,
} from '../../form/field_text';

import {
  EuiCalendar,
} from './calendar';

import {
  EuiPanel,
} from '../../panel';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../flex';

import {
  EuiTimeSelector,
} from './time_selector';

import {
  EuiOutsideClickDetector,
} from '../../outside_click_detector';

export class EuiDateTime extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: this.props.isPopoverOpen,
      value: this.props.value,
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
      days,
      hasTimeSelector,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDateTime',
      {
        'euiDateTime-isOpen': this.state.isPopoverOpen,
      },
      className
    );

    let optionalTimeSelector;

    if (hasTimeSelector) {
      optionalTimeSelector = (
        <EuiFlexItem className="euiDateTime__timeColumn">
          <EuiTimeSelector />
        </EuiFlexItem>
      );
    }

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
            <EuiFlexGroup gutterSize="none" justifyContent="spaceAround">
              <EuiFlexItem grow={false} className="euiDateTime__dateColumn">
                <EuiCalendar days={days} />
              </EuiFlexItem>
              {optionalTimeSelector}
            </EuiFlexGroup>
          </EuiPanel>
        </div>
      </EuiOutsideClickDetector>
    );
  }
}
