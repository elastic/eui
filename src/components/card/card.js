import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { EuiTitle } from '../title';

export const EuiCard = ({
  className,
  description,
  title,
  icon,
  image,
  footer,
  onClick,
  isCentered,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    {
      'euiCard--isClickable': onClick,
      'euiCard--isCentered': isCentered,
    },
    className,
  );

  let imageNode;
  if (image) {
    imageNode = (
      <img className="euiCard__image" src={image} alt="" />
    );
  }

  let iconNode;
  if (icon) {
    iconNode = React.cloneElement(
      icon,
      { className: 'euiCard__icon' }
    );
  }

  return (
    <EuiPanel
      onClick={onClick}
      className={classes}
      {...rest}
    >
      <div className="euiCard__top">
        {imageNode}
        {iconNode}
      </div>

      <div className="euiCard__content">
        <EuiTitle size="s" className="euiCard__title">
          <span>{title}</span>
        </EuiTitle>

        <EuiText size="s" className="euiCard__description">
          <p>{description}</p>
        </EuiText>
      </div>

      <div className="euiCard__footer">
        {footer}
      </div>
    </EuiPanel>
  );
};

EuiCard.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  image: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  isCentered: PropTypes.bool,
};

EuiCard.defaultProps = {
  isCentered: false,
};
