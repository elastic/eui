import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendarGrid,
} from './calendar_grid';

import {
  EuiCalendarGridItem,
} from './calendar_grid_item';

import {
  EuiCalendarMonthYearSelector,
} from './calendar_month_year_selector';

import {
  EuiSpacer,
} from '../../../spacer';

export class EuiCalendar extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isMonthYearSelectorOpen: false,
    };

    this.closeMenu = this.closeMenu.bind(this);
  }

  closeMenu() {
    this.setState({
      isMonthYearSelectorOpen: false,
    });
  }

  render() {
    const {
      className,
      isMonthYearSelectorOpen,
      days,
      ...rest
    } = this.props;

    const classes = classNames('euiCalendar', className);

    const gridItemNumberedDays = (
      days.map((item, index) => {
        return  (
          <EuiCalendarGridItem
            key={index}
            isInTheCurrentMonth={item.isInTheCurrentMonth}
            isSelected={item.isSelected}
            isToday={item.isToday}
            isStartDate={item.isStartDate}
            isEndDate={item.isEndDate}
          >
            {item.numberedDay}
          </EuiCalendarGridItem>
        );
      })
    );

    const daysOfWeek = [
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT'
    ];

    const gridItemDaysOfWeek = (
      daysOfWeek.map((item, index) => {
        return (
          <EuiCalendarGridItem
            key={index}
            disabled
          >
            {item}
          </EuiCalendarGridItem>
        );
      })
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        <EuiCalendarMonthYearSelector
          isMonthYearSelectorOpen={this.state.isMonthYearSelectorOpen}
          closeMenu={this.closeMenu}
        />

        <EuiSpacer size="s" />
        <EuiCalendarGrid>
          {gridItemDaysOfWeek}
        </EuiCalendarGrid>
        <EuiCalendarGrid>
          {gridItemNumberedDays}
        </EuiCalendarGrid>
      </div>
    );
  }
}

EuiCalendar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
