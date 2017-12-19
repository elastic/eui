import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiFlexGrid,
  EuiHorizontalRule,
  EuiButtonEmpty,
  EuiText,
  EuiTextColor,
} from '../../../../components';

export class EuiCalendarMonthYearSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
    isMonthYearSelectorOpen: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      isMonthYearSelectorOpen: false,
    };

    this.handleShowMenu = this.handleShowMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isMonthYearSelectorOpen !== this.state.isMonthYearSelectorOpen) {
      this.setState({ isMonthYearSelectorOpen: nextProps.isMonthYearSelectorOpen });
    }
  }

  handleShowMenu() {
    this.setState({
      isMonthYearSelectorOpen: true,
    });
  }

  render() {
    const {
      className,
      closeMenu,
      isMonthYearSelectorOpen,
      ...rest
    } = this.props;

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const gridItemMonths = (
      months.map((item, index) => {
        return (
          <EuiFlexItem
            key={index}
          >
            <EuiButtonEmpty color="text" size="s" className="euiCalendarMonthYearSelector__item">
              {item}
            </EuiButtonEmpty>
          </EuiFlexItem>
        );
      })
    );

    const years = [
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
    ];

    const gridItemYears = (
      years.map((item, index) => {
        return (
          <EuiFlexItem
            key={index}
          >
            <EuiButtonEmpty color="text" size="s" className="euiCalendarMonthYearSelector__item">
              {item}
            </EuiButtonEmpty>
          </EuiFlexItem>
        );
      })
    );

    const classes = classNames(
      'euiCalendarMonthYearSelector',
      {
        'euiCalendarMonthYearSelector-isOpen': this.state.isMonthYearSelectorOpen,
      },
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        <EuiFlexGroup
          alignItems="center"
          justifyContent="spaceBetween"
        >
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              size="s"
              color="text"
              iconType="arrowLeft"
              aria-label="Previous month"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <button onClick={this.handleShowMenu} className="euiCalendarMonthYearSelector__button">
              <span className="euiCalendarMonthYearSelector__month">December</span>
              <span className="euiCalendarMonthYearSelector__year"> 2017</span>
            </button>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              size="s"
              color="text"
              iconType="arrowRight"
              aria-label="Next month"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <div className="euiCalendarMonthYearSelector__menu">
          <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem>
              <EuiTextColor color="subdued">
                <EuiText>
                  <p>Select a month and year</p>
                </EuiText>
              </EuiTextColor>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                iconType="cross"
                color="text"
                onClick={closeMenu}
                aria-label="Close month and year selector"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiHorizontalRule margin="s" />
          <EuiFlexGrid columns={4} gutterSize="none">
            {gridItemMonths}
          </EuiFlexGrid>
          <EuiHorizontalRule margin="xs" />
          <EuiFlexGrid columns={4} gutterSize="none">
            {gridItemYears}
          </EuiFlexGrid>
        </div>
      </div>
    );
  }
}

EuiCalendarMonthYearSelector.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
