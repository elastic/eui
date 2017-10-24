import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../..';

export const EuiHeaderAlert = ({
  action,
  className,
  date,
  text,
  title,
  ...rest,
}) => {
  const classes = classNames('kuiHeaderAlert', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiButtonIcon iconType="cross" size="small" className="kuiHeaderAlert__dismiss" />
      <p className="kuiHeaderAlert__title">{title}</p>
      <p className="kuiHeaderAlert__text">{text}</p>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <div className="kuiHeaderAlert__action kuiLink">{action}</div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div className="kuiHeaderAlert__date">
            {date}
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

EuiHeaderAlert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
};
