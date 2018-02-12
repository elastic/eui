import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiImage } from '../image';
import { EuiKeyboardAccessible } from '../accessibility';

export const EuiCard = ({
  className,
  description,
  title,
  icon,
  image,
  footer,
  onClick,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    {
      'euiCard--isClickable': onClick
    },
    className,
  );

  const cardPanelCanHover = onClick ? true : false;

  let imageNode;
  if (image) {
    imageNode = (
      <EuiImage url={image} alt="" />
    );
  }

  const panelNode = (
    <EuiPanel
      onClick={onClick}
      isHoverable={cardPanelCanHover}
      className={classes}
      {...rest}
    >
      <div className="euiCard__image">
        {imageNode}
        {icon}
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

  if (onClick) {
    return (
      <EuiKeyboardAccessible>
        {panelNode}
      </EuiKeyboardAccessible>
    );
  } else {
    return (panelNode);
  }
};

EuiCard.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  image: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
};
