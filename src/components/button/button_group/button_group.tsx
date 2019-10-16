import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import { ToggleType } from '../../toggle';

import { EuiButtonToggle } from '../button_toggle';
import { Omit, CommonProps } from '../../common';

import { ButtonColor, ButtonIconSide } from '../button';
import { IconType } from '../../icon';

export interface EuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm' | 'compressed';

export interface EuiButtonGroupOption extends CommonProps {
  id: string;
  label: string;
  name?: string;
  isDisabled?: boolean;
  value?: any;
  iconSide?: ButtonIconSide;
  iconType?: IconType;
}

export interface EuiButtonGroupProps {
  options?: EuiButtonGroupOption[];
  onChange: (id: string, value?: any) => void;
  /**
   * Typical sizing is `s`. Medium `m` size should be reserved for major features.
   * `compressed` is meant to be used alongside and within compressed forms.
   */
  buttonSize?: GroupButtonSize;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  idSelected?: string;
  legend?: string;
  color?: ButtonColor;
  name?: string;
  type?: ToggleType;
  idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
}

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupProps;

export const EuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected,
  idToSelectedMap = {},
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  legend,
  onChange,
  options = [],
  type = 'single',
  ...rest
}) => {
  const classes = classNames(
    'euiButtonGroup',
    [`euiButtonGroup--${buttonSize}`],
    {
      'euiButtonGroup--fullWidth': isFullWidth,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  let legendNode;
  if (legend) {
    legendNode = (
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>
    );
  }

  return (
    <fieldset className={fieldsetClasses}>
      {legendNode}

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const {
            id,
            name: optionName,
            value,
            isDisabled: optionDisabled,
            className,
            ...rest
          } = option;

          let isSelectedState;
          if (type === 'multi') {
            isSelectedState = idToSelectedMap[id] || false;
          } else {
            isSelectedState = id === idSelected;
          }

          let fill;
          if (buttonSize !== 'compressed') {
            fill = isSelectedState;
          }
          const buttonClasses = classNames(
            'euiButtonGroup__button',
            {
              'euiButtonGroup__button--selected': isSelectedState,
            },
            className
          );

          return (
            <EuiButtonToggle
              className={buttonClasses}
              toggleClassName="euiButtonGroup__toggle"
              id={id}
              key={index}
              value={value}
              color={color}
              fill={fill}
              isDisabled={optionDisabled || isDisabled}
              isIconOnly={isIconOnly}
              isSelected={isSelectedState}
              name={optionName || name}
              onChange={() => onChange(id, value)}
              size={buttonSize === 'compressed' ? 's' : buttonSize}
              type={type}
              {...rest}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
