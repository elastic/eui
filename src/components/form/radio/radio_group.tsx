import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { CommonProps, Omit } from '../../common';

import { EuiRadio } from './radio';

export interface EuiRadioGroupOption {
  id: string;
  label?: ReactNode;
  disabled?: boolean; // TODO: Added to fix TS error; disabled can be on group or item
  value?: any; // TODO: Added to fix TS error; used in options map below
}

export type EuiRadioGroupChangeCallback = (id: string, value: string) => void;

export type EuiRadioGroupProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    disabled?: boolean;
    /**
     * Tightens up the spacing between radio rows and sends down the
     * compressed prop to the radio itself
     */
    compressed?: boolean;
    name?: string;
    options?: EuiRadioGroupOption[];
    idSelected?: string;
    onChange: EuiRadioGroupChangeCallback;
  };

export type x = EuiRadioGroupProps['onChange'];

export const EuiRadioGroup: FunctionComponent<EuiRadioGroupProps> = ({
  options = [],
  idSelected,
  onChange,
  name,
  className,
  disabled,
  compressed,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      const { disabled: isOptionDisabled, ...optionRest } = option;
      return (
        <EuiRadio
          className="euiRadioGroup__item"
          key={index}
          name={name}
          checked={option.id === idSelected}
          disabled={disabled || isOptionDisabled}
          onChange={onChange.bind(null, option.id, option.value)}
          compressed={compressed}
          {...optionRest}
        />
      );
    })}
  </div>
);

EuiRadioGroup.defaultProps = {
  options: [],
};
