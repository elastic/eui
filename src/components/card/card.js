import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel } from '../panel';
import { EuiText } from '../text';
import { EuiTitle } from '../title';

const alignmentToClassNameMap = {
  left: 'euiCard--leftAligned',
  center: 'euiCard--centerAligned',
  right: 'euiCard--rightAligned',
};

export const ALIGNMENTS = Object.keys(alignmentToClassNameMap);

export const EuiCard = ({
  className,
  description,
  title,
  icon,
  image,
  footer,
  onClick,
  alignment,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    alignmentToClassNameMap[alignment],
    {
      'euiCard--isClickable': onClick,
      'euiCard--alignment': alignment,
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
  alignment: PropTypes.oneOf(ALIGNMENTS),
};

EuiCard.defaultProps = {
  alignment: 'center',
};
