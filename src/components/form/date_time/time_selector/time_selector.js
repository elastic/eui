import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTimeSelector = ({
  className,
  ...rest,
}) => {
  const classes = classNames('euiTimeSelector', className);

  const times = [
    { time: '12:00 AM' },
    { time: '12:30 AM' },
    { time: '1:00 AM' },
    { time: '1:30 AM' },
    { time: '2:00 AM' },
    { time: '2:30 AM' },
    { time: '3:00 AM' },
    { time: '3:30 AM', isSelected: true},
    { time: '4:00 AM' },
    { time: '4:30 AM' },
    { time: '5:00 AM' },
    { time: '5:30 AM' },
    { time: '6:00 AM' },
    { time: '6:30 AM' },
    { time: '7:00 AM' },
    { time: '7:30 AM' },
    { time: '8:00 AM' },
    { time: '8:30 AM' },
    { time: '9:00 AM' },
    { time: '9:30 AM' },
    { time: '10:00 AM' },
    { time: '10:30 AM' },
    { time: '11:00 AM' },
    { time: '11:30 AM' },
    { time: '12:00 AM' },
    { time: '12:30 PM' },
    { time: '1:00 PM' },
    { time: '1:30 PM' },
    { time: '2:00 PM' },
    { time: '2:30 PM' },
    { time: '3:00 PM' },
    { time: '3:30 PM' },
    { time: '4:00 PM' },
    { time: '4:30 PM' },
    { time: '5:00 PM' },
    { time: '5:30 PM' },
    { time: '6:00 PM' },
    { time: '6:30 PM' },
    { time: '7:00 PM' },
    { time: '7:30 PM' },
    { time: '8:00 PM' },
    { time: '8:30 PM' },
    { time: '9:00 PM' },
    { time: '9:30 PM' },
    { time: '10:00 PM' },
    { time: '10:30 PM' },
    { time: '11:00 PM' },
    { time: '11:30 PM' },
  ]

  const timeListItems = (
    times.map((item, index) => {

      const buttonClasses = classNames(
        'euiTimeSelector__button',
        {
          'euiTimeSelector__button-isSelected': item.isSelected,
        }
      );

      return  (
        <li
          key={index}
        >
          <button className={buttonClasses}>
            {item.time}
          </button>
        </li>
      );
    })
  );


  return (
    <ul
      className={classes}
      {...rest}
    >
    { timeListItems}
    </ul>
  );
};

EuiTimeSelector.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
