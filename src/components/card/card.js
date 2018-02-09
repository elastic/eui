import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { EuiTitle } from '../title';

export const EuiCard = ({
  children,
  className,
  title,
  image,
  footer,
  ...rest,
}) => {
  const classes = classNames('euiCard', className);

  return (
    <EuiPanel
      className={classes}
      {...rest}
    >
      <div className="euiCard__image">
        {image}
      </div>

      <EuiTitle className="euiCard__title">
        <span>{title}</span>
      </EuiTitle>

      <EuiText className="euiCard__content">
        {children}
      </EuiText>

      <div className="euiCard__footer">
        {footer}
      </div>
    </EuiPanel>
  );
};

EuiCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  footer: PropTypes.node,
};
