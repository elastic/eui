import classNames from 'classnames';

const typeToClassNameMap = {
  primary: 'kuiButton--primary',
  secondary: 'kuiButton--secondary',
  warning: 'kuiButton--warning',
  danger: 'kuiButton--danger',
  ghost: 'kuiButton--ghost',
};

export const TYPES = Object.keys(typeToClassNameMap);

const sizeToClassNameMap = {
  small: 'kuiButton--small',
  large: 'kuiButton--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const iconSideToClassNameMap = {
  left: '',
  right: 'kuiButton--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export function get({ type, size, iconSide, fill, className }) {
  return classNames(
    'kuiButton',
    typeToClassNameMap[type],
    sizeToClassNameMap[size],
    iconSideToClassNameMap[iconSide],
    {
      'kuiButton--fill': fill,
    },
    className,
  )
}
