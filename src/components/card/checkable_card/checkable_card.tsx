import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiRadio, EuiRadioProps } from '../../form/radio';
import { EuiCheckbox, EuiCheckboxProps } from '../../form/checkbox';

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
      'euiCheckableCard-isChecked': checked,
      'euiCheckableCard-isDisabled': disabled,
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
    'euiCheckableCard__label-isDisabled': disabled,
  });

  return (
    <div className={classes}>
      <div className="euiCheckableCard__row">
        <div className="euiCheckableCard__control">{checkableElement}</div>
        <label
          className={labelClasses}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}>
          {label}
        </label>
      </div>
      {children && (
        <div className="euiCheckableCard__row">
          {/* Empty div for left side background color only */}
          <div className="euiCheckableCard__control" />
          <div id={`${id}-details`} className="euiCheckableCard__children">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
