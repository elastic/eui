import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle } from '../title';

const textAlignToClassNameMap = {
  left: 'euiCard--leftAligned',
  center: 'euiCard--centerAligned',
  right: 'euiCard--rightAligned',
};

export const ALIGNMENTS = Object.keys(textAlignToClassNameMap);

export const EuiCard = ({
  className,
  description,
  title,
  icon,
  image,
  footer,
  onClick,
  textAlign,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    textAlignToClassNameMap[textAlign],
    {
      'euiCard--isClickable': onClick,
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

  const OuterElement = onClick ? 'button' : 'div';

  return (
    <OuterElement
      onClick={onClick}
      className={classes}
      {...rest}
    >
      <span className="euiCard__top">
        {imageNode}
        {iconNode}
      </span>

      <span className="euiCard__content">
        <EuiTitle size="s" className="euiCard__title">
          <span>{title}</span>
        </EuiTitle>

        <EuiText size="s" className="euiCard__description">
          <p>{description}</p>
        </EuiText>
      </span>

      <span className="euiCard__footer">
        {footer}
      </span>
    </OuterElement>
  );
};

EuiCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  /**
   * Requires a <EuiIcon> node
   */
  icon: PropTypes.node,

  /**
   * Accepts a url in string form
   */
  image: PropTypes.string,

  /**
   * Accepts any combination of elements
   */
  footer: PropTypes.node,

  /**
   * Use only if you want to forego a button in the footer and make the whole card clickable
   */
  onClick: PropTypes.func,
  textAlign: PropTypes.oneOf(ALIGNMENTS),
};

EuiCard.defaultProps = {
  textAlign: 'center',
};
