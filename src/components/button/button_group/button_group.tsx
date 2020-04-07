import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';
import { IconType } from '../../icon';
import { ToggleType } from '../../toggle';
import {
  ButtonColor,
  ButtonIconSide,
  EuiButton,
  colorToClassNameMap,
} from '../button';
import { EuiIcon } from '../../icon/icon';

export interface EuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm' | 'compressed';

export interface EuiButtonGroupOption extends CommonProps {
  id: string;
  label: ReactNode;
  name?: string;
  isDisabled?: boolean;
  value?: any;
  iconSide?: ButtonIconSide;
  iconType?: IconType;
}

export interface EuiButtonGroupProps extends CommonProps {
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
  legend: string;
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
  'data-test-subj': dataTestSubj,
  ...rest
}) => {
  const classes = classNames(
    'euiButtonGroup',
    `euiButtonGroup--${color}`,
    {
      'euiButtonGroup--fullWidth': isFullWidth,
      'euiButtonGroup--compressed': buttonSize === 'compressed',
      'euiButtonGroup--disabled': isDisabled,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  return (
    <fieldset className={fieldsetClasses}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const {
            id,
            name: optionName,
            value,
            label,
            isDisabled: optionDisabled,
            className,
            iconType,
            iconSide,
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
            'euiButton--no-hover',
            {
              'euiButtonGroup__button--selected': isSelectedState,
              'euiButtonGroup__button--iconOnly': isIconOnly,
            },
            className
          );

          if (type === 'multi') {
            return (
              <EuiButton
                className={buttonClasses}
                id={id}
                color={color}
                fill={fill}
                isDisabled={optionDisabled || isDisabled}
                aria-pressed={isSelectedState}
                size={buttonSize === 'compressed' ? 's' : buttonSize}
                onClick={() => onChange(id, value)}
                data-test-subj={dataTestSubj}
                key={index}
                iconSide={iconSide}
                iconType={iconType}
                {...rest}>
                {isIconOnly ? (
                  <EuiScreenReaderOnly>
                    <span>{label}</span>
                  </EuiScreenReaderOnly>
                ) : (
                  <>{label}</>
                )}
              </EuiButton>
            );
          }

          const wrapperClasses = classNames(
            'euiButton',
            'euiButton--no-hover',
            'euiButtonGroup__toggle',
            color ? colorToClassNameMap[color] : null,
            {
              'euiButton--disabled': isDisabled,
              'euiButtonGroup__toggle--iconOnly': isIconOnly,
              'euiButton--fill': fill,
              'euiButton--small':
                buttonSize === 'compressed' || buttonSize === 's',
            },
            buttonClasses
          );

          const icon = iconType && (
            <EuiIcon type={iconType} color={color} size="m" />
          );

          const isActuallyDisabled = optionDisabled || isDisabled;
          return (
            <div className={wrapperClasses} key={index} {...rest}>
              <input
                id={id}
                className="euiButtonGroup__input"
                name={optionName || name}
                onChange={() => onChange(id, value)}
                checked={isSelectedState}
                data-test-subj={dataTestSubj}
                disabled={isActuallyDisabled}
                value={value}
                type="radio"
                {...rest}
              />
              <label
                htmlFor={id}
                className="euiButton__content euiButtonGroup__label">
                {isIconOnly ? (
                  <>
                    <EuiScreenReaderOnly>
                      <span>{label}</span>
                    </EuiScreenReaderOnly>
                    {icon}
                  </>
                ) : (
                  <>
                    {iconSide === 'left' && icon}
                    <span className="euiButton__text">{label}</span>
                    {iconSide === 'right' && icon}
                  </>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
