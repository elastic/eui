import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiTimeSelector = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiTimeSelector', className);

  const times = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
  ]

  const timeListItems = (
    times.map((time, index) => {
      return  (
        <li
          key={index}
        >
          <button className="euiTimeSelector__button">
            {time}
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
    {timeListItems}
    </ul>
  );
};

EuiTimeSelector.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
