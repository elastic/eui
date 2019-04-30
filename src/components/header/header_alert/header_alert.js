import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonIcon } from '../../button';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import { EuiI18n } from '../../i18n';

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
    <EuiI18n token="euiHeaderAlert.dismiss" default="Dismiss">
      {dismiss => (
        <div className={classes} {...rest}>
          <EuiButtonIcon
            aria-label={dismiss}
            iconType="cross"
            size="s"
            className="euiHeaderAlert__dismiss"
          />

          <div className="euiHeaderAlert__title">{title}</div>

          <div className="euiHeaderAlert__text">{text}</div>

          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <div className="euiHeaderAlert__action euiLink">{action}</div>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <div className="euiHeaderAlert__date">{date}</div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      )}
    </EuiI18n>
  );
};

EuiHeaderAlert.propTypes = {
  action: PropTypes.node,
  className: PropTypes.string,
  date: PropTypes.node.isRequired,
  text: PropTypes.node,
  title: PropTypes.node.isRequired,
};
