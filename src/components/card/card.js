import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getSecureRelForTarget } from '../../services';

import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiBetaBadge } from '../badge/beta_badge';
import { EuiCardSelect, EuiCardSelectProps, euiCardSelectableColor } from './card_select';
import makeId from '../form/form_row/make_id';

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
  titleElement,
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
  bottomGraphic,
  selectable,
  ...rest,
}) => {
  const selectableColorClass = selectable ?
    `euiCard--isSelectable--${euiCardSelectableColor(selectable.color, selectable.isSelected)}` : undefined;

  const classes = classNames(
    'euiCard',
    textAlignToClassNameMap[textAlign],
    layoutToClassNameMap[layout],
    {
      'euiCard--isClickable': onClick || href || isClickable,
      'euiCard--hasBetaBadge': betaBadgeLabel,
      'euiCard--hasIcon': icon,
      'euiCard--hasBottomGraphic': bottomGraphic,
      'euiCard--isSelectable': selectable,
      'euiCard-isSelected': selectable && selectable.isSelected,
    },
    selectableColorClass,
    className,
  );

  const ariaId = makeId();

  let secureRel;
  if (href) {
    secureRel = getSecureRelForTarget({ href, target, rel });
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

  let TitleElement = titleElement;
  if (OuterElement === 'button') {
    TitleElement = 'span';
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

  let optionalBottomGraphic;
  if (bottomGraphic) {
    optionalBottomGraphic = (
      <span className="euiCard__graphic">
        {bottomGraphic}
      </span>
    );
  }

  let optionalSelectButton;
  if (selectable) {
    if (bottomGraphic) {
      console.warn('EuiCard cannot support both `bottomGraphic` and `selectable`. It will ignore the bottomGraphic.');
    }

    optionalSelectButton = <EuiCardSelect aria-describedby={`${ariaId}Title ${ariaId}Description`} {...selectable} />;
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
        <EuiTitle id={`${ariaId}Title`} className="euiCard__title">
          <TitleElement>{title}</TitleElement>
        </EuiTitle>

        <EuiText id={`${ariaId}Description`} size="s" className="euiCard__description">
          <p>{description}</p>
        </EuiText>
      </span>

      {layout === 'vertical' &&
        <span className="euiCard__footer">
          {footer}
        </span>
      }

      {optionalSelectButton || optionalBottomGraphic}
    </OuterElement>
  );
};

EuiCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  /**
   * Determines the title's heading element. Will force to 'span' if
   * the card is a button.
   */
  titleElement: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6', 'span']),
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

  /**
   * Adds a button to the bottom of the card to allow for in-place selection.
   */
  selectable: PropTypes.shape(EuiCardSelectProps),

  /**
   * Add a decorative bottom graphic to the card.
   * This should be used sparingly, consult the Kibana Design team before use.
   */
  bottomGraphic: PropTypes.node,
};

EuiCard.defaultProps = {
  textAlign: 'center',
  layout: 'vertical',
  titleElement: 'span',
};
