/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiPanel, _EuiPanelProps, _EuiPanelDivlike } from '../../panel/panel';
import { HTMLAttributes } from 'enzyme';
import { _EuiPageTemplate } from '../_template';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

export type EuiPageContentProps = CommonProps &
  // Use only the div properties of EuiPanel (not button)
  _EuiPanelProps &
  Omit<_EuiPanelDivlike, 'onClick' | 'role'> &
  _EuiPageTemplate & {
    verticalPosition?: EuiPageContentVerticalPositions;
    horizontalPosition?: EuiPageContentHorizontalPositions;
    /**
     * There should only be one EuiPageContent per page and should contain the main contents.
     * If this is untrue, set role = `null`, or change it to match your needed aria role
     */
    role?: HTMLAttributes['role'] | null;
  };

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  template,
  verticalPosition,
  horizontalPosition,
  paddingSize = 'l',
  borderRadius,
  children,
  className,
  role: _role = 'main',
  ...rest
}) => {
  const role = _role === null ? undefined : _role;

  const classes = classNames(
    'euiPageContent',
    {
      'euiPageContent--verticalCenter':
        verticalPosition === 'center' || template === 'centeredBody',
      'euiPageContent--horizontalCenter':
        horizontalPosition === 'center' || template === 'centeredBody',
      'euiPageContent--flex': template === 'centeredContent',
    },
    className
  );

  let templateProps: Partial<_EuiPanelProps> = {
    paddingSize,
  };

  if (template === 'default') {
    templateProps = {
      borderRadius: 'none',
      hasShadow: false,
      paddingSize: 'none',
    };
  } else if (template === 'empty') {
    templateProps = {
      borderRadius: 'none',
      hasBorder: false,
      hasShadow: false,
      color: 'transparent',
      paddingSize: 'none',
    };
  } else if (template === 'centeredContent') {
    templateProps = {
      borderRadius: 'none',
      hasShadow: false,
      paddingSize: templateProps.paddingSize,
    };
  } else if (template === 'centeredBody') {
    templateProps = {
      paddingSize: 'none',
    };
  }

  return (
    <EuiPanel className={classes} role={role} {...templateProps} {...rest}>
      {children}
    </EuiPanel>
  );
};
