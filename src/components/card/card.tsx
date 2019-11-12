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
  /**
   * Card's are required to have at least a title and description
   */
  title: NonNullable<ReactNode>;

  /**
   * Determines the title's heading element.
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

  /**
   * Card's are required to have at least a title and description
   */
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
   * Content to be rendered between the description and the footer.
   */
  children?: ReactNode;

  /**
   * Accepts any combination of elements
   */
  footer?: ReactNode;

  /**
   * Use only if you want to forego a button in the footer and make the whole card clickable
   */
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | React.MouseEventHandler<HTMLAnchorElement>;
  isDisabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;

  /**
   * Changes alignment of the title and description
   */
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
};

export const EuiCard: FunctionComponent<EuiCardProps> = ({
  className,
  description,
  isDisabled,
  title,
  titleElement = 'span',
  icon,
  image,
  children,
  footer,
  onClick,
  href,
  rel,
  target,
  textAlign = 'center',
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  layout = 'vertical',
  selectable,
  ...rest
}) => {
  /**
   * For a11y, we simulate the same click that's provided on the title when clicking the whole card
   * without having to make the whole card a button or anchor tag.
   * *Card Accessibility: The redundant click event https://inclusive-components.design/cards/*
   */
  let link: HTMLAnchorElement | HTMLButtonElement | null = null;
  const outerOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (link && link !== e.target) {
      link.click();
    }
  };

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
      'euiCard--isClickable': onClick || href,
      'euiCard--hasBetaBadge': betaBadgeLabel,
      'euiCard--hasIcon': icon,
      'euiCard--hasChildren': children,
      'euiCard--isDisabled': isDisabled,
      'euiCard--isSelectable': selectable,
      'euiCard-isSelected': selectable && selectable.isSelected,
    },
    selectableColorClass,
    className
  );

  const ariaId = makeId();

  /**
   * Top area containing image, icon or both
   */

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

  let optionalCardTop;
  if (imageNode || iconNode) {
    optionalCardTop = (
      <div className="euiCard__top">
        {imageNode}
        {iconNode}
      </div>
    );
  }

  /**
   * Optional EuiBetaBadge
   */

  let optionalBetaBadge;
  let optionalBetaBadgeID;
  if (betaBadgeLabel) {
    optionalBetaBadgeID = `${ariaId}BetaBadge`;
    optionalBetaBadge = (
      <span className="euiCard__betaBadgeWrapper">
        <EuiBetaBadge
          id={optionalBetaBadgeID}
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className="euiCard__betaBadge"
        />
      </span>
    );
  }

  /**
   * Optional selectable button
   */

  if (selectable && isDisabled && selectable.isDisabled === undefined) {
    selectable.isDisabled = isDisabled;
  }

  let optionalSelectButton;
  if (selectable) {
    optionalSelectButton = (
      <EuiCardSelect
        aria-describedby={`${ariaId}Title ${ariaId}Description`}
        {...selectable}
      />
    );
  }

  /**
   * Wraps the title with the link (<a>) or button.
   * This makes the title element a11y friendly and gets described by its content if its interactable.
   */

  let theTitle;
  if (!isDisabled && href) {
    theTitle = (
      <a
        className="euiCard__titleAnchor"
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        href={href}
        target={target}
        aria-describedby={`${ariaId}Description`}
        rel={getSecureRelForTarget({ href, target, rel })}
        ref={node => {
          link = node;
        }}>
        {title}
      </a>
    );
  } else if (isDisabled || onClick) {
    theTitle = (
      <button
        className="euiCard__titleButton"
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        disabled={isDisabled}
        aria-describedby={`${optionalBetaBadgeID} ${ariaId}Description`}
        ref={node => {
          link = node;
        }}>
        {title}
      </button>
    );
  } else {
    theTitle = title;
  }

  /**
   * Convert titleElement to a capital TitleElement
   */

  const TitleElement = titleElement;

  return (
    <div className={classes} onClick={outerOnClick} {...rest}>
      {optionalBetaBadge}
      {optionalCardTop}

      <div className="euiCard__content">
        <EuiTitle id={`${ariaId}Title`} className="euiCard__title" size="s">
          <TitleElement>{theTitle}</TitleElement>
        </EuiTitle>

        <EuiText
          id={`${ariaId}Description`}
          size="s"
          className="euiCard__description">
          <p>{description}</p>
        </EuiText>

        {children}
      </div>

      {layout === 'vertical' && <div className="euiCard__footer">{footer}</div>}
      {optionalSelectButton}
    </div>
  );
};
