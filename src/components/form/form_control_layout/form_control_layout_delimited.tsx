import React, { FunctionComponent, ReactElement, cloneElement } from 'react';
import classNames from 'classnames';

import { EuiText } from '../../text';
import { EuiFormControlLayout } from './form_control_layout';

type EuiFormControlLayoutDelimitedProps = Partial<EuiFormControlLayout> & {
  /**
   * Left side control
   */
  startControl: ReactElement;
  /**
   * Right side control
   */
  endControl: ReactElement;
  className?: string;
};

export const EuiFormControlLayoutDelimited: FunctionComponent<
  EuiFormControlLayoutDelimitedProps
> = ({ startControl, endControl, className, ...rest }) => {
  const classes = classNames('euiFormControlLayoutDelimited', className);

  return (
    <EuiFormControlLayout className={classes} {...rest}>
      {addClassesToControl(startControl)}
      <EuiText
        className="euiFormControlLayoutDelimited__delimeter"
        size="s"
        color="subdued">
        →
      </EuiText>
      {addClassesToControl(endControl)}
    </EuiFormControlLayout>
  );
};

function addClassesToControl(control: ReactElement) {
  return cloneElement(control, {
    className: classNames(
      control.props.className,
      'euiFormControlLayoutDelimited__child--noStyle',
      'euiFormControlLayoutDelimited__child--centered'
    ),
  });
}
