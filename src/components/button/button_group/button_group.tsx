import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../../accessibility';
import { ToggleType } from '../../toggle';
import { IconType } from '../../icon';

import { EuiButtonToggle } from '../button_toggle';
import { Omit } from '../../common';

import { ButtonColor } from '../button';

export interface EuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm';

export interface EuiButtonGroupOption {
  id: string;
  label: string;
  isDisabled?: boolean;
  name?: string;
  value?: any;
  iconSide?: 'left' | 'right';
  iconType?: IconType;
}

export interface EuiButtonGroupProps {
  options?: EuiButtonGroupOption[];
  onChange: (id: string, value: any) => void;
  buttonSize?: GroupButtonSize;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  idSelected?: string;
  idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
  legend?: string;
  color?: ButtonColor;
  type?: ToggleType;
  name?: string;
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
    {
      'euiButtonGroup--fullWidth': isFullWidth,
    },
    className
  );

  let legendNode;
  if (legend) {
    legendNode = (
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>
    );
  }

  return (
    <fieldset>
      {legendNode}

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          let isSelectedState;
          if (type === 'multi') {
            isSelectedState = idToSelectedMap[option.id] || false;
          } else {
            isSelectedState = option.id === idSelected;
          }

          return (
            <EuiButtonToggle
              className="euiButtonGroup__button"
              color={color}
              fill={isSelectedState}
              iconSide={option.iconSide}
              iconType={option.iconType}
              id={option.id}
              isDisabled={isDisabled || option.isDisabled}
              isIconOnly={isIconOnly}
              isSelected={isSelectedState}
              key={index}
              label={option.label}
              name={option.name || name}
              onChange={() => onChange(option.id, option.value)}
              size={buttonSize}
              toggleClassName="euiButtonGroup__toggle"
              type={type}
              value={option.value}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
