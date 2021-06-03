/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  isValidElement,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiBetaBadge, EuiBetaBadgeProps } from '../badge/beta_badge';
import { EuiIconProps } from '../icon';
import {
  EuiCardSelect,
  EuiCardSelectProps,
  euiCardSelectableColor,
} from './card_select';
import { htmlIdGenerator } from '../../services/accessibility';
import { validateHref } from '../../services/security/href_validator';
import { EuiPanel, EuiPanelProps } from '../panel';

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

/**
 * Certain props are only allowed when the layout is vertical
 */
type EuiCardPropsLayout = ExclusiveUnion<
  {
    layout?: 'vertical';
    /**
     * Changes alignment of the title and description
     */
    textAlign?: CardAlignment;
    /**
     * Accepts any combination of elements
     */
    footer?: ReactNode;
    /**
     * Accepts a url in string form or ReactElement for a custom image component
     */
    image?: string | ReactElement;
  },
  {
    /**
     * Change to "horizontal" if you need the icon to be left of the content.
     * Horizontal layouts cannot be used in conjunction with `image`, `footer`, or `textAlign`.
     */
    layout: 'horizontal';
  }
>;

export type EuiCardProps = Omit<CommonProps, 'aria-label'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title' | 'onClick'> &
  EuiCardPropsLayout & {
    /**
     * Cards are required to have at least a title and a description and/or children
     */
    title: NonNullable<ReactNode>;

    /**
     * Determines the title's heading element
     */
    titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

    /**
     * Determines the title's size, matching that of EuiTitle.
     * Though, card titles can't be too large or small relative to the description text.
     */
    titleSize?: 's' | 'xs';

    /**
     * Placed within a small EuiText `<p>` tag
     */
    description?: NonNullable<ReactNode>;

    /**
     * Accepts an `<EuiIcon>` node or `null`
     */
    icon?: ReactElement<EuiIconProps> | null;

    /**
     * Custom children
     */
    children?: ReactNode;

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
     * Add a badge to the card to label it as "Beta" or other non-GA state
     * **DEPRECATED: Use `betaBadgeProps.label` instead.**
     */
    betaBadgeLabel?: string;

    /**
     * Add a description to the beta badge (will appear in a tooltip)
     * **DEPRECATED: Use `betaBadgeProps.tooltipContent` instead.**
     */
    betaBadgeTooltipContent?: ReactNode;

    /**
     * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used.
     * **DEPRECATED: Use `betaBadgeProps.title` instead.**
     */
    betaBadgeTitle?: string;
    betaBadgeProps?: Partial<EuiBetaBadgeProps>;
    /**
     * Matches to the color property of EuiPanel. If defined, removes any border & shadow.
     * Leave as `undefined` to display as a default panel.
     * Selectable cards will always display as a default panel.
     */
    display?: EuiPanelProps['color'];
    /**
     * Padding applied around the content of the card
     */
    paddingSize?: EuiPanelProps['paddingSize'];
    /**
     * Adds a button to the bottom of the card to allow for in-place selection
     */
    selectable?: EuiCardSelectProps;
  } & (
    | {
        // description becomes optional when children is present
        description?: NonNullable<ReactNode>;
        children: ReactNode;
      }
    | {
        // description is required if children is omitted
        description: NonNullable<ReactNode>;
      }
  );

export const EuiCard: FunctionComponent<EuiCardProps> = ({
  className,
  description,
  isDisabled: _isDisabled,
  title,
  titleElement = 'span',
  titleSize = 's',
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
  betaBadgeProps,
  layout = 'vertical',
  selectable,
  display,
  paddingSize,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;
  const isClickable =
    !isDisabled && (onClick || href || (selectable && !selectable.isDisabled));

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
    if (image || footer || textAlign !== 'center') {
      throw new Error(
        'EuiCard: `layout="horizontal"` cannot be used in conjunction with `image`, `footer`, or `textAlign`.'
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
      'euiCard--isClickable': isClickable,
      'euiCard--hasBetaBadge': betaBadgeLabel,
      'euiCard--hasIcon': icon,
      'euiCard--isSelectable': selectable,
      'euiCard-isSelected': selectable && selectable.isSelected,
      'euiCard-isDisabled': isDisabled,
    },
    selectableColorClass,
    className
  );

  const ariaId = htmlIdGenerator()();
  const ariaDesc = description ? `${ariaId}Description` : '';

  /**
   * Top area containing image, icon or both
   */

  let imageNode;
  if (image && layout === 'vertical') {
    if (isValidElement(image) || typeof image === 'string') {
      imageNode = (
        <div className="euiCard__image">
          {isValidElement(image) ? image : <img src={image} alt="" />}
        </div>
      );
    } else {
      imageNode = null;
    }
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
  let optionalBetaBadgeID = '';
  if (betaBadgeLabel) {
    optionalBetaBadgeID = `${ariaId}BetaBadge`;
    optionalBetaBadge = (
      <span className="euiCard__betaBadgeWrapper">
        <EuiBetaBadge
          id={optionalBetaBadgeID}
          {...(betaBadgeProps as EuiBetaBadgeProps)}
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className={classNames(
            'euiCard__betaBadge',
            betaBadgeProps?.className
          )}
        />
      </span>
    );

    // Increase padding size when there is a beta badge unless it's already determined
    paddingSize = paddingSize || 'l';
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
        aria-describedby={`${ariaId}Title ${ariaDesc}`}
        {...selectable}
        buttonRef={(node) => {
          link = node;
        }}
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
        aria-describedby={ariaDesc}
        rel={getSecureRelForTarget({ href, target, rel })}
        ref={(node) => {
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
        aria-describedby={`${optionalBetaBadgeID} ${ariaDesc}`}
        ref={(node) => {
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
    <EuiPanel
      element="div"
      className={classes}
      onClick={isClickable ? outerOnClick : undefined}
      color={isDisabled ? 'subdued' : display}
      hasShadow={isDisabled || display ? false : true}
      hasBorder={display ? false : undefined}
      paddingSize={paddingSize}
      {...rest}>
      {optionalCardTop}

      <div className="euiCard__content">
        <EuiTitle
          id={`${ariaId}Title`}
          className="euiCard__title"
          size={titleSize}>
          <TitleElement>{theTitle}</TitleElement>
        </EuiTitle>

        {description && (
          <EuiText id={ariaDesc} size="s" className="euiCard__description">
            <p>{description}</p>
          </EuiText>
        )}

        {children && <div className="euiCard__children">{children}</div>}
      </div>

      {/* Beta badge should always be after the title/description but before any footer buttons */}
      {optionalBetaBadge}

      {layout === 'vertical' && footer && (
        <div className="euiCard__footer">{footer}</div>
      )}
      {optionalSelectButton}
    </EuiPanel>
  );
};
