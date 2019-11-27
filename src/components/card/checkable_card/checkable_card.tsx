import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiPanel } from '../../panel';
import { EuiRadio, EuiRadioProps } from '../../form/radio';
import { EuiCheckbox, EuiCheckboxProps } from '../../form/checkbox';
import { EuiFormLabel } from '../../form/form_label';
import { EuiText } from '../../text';

interface EuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
}

// if `checkableType` is left out or set to 'radio', use EuiRadioProps
interface EuiCheckableCardAsRadioProps
  extends Omit<EuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use EuiCheckboxProps
interface EuiCheckableCardAsCheckboxProps
  extends Omit<EuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type EuiCheckableCardProps = EuiCheckableCardBaseProps &
  (EuiCheckableCardAsCheckboxProps | EuiCheckableCardAsRadioProps);

export const EuiCheckableCard: FunctionComponent<EuiCheckableCardProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  checked,
  disabled,
  ...rest
}) => {
  const { id } = rest;
  const classes = classNames(
    'euiCheckableCard',
    {
      'euiCheckableCard--isChecked': checked,
    },
    className
  );

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

  const labelClasses = classNames('euiCheckableCard__label', {
    'euiCheckableCard__label--isDisabled': disabled,
  });

  return (
    <EuiPanel paddingSize="none" className={classes}>
      <div className="euiCheckableCard__row">
        <div className="euiCheckableCard__control">
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
        <div className="euiCheckableCard__row">
          <div className="euiCheckableCard__control" />
          <div id={`${id}-details`} className="euiCheckableCard__children">
            {children}
          </div>
        </div>
      )}
    </EuiPanel>
  );
};
