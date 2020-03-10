import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { htmlIdGenerator, slugify } from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType } from '../../icon';
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

export interface EuiCollapsibleNavGroupProps  // TODO: paddingSize should be optional on EuiAccordion
  extends CommonProps,
    Omit<EuiAccordionProps, 'id'> {
  children?: ReactNode;
  /**
   * The title gets wrapped in the appropriate heading level
   * with the option to add an iconType
   */
  title: string;
  /**
   * Sits left of the `title` and only when `title` is present
   */
  iconType?: IconType;
  /**
   * Optionally provide an id, othewise one will be created
   */
  id?: string;
  /**
   * Adds a background color to the entire group,
   * applying the correct text color to the title only
   */
  background?: Background;
}

export const EuiCollapsibleNavGroup: FunctionComponent<
  EuiCollapsibleNavGroupProps
> = ({
  className,
  children,
  title,
  iconType,
  id,
  background = 'none',
  ...rest
}) => {
  const classes = classNames(
    'euiCollapsibleNavGroup',
    backgroundToClassNameMap[background],
    className
  );
  const buttonClasses = classNames('euiCollapsibleNavGroup__button');

  const buttonContent = (
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      {iconType && (
        <EuiFlexItem grow={false}>
          <EuiIcon type={iconType} size="l" aria-hidden="true" />
        </EuiFlexItem>
      )}

      <EuiFlexItem>
        <h3>{title}</h3>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const generateID = htmlIdGenerator(slugify(title));

  return (
    <EuiAccordion
      id={id || generateID()}
      className={classes}
      buttonClassName={buttonClasses}
      buttonContent={buttonContent}
      initialIsOpen={true}
      arrowDisplay="right"
      {...rest}>
      <div className="euiCollapsibleNavGroup__children">{children}</div>
    </EuiAccordion>
  );
};
