import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';
import { htmlIdGenerator } from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType, IconSize } from '../../icon';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiTitle, EuiTitleProps, EuiTitleSize } from '../../title';

type Background = 'none' | 'light' | 'dark';
const backgroundToClassNameMap: { [color in Background]: string } = {
  none: '',
  light: 'euiCollapsibleNavGroup--light',
  dark: 'euiCollapsibleNavGroup--dark',
};
export const BACKGROUNDS = Object.keys(
  backgroundToClassNameMap
) as Background[];

export interface EuiCollapsibleNavGroupProps extends CommonProps {
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
   * Optionally provide an id, otherwise one will be created
   */
  id?: string;
  /**
   * Adds a background color to the entire group,
   * applying the correct text color to the `title` only
   */
  background?: Background;
  /**
   * Determines the title's heading element
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  /**
   * Title sizing equivelant to EuiTitle, but only `s` and smaller
   */
  titleSize?: Omit<EuiTitleProps['size'], 'l' | 'm'>;
}

type GroupAsAccordion = EuiCollapsibleNavGroupProps &
  Omit<EuiAccordionProps, 'id'> & {
    /**
     * If `true`, wraps children in the body of an accordion,
     * requiring the prop `title` to be used as the button
     */
    isCollapsible: true;
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
  isCollapsible?: false;
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
  id,
  title,
  iconType,
  iconSize = 'l',
  background = 'none',
  isCollapsible = false,
  titleElement = 'h3',
  titleSize = 'xxs',
  ...rest
}) => {
  const classes = classNames(
    'euiCollapsibleNavGroup',
    backgroundToClassNameMap[background],
    {
      'euiCollapsibleNavGroup--withHeading': title,
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

  const headingClasses = 'euiCollapsibleNavGroup__heading';

  const TitleElement = titleElement;
  const titleContent = title ? (
    <EuiFlexGroup gutterSize="m" alignItems="center" responsive={false}>
      {iconType && (
        <EuiFlexItem grow={false}>
          <EuiIcon type={iconType} size={iconSize} aria-hidden="true" />
        </EuiFlexItem>
      )}

      <EuiFlexItem>
        <EuiTitle size={titleSize as EuiTitleSize}>
          <TitleElement className="euiCollapsibleNavGroup__title">
            {title}
          </TitleElement>
        </EuiTitle>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : (
    undefined
  );

  if (isCollapsible && title) {
    const generateID = htmlIdGenerator();

    return (
      <EuiAccordion
        id={id || generateID()}
        className={classes}
        buttonClassName={headingClasses}
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
        {titleContent && <div className={headingClasses}>{titleContent}</div>}
        {content}
      </div>
    );
  }
};
