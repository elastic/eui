import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';
import DatePicker from 'react-datepicker';

export class EuiDatePicker extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const {
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiDatePicker',
      'euiFieldText',
      className
    );

    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        className={classes}
        showTimeSelect
        dateFormat="LLL"
        {...rest}
      />
    );
  }
}
