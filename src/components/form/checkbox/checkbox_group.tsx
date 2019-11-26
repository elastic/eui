import React, { ReactNode, FunctionComponent } from 'react';

import { EuiCheckbox } from './checkbox';
import { CommonProps } from '../../common';

export interface EuiCheckboxGroupOption {
  id: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface EuiCheckboxGroupIdToSelectedMap {
  [id: string]: boolean;
}

export interface EuiCheckboxGroupProps extends CommonProps {
  options?: EuiCheckboxGroupOption[];
  idToSelectedMap: EuiCheckboxGroupIdToSelectedMap;
  onChange: (optionId: string) => void;
  compressed?: boolean;
  disabled?: boolean;
}

export const EuiCheckboxGroup: FunctionComponent<EuiCheckboxGroupProps> = ({
  options,
  idToSelectedMap,
  onChange,
  className,
  disabled,
  compressed,
  ...rest
}) => (
  <div className={className} {...rest}>
    {options.map((option, index) => {
      return (
        <EuiCheckbox
          className="euiCheckboxGroup__item"
          key={index}
          id={option.id}
          checked={idToSelectedMap[option.id]}
          label={option.label}
          disabled={disabled || option.disabled}
          onChange={onChange.bind(null, option.id)}
          compressed={compressed}
        />
      );
    })}
  </div>
);
