import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';
import { htmlIdGenerator } from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType, IconSize } from '../../icon';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

type Background = 'none' | 'light' | 'dark';
const backgroundToClassNameMap: { [color in Background]: string } = {
  none: '',
  light: 'euiCollapsibleNavGroup--light',
  dark: 'euiCollapsibleNavGroup--dark',
};
export const BACKGROUNDS = Object.keys(
  backgroundToClassNameMap
) as Background[];

type TitleSize = 'small' | 'medium' | 'inherit' | 'large';
const titleSizeToClassNameMap: { [size in TitleSize]: string } = {
  small: 'euiCollapsibleNavGroup__title--small',
  medium: 'euiCollapsibleNavGroup__title--medium',
  inherit: '',
  large: 'euiCollapsibleNavGroup__title--large',
};
export const TITLE_SIZES = Object.keys(titleSizeToClassNameMap) as TitleSize[];

export interface EuiCollapsibleNavGroupProps extends CommonProps {
  // TODO: paddingSize should be optional on EuiAccordion
  children?: ReactNode;
  /**
   * Sits left of the `title` and only when `title` is present
   */
  iconType?: IconType;
  /**
   * Change the size of the icon in the `title`
   */
  iconSize?: IconSize;
  /**
   * Optionally provide an id, othewise one will be created
   */
  id?: string;
  /**
   * Adds a background color to the entire group,
   * applying the correct text color to the title only
   */
  background?: Background;
  /**
   * Determines the title's heading element
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  /**
   * Title sizing based on the SASS variable equivelant
   */
  titleSize?: TitleSize;
}

type GroupAsAccordion = EuiCollapsibleNavGroupProps &
  Omit<EuiAccordionProps, 'id'> & {
    /**
     * If `true`, wraps children in the body of an accordion,
     * using the `title` (required for use with `collapsible`) as the button
     */
    collapsible: true;
    /**
     * The title gets wrapped in the appropriate heading level
     * with the option to add an iconType
     */
    title: ReactNode;
  };

type GroupAsDiv = EuiCollapsibleNavGroupProps & {
  /**
   * When `false`, simply renders a div without any accordion functionality
   */
  collapsible?: false;
  /**
   * The title gets wrapped in the appropriate heading level
   * with the option to add an iconType
   */
  title?: ReactNode;
};

export const EuiCollapsibleNavGroup: FunctionComponent<
  ExclusiveUnion<GroupAsAccordion, GroupAsDiv>
> = ({
  className,
  children,
  title,
  iconType,
  iconSize = 'l',
  id,
  background = 'none',
  collapsible = false,
  titleElement = 'h3',
  titleSize = 'small',
  ...rest
}) => {
  const classes = classNames(
    'euiCollapsibleNavGroup',
    backgroundToClassNameMap[background],
    {
      'euiCollapsibleNavGroup--withTitle': title,
    },
    className
  );

  // Warn if consumer passes an iconType without a title
  if (iconType && !title) {
    console.warn(
      'EuiCollapsibleNavGroup will not render an icon without `title`.'
    );
  }

  const content = (
    <div className="euiCollapsibleNavGroup__children">{children}</div>
  );

  const titleClasses = classNames(
    'euiCollapsibleNavGroup__title',
    titleSizeToClassNameMap[titleSize]
  );
  const TitleElement = titleElement;

  const titleContent = title ? (
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      {iconType && (
        <EuiFlexItem grow={false}>
          <EuiIcon type={iconType} size={iconSize} aria-hidden="true" />
        </EuiFlexItem>
      )}

      <EuiFlexItem>
        <TitleElement>{title}</TitleElement>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : (
    undefined
  );

  if (collapsible && title) {
    const generateID = htmlIdGenerator();

    return (
      <EuiAccordion
        id={id || generateID()}
        className={classes}
        buttonClassName={titleClasses}
        buttonContent={titleContent}
        initialIsOpen={true}
        arrowDisplay="right"
        {...rest}>
        {content}
      </EuiAccordion>
    );
  } else {
    return (
      <div id={id} className={classes} {...rest}>
        {titleContent && <div className={titleClasses}>{titleContent}</div>}
        {content}
      </div>
    );
  }
};
