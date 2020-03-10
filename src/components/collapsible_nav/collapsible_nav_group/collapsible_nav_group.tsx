import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { htmlIdGenerator } from '../../../services';

import { EuiAccordion, EuiAccordionProps } from '../../accordion';
import { EuiIcon, IconType } from '../../icon';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

export interface EuiCollapsibleNavGroupProps  // TODO: paddingSize should be optional on EuiAccordion
  extends CommonProps,
    Omit<EuiAccordionProps, 'id'> {
  children?: ReactNode;
  title: string;
  iconType?: IconType;
  id?: string;
}

export const EuiCollapsibleNavGroup: FunctionComponent<
  EuiCollapsibleNavGroupProps
> = ({ className, children, title, iconType, id, ...rest }) => {
  const classes = classNames('euiCollapsibleNavGroup', className);
  const buttonClasses = classNames('euiCollapsibleNavGroup__button');

  const buttonContent = (
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      {iconType && (
        <EuiFlexItem grow={false}>
          <EuiIcon type={iconType} size="l" />
        </EuiFlexItem>
      )}

      <EuiFlexItem>{title}</EuiFlexItem>
    </EuiFlexGroup>
  );

  const generateID = htmlIdGenerator(title);

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
