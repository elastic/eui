import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getSecureRelForTarget } from '../../services';

import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiBetaBadge } from '../badge/beta_badge';

const textAlignToClassNameMap = {
  left: 'euiCard--leftAligned',
  center: 'euiCard--centerAligned',
  right: 'euiCard--rightAligned',
};

export const ALIGNMENTS = Object.keys(textAlignToClassNameMap);

const layoutToClassNameMap = {
  vertical: '',
  horizontal: 'euiCard--horizontal',
};

export const LAYOUT_ALIGNMENTS = Object.keys(layoutToClassNameMap);
const oneOfLayouts = PropTypes.oneOf(LAYOUT_ALIGNMENTS);

const cardLayout = (props, propName, componentName, ...rest) => {
  const oneOfResult = oneOfLayouts(props, propName, componentName, ...rest);
  if (oneOfResult) return oneOfResult;

  if (props[propName] === 'horizontal') {
    if (props.image || props.footer) {
      return new Error(
        `${componentName}: '${propName} = horizontal' cannot be used in conjunction with 'image', 'footer', or 'textAlign'.`
      );
    }
  }
};

export const EuiCard = ({
  className,
  description,
  title,
  icon,
  image,
  footer,
  onClick,
  href,
  rel,
  target,
  textAlign,
  isClickable,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  layout,
  ...rest,
}) => {
  const classes = classNames(
    'euiCard',
    textAlignToClassNameMap[textAlign],
    layoutToClassNameMap[layout],
    {
      'euiCard--isClickable': onClick || href || isClickable,
      'euiCard--hasBetaBadge': betaBadgeLabel,
      'euiCard--hasIcon': icon,
    },
    className,
  );

  let secureRel;
  if (href) {
    secureRel = getSecureRelForTarget(target, rel);
  }

  let imageNode;
  if (image && layout === 'vertical') {
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
  if (imageNode || iconNode) {
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
        <EuiBetaBadge
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className="euiCard__betaBadge"
        />
      </span>
    );
  }

  return (
    <OuterElement
      onClick={onClick}
      className={classes}
      href={href}
      target={target}
      rel={secureRel}
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

      {layout === 'vertical' &&
        <span className="euiCard__footer">
          {footer}
        </span>
      }
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
  target: PropTypes.string,
  rel: PropTypes.string,
  textAlign: PropTypes.oneOf(ALIGNMENTS),

  /**
   * Change to "horizontal" if you need the icon to be left of the content
   */
  layout: cardLayout,

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
  layout: 'vertical',
};
