import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPanel } from '../panel';
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

  const InnerElement = onClick ? 'span' : 'div';

  return (
    <EuiPanel
      onClick={onClick}
      paddingSize="none"
    >
      <InnerElement
        className={classes}
        {...rest}
      >
        <InnerElement className="euiCard__top">
          {imageNode}
          {iconNode}
        </InnerElement>

        <InnerElement className="euiCard__content">
          <EuiTitle size="s" className="euiCard__title">
            <span>{title}</span>
          </EuiTitle>

          <EuiText size="s" className="euiCard__description">
            <p>{description}</p>
          </EuiText>
        </InnerElement>

        <InnerElement className="euiCard__footer">
          {footer}
        </InnerElement>
      </InnerElement>
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
  textAlign: PropTypes.oneOf(ALIGNMENTS),
};

EuiCard.defaultProps = {
  textAlign: 'center',
};
