import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonIcon,
} from '../../button';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../flex';

export const EuiHeaderAlert = ({
  action,
  className,
  date,
  text,
  title,
  ...rest
}) => {
  const classes = classNames('euiHeaderAlert', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiButtonIcon
        aria-label="Dismiss"
        iconType="cross"
        size="s"
        className="euiHeaderAlert__dismiss"
      />

      <p className="euiHeaderAlert__title">{title}</p>

      <p className="euiHeaderAlert__text">{text}</p>

      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <div className="euiHeaderAlert__action euiLink">{action}</div>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <div className="euiHeaderAlert__date">
            {date}
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

EuiHeaderAlert.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.node.isRequired,
  text: PropTypes.node,
  title: PropTypes.node.isRequired,
};
