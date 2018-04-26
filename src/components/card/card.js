import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiBetaBadge } from '../badge/beta_badge';

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
  href,
  textAlign,
  isClickable,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    textAlignToClassNameMap[textAlign],
    {
      'euiCard--isClickable': onClick || href || isClickable,
      'euiCard--hasBetaBadge': betaBadgeLabel,
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
      { className: classNames(icon.props.className, 'euiCard__icon') }
    );
  }

  let OuterElement = 'div';
  if (href) {
    OuterElement = 'a';
  } else if (onClick) {
    OuterElement = 'button';
  }

  let optionalCardTop;
  if (image || icon) {
    optionalCardTop = (
      <span className="euiCard__top">
        {imageNode}
        {iconNode}
      </span>
    );
  }

  let optionalBetaBadge;
  if (betaBadgeLabel) {
    optionalBetaBadge = (
      <span className="euiCard__betaBadgeWrapper">
        <EuiBetaBadge label={betaBadgeLabel} title={betaBadgeTitle} tooltipContent={betaBadgeTooltipContent} className="euiCard__betaBadge" />
      </span>
    )
  }

  return (
    <OuterElement
      onClick={onClick}
      className={classes}
      href={href}
      {...rest}
    >
      {optionalBetaBadge}

      {optionalCardTop}

      <span className="euiCard__content">
        <EuiTitle className="euiCard__title">
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
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,

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
  href: PropTypes.string,
  textAlign: PropTypes.oneOf(ALIGNMENTS),

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel: PropTypes.string,

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent: PropTypes.node,

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle: PropTypes.string,
};

EuiCard.defaultProps = {
  textAlign: 'center',
};
