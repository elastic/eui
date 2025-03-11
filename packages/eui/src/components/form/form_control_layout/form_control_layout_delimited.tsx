/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  cloneElementWithCss,
  useEuiTheme,
} from '../../../services';
import { useEuiI18n } from '../../i18n';
import { EuiIcon } from '../../icon';
import { EuiText } from '../../text';

import { FormContext, useFormContext } from '../eui_form_context';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';
import {
  euiFormControlLayoutDelimitedStyles,
  euiFormControlLayoutDelimited__delimiter,
  euiFormControlLayoutDelimited__input,
} from './form_control_layout_delimited.styles';
import { UseEuiTheme } from '@elastic/eui-theme-common';

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
> = ({
  startControl,
  endControl,
  delimiter,
  className,
  fullWidth: _fullWidth,
  ...rest
}) => {
  const euiThemeContext = useEuiTheme();
  const isExperimental =
    euiThemeContext.euiTheme.flags?.formVariant === 'experimental';

  const { defaultFullWidth } = useFormContext();
  const fullWidth = _fullWidth ?? defaultFullWidth;

  const { isInvalid, isDisabled, readOnly } = rest;
  const showInvalidState = isInvalid && !isDisabled && !readOnly;

  const classes = classNames('euiFormControlLayoutDelimited', className, {
    'euiFormControlLayoutDelimited--isInvalid': showInvalidState,
  });

  const styles = useEuiMemoizedStyles(euiFormControlLayoutDelimitedStyles);
  const cssStyles = [
    styles.delimited,
    rest.isDisabled && styles.disabled,
    rest.readOnly && styles.readOnly,
  ];
  const wrapperStyles = [
    styles.childrenWrapper.delimited,
    showInvalidState && styles.childrenWrapper.invalid,
    rest.wrapperProps?.css,
    isExperimental && rest.readOnly && styles.childrenWrapper.readOnly,
  ];

  return (
    <EuiFormControlLayout
      isDelimited
      css={cssStyles}
      className={classes}
      iconsPosition="static"
      fullWidth={fullWidth}
      {...rest}
      wrapperProps={{ ...rest.wrapperProps, css: wrapperStyles }}
    >
      <FormContext.Provider value={{ defaultFullWidth: fullWidth }}>
        {addClassesToControl(euiThemeContext, startControl)}
        <EuiFormControlDelimiter
          delimiter={delimiter}
          isInvalid={showInvalidState}
        />
        {addClassesToControl(euiThemeContext, endControl)}
      </FormContext.Provider>
    </EuiFormControlLayout>
  );
};

const addClassesToControl = (
  euiThemeContext: UseEuiTheme,
  control: ReactElement
) => {
  return cloneElementWithCss(
    control,
    {
      css: euiFormControlLayoutDelimited__input(euiThemeContext),
      className: classNames(
        control.props.className,
        'euiFormControlLayoutDelimited__input'
      ),
    },
    'before'
  );
};

const EuiFormControlDelimiter = ({
  delimiter,
  isInvalid,
}: {
  delimiter?: ReactNode;
  isInvalid?: boolean;
}) => {
  const euiThemeContext = useEuiTheme();
  const defaultAriaLabel = useEuiI18n(
    'euiFormControlLayoutDelimited.delimiterLabel',
    'to'
  );

  return (
    <EuiText
      css={euiFormControlLayoutDelimited__delimiter(euiThemeContext)}
      className="euiFormControlLayoutDelimited__delimiter"
      size="s"
      color={isInvalid ? 'danger' : 'subdued'}
    >
      {delimiter ?? <EuiIcon type="sortRight" aria-label={defaultAriaLabel} />}
    </EuiText>
  );
};
