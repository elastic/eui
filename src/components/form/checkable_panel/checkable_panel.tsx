import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiPanel } from '../../panel';
import { EuiRadio, EuiRadioProps } from '../radio';
import { EuiCheckbox, EuiCheckboxProps } from '../checkbox';
import { EuiFormLabel } from '../form_label';
import { EuiText } from '../../text';

interface EuiCheckablePanelBaseProps {
  id: string;
  label: ReactNode;
}

// if `checkableType` is left out or set to 'radio', use EuiRadioProps
interface EuiCheckablePanelAsRadioProps
  extends Omit<EuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use EuiCheckboxProps
interface EuiCheckablePanelAsCheckboxProps
  extends Omit<EuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type EuiCheckablePanelProps = EuiCheckablePanelBaseProps &
  (EuiCheckablePanelAsCheckboxProps | EuiCheckablePanelAsRadioProps);

export const EuiCheckablePanel: FunctionComponent<EuiCheckablePanelProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  checked,
  disabled,
  ...rest
}) => {
  const { id } = rest;
  const classes = classNames('euiCheckablePanel', className, {
    'euiCheckablePanel--isChecked': checked,
  });

  let checkableElement;
  if (checkableType === 'radio') {
    checkableElement = (
      <EuiRadio
        checked={checked}
        disabled={disabled}
        {...rest as EuiRadioProps}
      />
    );
  } else {
    checkableElement = (
      <EuiCheckbox checked={checked} disabled={disabled} {...rest} />
    );
  }

  const labelClasses = {
    euiCheckablePanel__label: true,
    'euiCheckablePanel__label--isDisabled': disabled,
  };

  return (
    <EuiPanel paddingSize="none" className={classes}>
      <div className="euiCheckablePanel__row">
        <div className="euiCheckablePanel__control">
          <div>{checkableElement}</div>
        </div>
        <div className={classNames(labelClasses)}>
          <EuiFormLabel
            htmlFor={id}
            aria-describedby={children ? `${id}-details` : undefined}>
            <EuiText size="m">{label}</EuiText>
          </EuiFormLabel>
        </div>
      </div>
      {children && (
        <div className="euiCheckablePanel__row">
          <div className="euiCheckablePanel__control" />
          <div id={`${id}-details`} className="euiCheckablePanel__children">
            {children}
          </div>
        </div>
      )}
    </EuiPanel>
  );
};
