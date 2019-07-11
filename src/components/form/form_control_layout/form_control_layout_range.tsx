import React, { FunctionComponent, ReactElement, cloneElement } from 'react';
import classNames from 'classnames';

import { EuiText } from '../../text';
import { EuiFormControlLayout } from './form_control_layout';

type EuiFormControlLayoutRangeProps = Partial<EuiFormControlLayout> & {
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

export const EuiFormControlLayoutRange: FunctionComponent<
  EuiFormControlLayoutRangeProps
> = ({ startControl, endControl, className, ...rest }) => {
  const classes = classNames('euiFormControlLayoutRange', className);

  return (
    <EuiFormControlLayout className={classes} {...rest}>
      {addClassesToControl(startControl)}
      <EuiText
        className="euiFormControlLayoutRange__delimeter"
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
      'euiFormControlLayoutRange__child--noStyle',
      'euiFormControlLayoutRange__child--centered'
    ),
  });
}
