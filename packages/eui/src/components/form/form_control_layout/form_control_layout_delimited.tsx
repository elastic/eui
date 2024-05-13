/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactElement,
  cloneElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { useEuiI18n } from '../../i18n';
import { EuiIcon } from '../../icon';
import { EuiText } from '../../text';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';

export type EuiFormControlLayoutDelimitedProps =
  Partial<EuiFormControlLayoutProps> & {
    /**
     * Left side control
     */
    startControl: ReactElement;
    /**
     * Right side control
     */
    endControl: ReactElement;
    /**
     * The center content. Accepts a string to be wrapped in a subdued EuiText
     * or a single ReactElement
     */
    delimiter?: ReactNode;
    className?: string;
  };

export const EuiFormControlLayoutDelimited: FunctionComponent<
  EuiFormControlLayoutDelimitedProps
> = ({ startControl, endControl, delimiter, className, ...rest }) => {
  const { isInvalid, isDisabled, readOnly } = rest;
  const showInvalidState = isInvalid && !isDisabled && !readOnly;

  const classes = classNames('euiFormControlLayoutDelimited', className, {
    'euiFormControlLayoutDelimited--isInvalid': showInvalidState,
  });

  return (
    <EuiFormControlLayout className={classes} iconsPosition="static" {...rest}>
      {addClassesToControl(startControl)}
      <EuiFormControlDelimiter
        delimiter={delimiter}
        isInvalid={showInvalidState}
      />
      {addClassesToControl(endControl)}
    </EuiFormControlLayout>
  );
};

const addClassesToControl = (control: ReactElement) => {
  return cloneElement(control, {
    className: classNames(
      control.props.className,
      'euiFormControlLayoutDelimited__input'
    ),
  });
};

const EuiFormControlDelimiter = ({
  delimiter,
  isInvalid,
}: {
  delimiter?: ReactNode;
  isInvalid?: boolean;
}) => {
  const defaultAriaLabel = useEuiI18n(
    'euiFormControlLayoutDelimited.delimiterLabel',
    'to'
  );

  return (
    <EuiText
      className="euiFormControlLayoutDelimited__delimiter"
      size="s"
      color={isInvalid ? 'danger' : 'subdued'}
    >
      {delimiter ?? <EuiIcon type="sortRight" aria-label={defaultAriaLabel} />}
    </EuiText>
  );
};
