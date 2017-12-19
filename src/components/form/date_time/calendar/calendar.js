import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCalendarGrid,
  EuiCalendarGridItem,
  EuiCalendarMonthYearSelector,
  EuiSpacer,
} from '../../../../components';

export class EuiCalendar extends Component {
  static propTypes = {
    children: PropTypes.node,
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
      children,
      className,
      closeMenu,
      isMonthYearSelectorOpen,
      ...rest
    } = this.props;

    const classes = classNames('euiCalendar', className);

    const numberedDays = [
      { numberedDay: 26 },
      { numberedDay: 27 },
      { numberedDay: 28 },
      { numberedDay: 29 },
      { numberedDay: 30 },
      { numberedDay: 1, isInTheCurrentMonth: true },
      { numberedDay: 2, isInTheCurrentMonth: true },
      { numberedDay: 3, isInTheCurrentMonth: true },
      { numberedDay: 4, isInTheCurrentMonth: true },
      { numberedDay: 5, isInTheCurrentMonth: true },
      { numberedDay: 6, isInTheCurrentMonth: true },
      { numberedDay: 7, isInTheCurrentMonth: true, isToday: true },
      { numberedDay: 8, isInTheCurrentMonth: true, isSelected: true, isStartDate: true },
      { numberedDay: 9, isInTheCurrentMonth: true, isSelected: true },
      { numberedDay: 10, isInTheCurrentMonth: true, isSelected: true },
      { numberedDay: 11, isInTheCurrentMonth: true, isSelected: true },
      { numberedDay: 12, isInTheCurrentMonth: true, isSelected: true },
      { numberedDay: 13, isInTheCurrentMonth: true, isSelected: true },
      { numberedDay: 14, isInTheCurrentMonth: true, isSelected: true, isEndDate: true },
      { numberedDay: 15, isInTheCurrentMonth: true },
      { numberedDay: 16, isInTheCurrentMonth: true },
      { numberedDay: 17, isInTheCurrentMonth: true },
      { numberedDay: 18, isInTheCurrentMonth: true },
      { numberedDay: 19, isInTheCurrentMonth: true },
      { numberedDay: 20, isInTheCurrentMonth: true },
      { numberedDay: 21, isInTheCurrentMonth: true },
      { numberedDay: 22, isInTheCurrentMonth: true },
      { numberedDay: 23, isInTheCurrentMonth: true },
      { numberedDay: 24, isInTheCurrentMonth: true },
      { numberedDay: 25, isInTheCurrentMonth: true },
      { numberedDay: 26, isInTheCurrentMonth: true },
      { numberedDay: 27, isInTheCurrentMonth: true },
      { numberedDay: 28, isInTheCurrentMonth: true },
      { numberedDay: 29, isInTheCurrentMonth: true },
      { numberedDay: 30, isInTheCurrentMonth: true },
      { numberedDay: 31, isInTheCurrentMonth: true },
      { numberedDay: 1 },
      { numberedDay: 2 },
      { numberedDay: 3 },
      { numberedDay: 4 },
      { numberedDay: 5 },
      { numberedDay: 6 },
    ];

    const gridItemNumberedDays = (
      numberedDays.map((item, index) => {
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
