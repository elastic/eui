import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiBetaBadge } from '../badge/beta_badge';
import { EuiIconProps } from '../icon';
import {
  EuiCardSelect,
  EuiCardSelectProps,
  euiCardSelectableColor,
} from './card_select';
import makeId from '../form/form_row/make_id';

type CardAlignment = 'left' | 'center' | 'right';

const textAlignToClassNameMap: { [alignment in CardAlignment]: string } = {
  left: 'euiCard--leftAligned',
  center: 'euiCard--centerAligned',
  right: 'euiCard--rightAligned',
};

export const ALIGNMENTS = keysOf(textAlignToClassNameMap);

type CardLayout = 'vertical' | 'horizontal';

const layoutToClassNameMap: { [layout in CardLayout]: string } = {
  vertical: '',
  horizontal: 'euiCard--horizontal',
};

export const LAYOUT_ALIGNMENTS = keysOf(layoutToClassNameMap);

type EuiCardProps = CommonProps & {
  title: NonNullable<ReactNode>;
  /**
   * Determines the title's heading element. Will force to 'span' if
   * the card is a button.
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  description: NonNullable<ReactNode>;

  /**
   * Requires a <EuiIcon> node
   */
  icon?: ReactElement<EuiIconProps>;

  /**
   * Accepts a url in string form
   */
  image?: string;

  /**
   * Accepts any combination of elements
   */
  footer?: ReactNode;

  /**
   * Use only if you want to forego a button in the footer and make the whole card clickable
   */
  onClick?: Function;
  href?: string;
  target?: string;
  rel?: string;
  textAlign?: CardAlignment;

  /**
   * Change to "horizontal" if you need the icon to be left of the content
   */
  layout?: CardLayout;

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle?: string;

  /**
   * Adds a button to the bottom of the card to allow for in-place selection.
   */
  selectable?: EuiCardSelectProps;

  /**
   * Add a decorative bottom graphic to the card.
   * This should be used sparingly, consult the Kibana Design team before use.
   */
  bottomGraphic?: ReactNode;

  isClickable?: boolean;

  isDisabled?: boolean;
};

export const EuiCard: FunctionComponent<EuiCardProps> = ({
  className,
  description,
  isDisabled,
  title,
  titleElement = 'span',
  icon,
  image,
  footer,
  onClick,
  href,
  rel,
  target,
  textAlign = 'center',
  isClickable,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  layout = 'vertical',
  bottomGraphic,
  selectable,
  ...rest
}) => {
  if (layout === 'horizontal') {
    if (image || footer) {
      throw new Error(
        "EuiCard: layout = horizontal' cannot be used in conjunction with 'image', 'footer', or 'textAlign'."
      );
    }
  }

  const selectableColorClass = selectable
    ? `euiCard--isSelectable--${euiCardSelectableColor(
        selectable.color,
        selectable.isSelected
      )}`
    : undefined;

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
    className
  );

  const ariaId = makeId();

  let secureRel;
  if (href) {
    secureRel = getSecureRelForTarget({ href, target, rel });
  }

  let imageNode;
  if (image && layout === 'vertical') {
    imageNode = <img className="euiCard__image" src={image} alt="" />;
  }

  let iconNode;
  if (icon) {
    iconNode = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'euiCard__icon'),
    });
  }

  if (selectable && isDisabled && selectable.isDisabled === undefined) {
    selectable.isDisabled = isDisabled;
  }

  let OuterElement = 'div';
  if (!isDisabled && href) {
    OuterElement = 'a';
  } else if (isDisabled || onClick) {
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
      <span className="euiCard__graphic">{bottomGraphic}</span>
    );
  }

  let optionalSelectButton;
  if (selectable) {
    if (bottomGraphic) {
      console.warn(
        'EuiCard cannot support both `bottomGraphic` and `selectable`. It will ignore the bottomGraphic.'
      );
    }

    optionalSelectButton = (
      <EuiCardSelect
        aria-describedby={`${ariaId}Title ${ariaId}Description`}
        {...selectable}
      />
    );
  }

  return (
    // @ts-ignore
    <OuterElement
      onClick={onClick}
      className={classes}
      href={href}
      disabled={!selectable ? isDisabled : undefined}
      target={target}
      rel={secureRel}
      {...rest}>
      {optionalBetaBadge}

      {optionalCardTop}

      <span className="euiCard__content">
        <EuiTitle id={`${ariaId}Title`} className="euiCard__title">
          <TitleElement>{title}</TitleElement>
        </EuiTitle>

        <EuiText
          id={`${ariaId}Description`}
          size="s"
          className="euiCard__description">
          <p>{description}</p>
        </EuiText>
      </span>

      {layout === 'vertical' && (
        <span className="euiCard__footer">{footer}</span>
      )}

      {optionalSelectButton || optionalBottomGraphic}
    </OuterElement>
  );
};

EuiCard.defaultProps = {
  textAlign: 'center',
  layout: 'vertical',
  titleElement: 'span',
};
