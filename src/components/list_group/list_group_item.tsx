import React, {
  Fragment,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { EuiIcon, IconType } from '../icon';
import { EuiToolTip } from '../tool_tip';
import { useInnerText } from '../inner_text';
import { ExclusiveUnion, CommonProps } from '../common';

type ItemSize = 'xs' | 's' | 'm' | 'l';
const sizeToClassNameMap: { [size in ItemSize]: string } = {
  xs: 'euiListGroupItem--xSmall',
  s: 'euiListGroupItem--small',
  m: 'euiListGroupItem--medium',
  l: 'euiListGroupItem--large',
};
export const SIZES = Object.keys(sizeToClassNameMap) as ItemSize[];

type Color = 'inherit' | 'primary' | 'text' | 'subdued';
const colorToClassNameMap: { [color in Color]: string } = {
  inherit: '',
  primary: 'euiListGroupItem--primary',
  text: 'euiListGroupItem--text',
  subdued: 'euiListGroupItem--subdued',
};
export const COLORS = Object.keys(colorToClassNameMap) as Color[];

export type EuiListGroupItemProps = CommonProps &
  ExclusiveUnion<
    ExclusiveUnion<
      ButtonHTMLAttributes<HTMLButtonElement>,
      AnchorHTMLAttributes<HTMLAnchorElement>
    >,
    HTMLAttributes<HTMLSpanElement>
  > & {
    /**
     * Size of the label text
     */
    size?: ItemSize;
    /**
     * By default the item will inherit the color of its wrapper (button/link/span),
     * otherwise pass on of the acceptable options
     */
    color?: Color;

    /**
     * Content to be displayed in the list item
     */
    label: ReactNode;

    /**
     * Apply styles indicating an item is active
     */
    isActive?: boolean;

    /**
     * Apply styles indicating an item is disabled
     */
    isDisabled?: boolean;

    /**
     * Make the list item label a link.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    href?: string;

    /**
     * Adds `EuiIcon` of `EuiIcon.type`
     */
    iconType?: IconType;

    /**
     * Custom node to pass as the icon. Cannot be used in conjunction
     * with `iconType`.
     */
    icon?: ReactElement;

    /**
     * Display tooltip on list item
     */
    showToolTip?: boolean;

    /**
     * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
     * pass `alwaysShow` if you don't want the default behavior of only showing on hover
     */
    extraAction?: EuiButtonIconPropsForButton & {
      alwaysShow?: boolean;
    };

    /**
     * Make the list item label a button.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Allow link text to wrap
     */
    wrapText?: boolean;

    /**
     * Pass-through ref reference specifically for targeting
     * instances where the item content is rendered as a `button`
     */
    buttonRef?: React.RefObject<HTMLButtonElement>;
  };

export const EuiListGroupItem: FunctionComponent<EuiListGroupItemProps> = ({
  label,
  isActive = false,
  isDisabled = false,
  href,
  className,
  iconType,
  icon,
  extraAction,
  onClick,
  size = 'm',
  color = 'inherit',
  showToolTip = false,
  wrapText,
  buttonRef,
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    {
      'euiListGroupItem-isActive': isActive,
      'euiListGroupItem-isDisabled': isDisabled,
      'euiListGroupItem-isClickable': href || onClick,
      'euiListGroupItem-hasExtraAction': extraAction,
      'euiListGroupItem--wrapText': wrapText,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = <EuiIcon className="euiListGroupItem__icon" type={iconType} />;

    if (icon) {
      console.warn(
        'Both `iconType` and `icon` were passed to EuiListGroupItem but only one can exist. The `iconType` was used.'
      );
    }
  } else if (icon) {
    iconNode = React.cloneElement(icon, {
      className: classNames('euiListGroupItem__icon', icon.props.className),
    });
  }

  let extraActionNode;

  if (extraAction) {
    const { iconType, alwaysShow, className, ...rest } = extraAction;

    const extraActionClasses = classNames(
      'euiListGroupItem__extraAction',
      {
        'euiListGroupItem__extraAction-alwaysShow': alwaysShow,
      },
      className
    );

    extraActionNode = (
      <EuiButtonIcon
        className={extraActionClasses}
        iconType={iconType}
        {...rest}
        disabled={isDisabled}
      />
    );
  }

  // Only add the label as the title attribute if it's possibly truncated
  // Also ensure the value of the title attribute is a string
  const [ref, innerText] = useInnerText();
  const shouldRenderTitle = !wrapText && !showToolTip;
  const labelContent = shouldRenderTitle ? (
    <span
      ref={ref}
      className="euiListGroupItem__label"
      title={typeof label === 'string' ? label : innerText}>
      {label}
    </span>
  ) : (
    <span className="euiListGroupItem__label">{label}</span>
  );

  // Handle the variety of interaction behavior
  let itemContent;

  if (href && !isDisabled) {
    itemContent = (
      <a
        className="euiListGroupItem__button"
        href={href}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick']}
        {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {iconNode}
        {labelContent}
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        type="button"
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        ref={buttonRef}
        {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
        {iconNode}
        {labelContent}
      </button>
    );
  } else {
    itemContent = (
      <span className="euiListGroupItem__text" {...rest}>
        {iconNode}
        {labelContent}
      </span>
    );
  }

  if (showToolTip) {
    itemContent = (
      <li className={classes}>
        <EuiToolTip
          anchorClassName="euiListGroupItem__tooltip"
          content={label}
          position="right"
          delay="long">
          {itemContent}
        </EuiToolTip>
      </li>
    );
  } else {
    itemContent = (
      <li className={classes}>
        {itemContent}
        {extraActionNode}
      </li>
    );
  }

  return <Fragment>{itemContent}</Fragment>;
};
