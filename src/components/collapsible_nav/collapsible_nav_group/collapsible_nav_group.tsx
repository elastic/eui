/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';
import {
  EuiThemeProvider,
  useEuiTheme,
  useGeneratedHtmlId,
} from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType, IconSize, EuiIconProps } from '../../icon';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiTitle, EuiTitleProps, EuiTitleSize } from '../../title';

import { euiCollapsibleNavGroupStyles } from './collapsible_nav_group.styles';

export const BACKGROUNDS = ['none', 'light', 'dark'] as const;
type Background = (typeof BACKGROUNDS)[number];

export interface EuiCollapsibleNavGroupInterface extends CommonProps {
  /**
   * ReactNode to render as this component's content
   */
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
   * Further extend the props applied to EuiIcon
   */
  iconProps?: Omit<EuiIconProps, 'type' | 'size'>;
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
   * Title sizing equivalent to EuiTitle, but only `s` and smaller
   */
  titleSize?: Exclude<EuiTitleProps['size'], 'l' | 'm'>;
}

type GroupAsAccordion = EuiCollapsibleNavGroupInterface &
  // The HTML `title` prop conflicts in type with our `title` prop
  Omit<EuiAccordionProps, 'id' | 'title'> & {
    /**
     * If `true`, wraps children in the body of an accordion,
     * requiring the prop `title` to be used as the button.
     * When `false`, simply renders a div without any accordion functionality.
     */
    isCollapsible: true;
    /**
     * The title gets wrapped in the appropriate heading level
     * with the option to add an iconType
     */
    title: ReactNode;
  };

type GroupAsDiv = EuiCollapsibleNavGroupInterface & {
  /**
   * If `true`, wraps children in the body of an accordion,
   * requiring the prop `title` to be used as the button.
   * When `false`, simply renders a div without any accordion functionality.
   */
  isCollapsible?: false;
  /**
   * The title gets wrapped in the appropriate heading level
   * with the option to add an iconType
   */
  title?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type EuiCollapsibleNavGroupProps = ExclusiveUnion<
  GroupAsAccordion,
  GroupAsDiv
>;

export const EuiCollapsibleNavGroup: FunctionComponent<
  EuiCollapsibleNavGroupProps
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
  iconProps,
  ...rest
}) => {
  const groupID = useGeneratedHtmlId({ conditionalId: id });
  const titleID = `${groupID}__title`;

  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavGroupStyles(euiTheme);
  const cssStyles = [
    styles.euiCollapsibleNavGroup,
    isCollapsible ? styles.isCollapsible : styles.notCollapsible,
    background && styles[background],
  ];

  const classes = classNames('euiCollapsibleNavGroup', className);

  // Warn if consumer passes an iconType without a title
  if (iconType && !title) {
    console.warn(
      'EuiCollapsibleNavGroup will not render an icon without `title`.'
    );
  }

  const childrenStyles = [
    styles.childrenWrapper.euiCollapsibleNavGroup__children,
    title && styles.childrenWrapper.withHeading,
  ];
  const content = children && (
    <div css={childrenStyles} className="euiCollapsibleNavGroup__children">
      {children}
    </div>
  );

  const headingClasses = 'euiCollapsibleNavGroup__heading';

  const TitleElement = titleElement;
  const titleContent = title ? (
    <EuiFlexGroup gutterSize="m" alignItems="center" responsive={false}>
      {iconType && (
        <EuiFlexItem grow={false}>
          <EuiIcon {...iconProps} type={iconType} size={iconSize} />
        </EuiFlexItem>
      )}

      <EuiFlexItem>
        <EuiTitle size={titleSize as EuiTitleSize}>
          <TitleElement id={titleID} className="euiCollapsibleNavGroup__title">
            {title}
          </TitleElement>
        </EuiTitle>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : undefined;

  let render;
  if (isCollapsible && title) {
    render = (
      <EuiAccordion
        id={groupID}
        css={cssStyles}
        className={classes}
        buttonClassName={headingClasses}
        buttonContent={titleContent}
        initialIsOpen={true}
        arrowDisplay="right"
        {...rest}
      >
        {content}
      </EuiAccordion>
    );
  } else {
    render = (
      <div id={groupID} css={cssStyles} className={classes} {...rest}>
        {titleContent && <div className={headingClasses}>{titleContent}</div>}
        {content}
      </div>
    );
  }

  return background === 'dark' ? (
    <EuiThemeProvider colorMode="dark" wrapperProps={{ cloneElement: true }}>
      {render}
    </EuiThemeProvider>
  ) : (
    render
  );
};
