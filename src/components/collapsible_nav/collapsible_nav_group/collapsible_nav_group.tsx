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
  ReactNode,
  useState,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';
import { htmlIdGenerator } from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType, IconSize, EuiIconProps } from '../../icon';
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
} & HTMLAttributes<HTMLDivElement>;

export type EuiCollapsibleNavGroupProps = ExclusiveUnion<
  GroupAsAccordion,
  GroupAsDiv
>;

export const EuiCollapsibleNavGroup: FunctionComponent<EuiCollapsibleNavGroupProps> = ({
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
  const [groupID] = useState(id || htmlIdGenerator()());
  const titleID = `${groupID}__title`;

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

  const content = children && (
    <div className="euiCollapsibleNavGroup__children">{children}</div>
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

  if (isCollapsible && title) {
    return (
      <EuiAccordion
        id={groupID}
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
      <div id={groupID} className={classes} {...rest}>
        {titleContent && <div className={headingClasses}>{titleContent}</div>}
        {content}
      </div>
    );
  }
};
